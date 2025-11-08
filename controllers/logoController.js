import { uploadLogoService, getLogoService } from "../services/logoService.js";

export const uploadLogo = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const url = uploadLogoService(req.file.filename);
  res.json({ message: "Logo uploaded successfully", url });
};

export const getLogo = (req, res) => {
  const logo = getLogoService();
  if (!logo) return res.json({ url: null });
  res.json({ url: logo });
};
