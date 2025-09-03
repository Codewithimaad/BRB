import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
    createCountry,
    getAllCountries,
    getCountryById,
    updateCountry,
    deleteCountry,
} from "../controllers/countryController.js";

const router = express.Router();

// Public
router.get("/", getAllCountries);
router.get("/:id", getCountryById);

// Admin protected
router.post("/", protect, upload.single("flag"), createCountry);
router.put("/:id", protect, upload.single("flag"), updateCountry);
router.delete("/:id", protect, deleteCountry);

export default router;


