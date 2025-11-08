import CarouselImage from "../models/carouselImageModel.js";

export const uploadImage = async (req, res) => {
  try {
    const newImage = new CarouselImage({
      imageUrl: `/uploads/${req.file.filename}`,
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await CarouselImage.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await CarouselImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    await image.deleteOne();
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
