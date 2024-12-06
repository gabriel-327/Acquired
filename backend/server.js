// trying again
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Ensure connectDB connects to your database
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
//import messageRoutes from "./routes/message.route.js";

// github comment
// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

console.log("MONGO_URI:", process.env.MONGO_URI);

// Use CORS to connect frontend and backend
app.use(cors());

// Allow JSON data in requests
app.use(express.json());

// Routes for products
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
//app.use("/api/messages", messageRoutes);

// Set port
const PORT = process.env.PORT || 5001;

// Start server and connect to database
app.listen(PORT, async () => {
    await connectDB(); // Connect to MongoDB
    console.log("Server started at http://localhost:" + PORT);

    
});

