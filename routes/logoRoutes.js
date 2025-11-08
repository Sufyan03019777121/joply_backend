import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Logo from "../models/logoModel.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads/logo");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `logo_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// Upload new logo
router.post("/upload", upload.single("logo"), async (req, res) => {
  try {
    const logoPath = `/uploads/logo/${req.file.filename}`;
    const newLogo = new Logo({ imageUrl: logoPath });
    await newLogo.save();
    res.json({ success: true, message: "Logo uploaded successfully", url: logoPath });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error uploading logo", error: error.message });
  }
});

// Get latest logo
router.get("/", async (req, res) => {
  try {
    const logo = await Logo.findOne().sort({ createdAt: -1 });
    if (!logo) return res.json({ url: null });
    res.json({ url: logo.imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching logo", error: error.message });
  }
});

export default router;
