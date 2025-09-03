import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

// Public
router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Admin protected
router.post("/", protect, upload.single("image"), createService);
router.put("/:id", protect, upload.single("image"), updateService);
router.delete("/:id", protect, deleteService);

export default router;


