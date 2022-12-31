import { Router } from "express";
import { setChamberName, joinChamber, addItem } from "../controllers/socket-controller.js";

function socketRouter(io) {
  const router = Router();
  
  io.on("connection", (socket) => {
    console.log(`${socket.id} connected!`);
    
    socket.on("disconnect", () => console.log(`${socket.id} left!`))
  
    socket.on('set-chamber-name', (payload) => setChamberName(payload, socket));

    socket.on('join-chamber', (payload) => joinChamber(payload, socket, io));

    socket.on('add-item', (payload) => addItem(payload, socket));
  });

  return router; 
}

export default socketRouter;