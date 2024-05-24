import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinaryConfig";

interface CustomParams {
  folder: string;
  allowed_formats: string[];
  transformation: { width: number; height: number; crop: string }[];
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_cover_images",
    allowed_formats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  } as CustomParams,
});

const upload = multer({ storage: storage });

export default upload;
