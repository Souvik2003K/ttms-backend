import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import multer from "multer";
import toolsRoutes from "./routes/toolsRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(upload.single("photo"));

app.use("/api/tools", toolsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
