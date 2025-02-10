import express, { Request, Response } from "express";
import upload from "../config/multer";

const router = express.Router();

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// File Upload Route
router.post("/upload", upload.single("image"), async (req: MulterRequest, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "❌ No file uploaded!" });
    return;
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  const filename = req.file.filename;
  const size = req.file.size;
  res.json({ message: "✅ File uploaded successfully!", fileUrl ,filename,size });
});

export default router;
