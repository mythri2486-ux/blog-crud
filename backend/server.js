const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Blog CRUD API is running");
});

// Blog CRUD routes
app.use("/api/blogs", blogRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(5001, () => {
            console.log("Server running on port 5001");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });