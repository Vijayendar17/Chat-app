import express from 'express';
import authRoutes from './routes/auth.routes.js'
import connection from './db/index.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import messageAuth from './routes/message.routes.js'
import { app, server } from "./lib/socket.js";
import cors from 'cors'
import path from 'path';

dotenv.config();
connection();

const __dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, '../frontend/dist')))


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})
}

app.use(express.json({ limit: "10mb"}))
app.use(cookieParser())
app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }
))



app.use("/api/auth",authRoutes)
app.use("/api/messages",messageAuth)


server.listen(5000,()=>{
  console.log('Server running on port 5000');
});