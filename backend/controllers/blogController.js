import Blog from "../models/Blog.js";
import { body, validationResult } from 'express-validator';

const normalizeCategory = (raw) => {
    if (Array.isArray(raw)) {
        return raw
            .map((v) => (typeof v === "string" ? v.trim() : String(v)))
            .filter((v) => v.length > 0);
    }
    if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                return parsed
                    .map((v) => (typeof v === "string" ? v.trim() : String(v)))
                    .filter((v) => v.length > 0);
            }
        } catch (_) {
            // not JSON; fall through to comma-split
        }
        return raw
            .split(",")
            .map((v) => v.trim())
            .filter((v) => v.length > 0);
    }
    return [];
};

// New middleware for validation
export const createBlogValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required.')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long.'),

    body('content')
        .trim()
        .notEmpty().withMessage('Content is required.')
        .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long.'),
];

// Modified createBlog function to handle validation results
export const createBlog = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = {};
        errors.array().forEach(error => {
            errorMessages[error.path] = error.msg;
        });
        return res.status(400).json({ success: false, errors: errorMessages });
    }

    try {
        const { title, titleAr, content, contentAr, excerpt, excerptAr, isPublished } = req.body;
        const category = normalizeCategory(JSON.parse(req.body.category));
        const categoryAr = normalizeCategory(JSON.parse(req.body.categoryAr));
        const imageUrl = req.file?.path || req.body.imageUrl;

        const blog = await Blog.create({
            title,
            titleAr,
            content,
            contentAr,
            excerpt,
            excerptAr,
            imageUrl,
            category,
            categoryAr,
            isPublished,
            publishedAt: isPublished ? Date.now() : undefined,
        });

        res.status(201).json({ success: true, message: 'Blog created successfully', blog });
    } catch (error) {
        console.error("Create blog error:", error);
        res.status(500).json({ success: false, message: "Failed to create blog" });
    }
};


export const getAllBlogs = async (req, res) => {
    try {
        const { search } = req.query;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
                { category: { $elemMatch: { $regex: search, $options: "i" } } },
            ];
        }
        const blogs = await Blog.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        console.error("Get blogs error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch blogs" });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
        res.json({ success: true, blog });
    } catch (error) {
        console.error("Get blog by id error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch blog" });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { title, titleAr, content, contentAr, excerpt, excerptAr, isPublished } = req.body;
        const updates = { title, titleAr, content, contentAr, excerpt, excerptAr, isPublished };
        const category = normalizeCategory(req.body.category);
        const categoryAr = normalizeCategory(req.body.categoryAr);
        if (category.length > 0) updates.category = category;
        if (categoryAr.length > 0) updates.categoryAr = categoryAr;
        if (req.file?.path) updates.imageUrl = req.file.path;
        if (typeof isPublished !== "undefined") {
            updates.publishedAt = isPublished ? Date.now() : null;
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
        res.json({ success: true, blog });
    } catch (error) {
        console.error("Update blog error:", error);
        res.status(500).json({ success: false, message: "Failed to update blog" });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Delete blog error:", error);
        res.status(500).json({ success: false, message: "Failed to delete blog" });
    }
};


