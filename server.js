const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Files will be saved in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name to make it unique
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Handle file upload
app.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ filePath: req.file.path });
});

// Serve static files from the 'uploads' folder
app.use(express.static("uploads"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
