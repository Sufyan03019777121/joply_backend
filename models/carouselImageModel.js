import mongoose from "mongoose";

const carouselImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
});

const CarouselImage = mongoose.model("CarouselImage", carouselImageSchema);
export default CarouselImage;
