import { saveLogoPath, getLogoPath } from "../models/logoModel.js";

export const uploadLogoService = (filename) => {
  const logoPath = `/uploads/${filename}`;
  saveLogoPath(logoPath);
  return logoPath;
};

export const getLogoService = () => {
  return getLogoPath();
};
