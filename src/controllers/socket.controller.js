import {
  createChamber,
  getChamber,
  addItem,
  getItem,
  deleteItem 
} from "../models/models.js"

const setChamberName = (chamberData, socket) => {
  const chamber = {
    id: socket.id,
    ownerScreenName: chamberData.screenName,
    chamberName: chamberData.chamberName,
    data: []
  }

  createChamber(chamber);
}

const joinChamber = (payload, socket, io) => {
  const chamberName = payload.chamberName;
  const screenName = payload.screenName;
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
      io.to(socket.id).emit("history", chamber.data)
    )
    : io.emit("join-status", {
      status: "failed", 
      message: "Incorrect chamber name supplied!"
    });
}

const addChamberItem = (payload, socket) => {
  const chamberName = payload.chamberName;
  const item = payload.newItem;
  
  addItem(chamberName, item);

  socket.broadcast.emit('chamber-data-updated', item);
}

const deleteChamberItem = (payload, socket) => {
  const chamberName = payload.chamberName;
  const itemId = payload.itemId;
  const user = payload.screenName;

  getItem(chamberName, itemId).ownerScreenName === user && 
  deleteItem(chamberName, itemId);
}

export { setChamberName, joinChamber, addChamberItem, deleteChamberItem };