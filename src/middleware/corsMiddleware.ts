import cors from "cors";

const corsMiddleware = cors({
  origin: "*", // Allow all origins (or specify allowed domains)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

export default corsMiddleware;
