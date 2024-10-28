// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";

// // added to connect backend and frontend
// import cors from 'cors';
// app.use(cors());


// import productRoutes from "./routes/product.route.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json()); // allows us to accpet JSON data in the req.body

// app.use("/api/products", productRoutes);

// app.listen(PORT, () => {
//     connectDB();
//     console.log("Server started at http://localhost:" + PORT);
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Ensure connectDB connects to your database
import productRoutes from "./routes/product.route.js";

// github comment
// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Use CORS to connect frontend and backend
app.use(cors());

// Allow JSON data in requests
app.use(express.json());

// Routes for products
app.use("/api/products", productRoutes);

// Set port
const PORT = process.env.PORT || 5000;

// Start server and connect to database
app.listen(PORT, async () => {
    await connectDB(); // Connect to MongoDB
    console.log("Server started at http://localhost:" + PORT);
});

