import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        excerpt: {
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
