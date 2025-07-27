// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Replace below with your connection string (no need for env)
const mongoURI = "mongodb+srv://trishyanigam:s1v9wm6zH2i5u5N7@devcluster.qejljxt.mongodb.net/ingredientApp?retryWrites=true&w=majority&appName=DevCluster";

// Connect to MongoDB
mongoose.connect(mongoURI)

.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
    res.send("Backend working 👋");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
