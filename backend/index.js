// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Replace below with your connection string (no need for env)
const mongoURI = CONNRCTION_STRING ;

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
