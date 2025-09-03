import express from "express";
import {
    loginAdmin,
    logoutAdmin,
    updateAdminName,
    getAdminProfile,
    updatePassword,
    deleteAccount,
    createAdmin,
    getPlatformStats
} from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/check-auth", protect, (req, res) => {
    res.json({ success: true, message: "Authenticated" });
});

// Protected routes
router.put("/update", protect, updateAdminName);
router.get("/profile", protect, getAdminProfile);
router.put("/change-password", protect, updatePassword);
router.delete('/delete-account',  protect, deleteAccount);
// Only super-admin should call this ideally; for now keep protected
router.post('/add', protect, createAdmin);

// Analytics stats
router.get('/stats', protect, getPlatformStats);




export default router;
