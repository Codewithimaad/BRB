import Service from "../models/Service.js";

export const createService = async (req, res) => {
    try {
        const { title, description, tags, isActive, featured } = req.body;
        const imageUrl = req.file?.path || req.body.imageUrl;
        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title and description are required" });
        }
        const service = await Service.create({ title, description, tags, isActive, featured, imageUrl });
        res.status(201).json({ success: true, service });
    } catch (error) {
        console.error("Create service error:", error);
        res.status(500).json({ success: false, message: "Failed to create service" });
    }
};

export const getAllServices = async (req, res) => {
    try {
        const { search } = req.query;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { tags: { $elemMatch: { $regex: search, $options: "i" } } },
            ];
        }
        const services = await Service.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, services });
    } catch (error) {
        console.error("Get services error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch services" });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: "Service not found" });
        res.json({ success: true, service });
    } catch (error) {
        console.error("Get service by id error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch service" });
    }
};

export const updateService = async (req, res) => {
    try {
        const { title, description, tags, isActive, featured } = req.body;
        const updates = { title, description, tags, isActive, featured };
        if (req.file?.path) updates.imageUrl = req.file.path;
        const service = await Service.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!service) return res.status(404).json({ success: false, message: "Service not found" });
        res.json({ success: true, service });
    } catch (error) {
        console.error("Update service error:", error);
        res.status(500).json({ success: false, message: "Failed to update service" });
    }
};

export const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: "Service not found" });
        res.json({ success: true, message: "Service deleted successfully" });
    } catch (error) {
        console.error("Delete service error:", error);
        res.status(500).json({ success: false, message: "Failed to delete service" });
    }
};


