import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage, getImages, deleteImage } from "../controllers/carouselImageController.js";

const router = express.Router();

router.post("/", upload.single("image"), uploadImage);
router.get("/", getImages);
router.delete("/:id", deleteImage);

export default router;
