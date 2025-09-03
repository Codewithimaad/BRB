import Country from "../models/Country.js";

export const createCountry = async (req, res) => {
    try {
        const { name, titleShort, isActive } = req.body;
        const flagUrl = req.file?.path || req.body.flagUrl;
        if (!name || !titleShort) {
            return res.status(400).json({ success: false, message: "name and titleShort are required" });
        }
        if (!flagUrl) {
            return res.status(400).json({ success: false, message: "flag image is required" });
        }
        const exists = await Country.findOne({ name });
        if (exists) {
            return res.status(409).json({ success: false, message: "Country already exists" });
        }
        const country = await Country.create({ name, titleShort, isActive, flagUrl });
        res.status(201).json({ success: true, country });
    } catch (error) {
        console.error("Create country error:", error);
        res.status(500).json({ success: false, message: "Failed to create country" });
    }
};

export const getAllCountries = async (req, res) => {
    try {
        const { search } = req.query;
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { titleShort: { $regex: search, $options: "i" } },
            ];
        }
        const countries = await Country.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, countries });
    } catch (error) {
        console.error("Get countries error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch countries" });
    }
};

export const getCountryById = async (req, res) => {
    try {
        const country = await Country.findById(req.params.id);
        if (!country) return res.status(404).json({ success: false, message: "Country not found" });
        res.json({ success: true, country });
    } catch (error) {
        console.error("Get country by id error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch country" });
    }
};

export const updateCountry = async (req, res) => {
    try {
        const { name, titleShort, isActive } = req.body;
        const updates = { name, titleShort, isActive };
        if (req.file?.path) updates.flagUrl = req.file.path;
        const country = await Country.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!country) return res.status(404).json({ success: false, message: "Country not found" });
        res.json({ success: true, country });
    } catch (error) {
        console.error("Update country error:", error);
        res.status(500).json({ success: false, message: "Failed to update country" });
    }
};

export const deleteCountry = async (req, res) => {
    try {
        const country = await Country.findByIdAndDelete(req.params.id);
        if (!country) return res.status(404).json({ success: false, message: "Country not found" });
        res.json({ success: true, message: "Country deleted successfully" });
    } catch (error) {
        console.error("Delete country error:", error);
        res.status(500).json({ success: false, message: "Failed to delete country" });
    }
};


