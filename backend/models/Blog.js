import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        // Arabic title (optional)
        titleAr: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        // Arabic content (optional)
        contentAr: {
            type: String,
        },
        excerpt: {
            type: String,
            trim: true,
        },
        // Arabic excerpt (optional)
        excerptAr: {
            type: String,
            trim: true,
        },
        imageUrl: {
            type: String,
        },
       
        category: [{
            type: String,
            trim: true,
            required: true,
        }],
        // Arabic categories array (optional)
        categoryAr: [{
            type: String,
            trim: true,
        }],
        isPublished: {
            type: Boolean,
            default: true,
        },
        publishedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
