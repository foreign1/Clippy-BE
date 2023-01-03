import { Router } from "express";
import { setChamberName, joinChamber, addChamberItem, deleteChamberItem } from "../controllers/socket.controller.js";

const socketRouter = (io) => {
  const router = Router();
  
  io.on("connection", (socket) => {
    console.log(`${socket.id} connected!`);
    
    socket.on("disconnect", () => console.log(`${socket.id} left!`))
  
    socket.on('set-chamber-name', (payload) => setChamberName(payload, socket));

    socket.on('join-chamber', (payload) => joinChamber(payload, socket, io));

    socket.on('add-item', (payload) => addChamberItem(payload, socket));
  
    socket.on('delete-item', (payload) => deleteChamberItem(payload))
  });

  return router; 
}

export default socketRouter;