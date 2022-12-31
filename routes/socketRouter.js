import { Router } from "express";

function socketRouter(io) {
  const router = Router();
  
  io.on("connection", (socket) => {
    console.log(`${socket.id} connected!`);
    socket.on("disconnect", (socket) => console.log(`${socket.id} left!`))
  
  });

  return router; 
}

export default socketRouter;