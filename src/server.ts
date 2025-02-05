import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Importing cors
import todoRoutes from "./Route/todoRoutes"; // Import routes
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({origin: "http://127.0.0.1:5500"} ));
// Use To-Do Routes
app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
