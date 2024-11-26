import express from 'express';
import authRoutes from './routes/auth.routes.js';
import connection from './db/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import messageAuth from './routes/message.routes.js';
import { app, server } from "./lib/socket.js";
import cors from 'cors';
import path from 'path';

dotenv.config();
connection();

const __dirname = path.resolve();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageAuth);

// Handle invalid routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

// Start server
server.listen(5000, () => {
  console.log('Server running on port 5000');
});
