import Admin from "../models/Admin.js";
import Blog from "../models/Blog.js";
import Service from "../models/Service.js";
import Country from "../models/Country.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";




export const loginAdmin = async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;

        // Simple validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required."
            });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        // Set token expiry based on rememberMe
        const tokenExpiry = rememberMe ? "7d" : "12h";
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: tokenExpiry });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
        });

        res.json({
            success: true,
            admin: { id: admin._id, username: admin.username },
        });

    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




export const logoutAdmin = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        expires: new Date(0), // expire immediately
    });
    res.json({ success: true, message: "Logged out successfully" });
};


// Update Admin Name
export const updateAdminName = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        // admin id from protect middleware
        const adminId = req.admin;

        const admin = await Admin.findByIdAndUpdate(
            adminId,
            { name },
            { new: true, runValidators: true }
        );

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Admin name updated successfully",
            admin,
        });
    } catch (error) {
        console.error("Update admin name error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating admin name",
        });
    }
};






export const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const adminId = req.admin;

        // Validate input
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'New passwords do not match' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        // Password strength check
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain uppercase, lowercase, number, and special character'
            });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Save changes
        admin.password = hashedPassword;
        admin.passwordChangedAt = new Date();
        admin.updatedAt = new Date();

        await admin.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });

    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export const deleteAccount = async (req, res) => {
    const adminId = req.admin; // assuming req.user is set by auth middleware

    if (!adminId) {
        res.status(401);
        throw new Error('Admin not found you cannot delete account.');
    }

    try {
        await Admin.findByIdAndDelete(adminId);
        // Optionally, clear cookies or session here
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ message: 'Failed to delete account' });
    }
};

// 🔹 Fetch admin profile
export const getAdminProfile = async (req, res) => {
    try {
        const adminId = req.admin; // or req.adminId, depending on your auth middleware
        const admin = await Admin.findById(adminId).select("name username");

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ name: admin.name, username: admin.username });
    } catch (error) {
        console.error("Error fetching admin profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// Create a new admin (protected)
export const createAdmin = async (req, res) => {
    try {
        const { username, password, name } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "username and password are required" });
        }

        const exists = await Admin.findOne({ username });
        if (exists) {
            return res.status(409).json({ success: false, message: "Username already exists" });
        }

        const hashed = await bcrypt.hash(password, 12);
        const admin = await Admin.create({ username, password: hashed, name: name || "Admin" });

        res.status(201).json({
            success: true,
            admin: { id: admin._id, username: admin.username, name: admin.name, createdAt: admin.createdAt },
        });
    } catch (error) {
        console.error("Create admin error:", error);
        res.status(500).json({ success: false, message: "Failed to create admin" });
    }
};

// Platform stats for Analytics
export const getPlatformStats = async (req, res) => {
    try {
        const [blogs, services, countries] = await Promise.all([
            Blog.countDocuments(),
            Service.countDocuments(),
            Country.countDocuments(),
        ]);

        res.json({
            success: true,
            stats: {
                totalBlogs: blogs,
                totalServices: services,
                totalCountries: countries,
            },
        });
    } catch (error) {
        console.error("Get platform stats error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch stats" });
    }
};


