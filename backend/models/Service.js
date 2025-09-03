import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
        },
        tags: [{
            type: String,
            trim: true,
        }],
        isActive: {
            type: Boolean,
            default: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;


