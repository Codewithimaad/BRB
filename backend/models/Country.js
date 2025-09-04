import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        // Arabic name (optional)
        nameAr: {
            type: String,
            trim: true,
        },
        titleShort: {
            type: String,
            required: true,
            trim: true,
        },
        // Arabic short title (optional)
        titleShortAr: {
            type: String,
            trim: true,
        },
        flagUrl: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);

export default Country;


