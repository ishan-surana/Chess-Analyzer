import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.js';
import matchRoutes from './routes/matches.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

app.use('/api', authRoutes);
app.use('/api', matchRoutes);

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("join-game", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on("move", (data) => {
    const { roomId, from, to, piece, fullBoard, log, turn, senderId } = data;
    console.log(`♟️ Move in room ${roomId}: ${from.row},${from.col} → ${to.row},${to.col}`);
    socket.to(roomId).emit("opponent-move", {from, to, piece, fullBoard, log, turn, senderId});
  });

  socket.on("request-board", (roomId) => {
    socket.to(roomId).emit("sync-request", { requesterId: socket.id });
  });

  socket.on("send-sync", ({ toSocketId, fullBoard, log, turn }) => {
    io.to(toSocketId).emit("sync-board", { fullBoard, log, turn });
  });

  socket.on("resign", ({ roomId, color }) => {
    console.log(`${color} resigned in room ${roomId}`);
    socket.to(roomId).emit("opponent-resigned", color);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
