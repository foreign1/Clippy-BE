import { createChamber, getChamber, addItem } from "../models/models.js"

const setChamberName = (chamberData, socket) => {
  let chamber = {
    id: socket.id,
    ownerScreenName: chamberData.screenName,
    chamberName: chamberData.chamberName,
    data: []
  }

  createChamber(chamber);
}

const joinChamber = (payload, socket, io) => {
  const chamberName = payload.chamberName;
  const screenName =payload.screenName;
  const chamber = getChamber(chamberName);
  
  chamber ?
    (
      socket.join(chamberName),
      socket.broadcast.emit(
        'notification', `${screenName} joined the chamber!`
        ),
      io.emit("join-status", {
        status: "success", 
        message: "Joined chamber successfully!"
      }),
      io.to(socket.id).emit("history", chamber.data),
      console.log("Joined successfully!")
    )
    : io.emit("join-status", {
      status: "failed", 
      message: "Incorrect chamber name supplied!"
    });
}

const addChamberItem = (payload, socket) => {
  const chamberName = payload.chamberName;
  const item = payload.newItem;
  const chamber = getChamber(chamberName);

  chamber ? addItem(chamberName, item) :
    console.log("Item couldn't be added at this time!");

  socket.broadcast.emit('chamber-data-updated', item);
}

export { setChamberName, joinChamber, addChamberItem }