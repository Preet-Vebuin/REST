import express from "express";
import dotenv from "dotenv";
import corsMiddleware from "./middleware/corsMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger";
import uploadRoutes from "./Route/uploadRoute";
import todoRoutes from "./Route/todoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use("/api", todoRoutes);
app.use("/api", uploadRoutes);
app.use(express.static('./public'))
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📄 Swagger UI available at http://localhost:${PORT}/api-docs`);
});
