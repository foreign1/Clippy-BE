
import express, { urlencoded } from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import router from "./routes/router.js";
import socket from "./routes/socket.router.js";

process.env.NODE_ENV !== "production" && dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

const socketRouter = socket(io);

app.use(express.json());
app.use(urlencoded({extended: false}));
app.use("/", router);
app.use("/api/v1", socketRouter);

server.listen(PORT, ()=> console.log(`App running on port: ${PORT}`));