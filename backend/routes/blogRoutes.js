const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog");

// ===============================
// CREATE BLOG
// POST /api/blogs
// ===============================
router.post("/", async (req, res) => {
    try {
        const { title, content, author, category } = req.body;

        const blog = new Blog({
            title,
            content,
            author,
            category
        });

        const savedBlog = await blog.save();

        res.status(201).json({
            message: "Blog created successfully",
            blog: savedBlog
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating blog",
            error: error.message
        });
    }
});


// ===============================
// READ ALL BLOGS
// GET /api/blogs
// ===============================
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status(200).json(blogs);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching blogs",
            error: error.message
        });
    }
});


// ===============================
// READ ONE BLOG
// GET /api/blogs/:id
// ===============================
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.status(200).json(blog);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching blog",
            error: error.message
        });
    }
});


// ===============================
// UPDATE BLOG
// PUT /api/blogs/:id
// ===============================
router.put("/:id", async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating blog",
            error: error.message
        });
    }
});


// ===============================
// DELETE BLOG
// DELETE /api/blogs/:id
// ===============================
router.delete("/:id", async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.status(200).json({
            message: "Blog deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting blog",
            error: error.message
        });
    }
});

module.exports = router;