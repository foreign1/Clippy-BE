import store from "../store/store.js";

/***
* @description creates a new chamber
* @param chamberData - object containing details for the chamber creation
* @param socket - emitter socket
* @param store - the data store
*/
export function setChamberName(chamberData, socket) {
  let chamber = {
    id: socket.id,
    ownerScreenName: chamberData.screenName,
    chamberName: chamberData.chamberName,
    data: []
  }

  store.push(chamber);
}

export function joinChamber(payload, socket, io) {
  let chamber = getChamber(payload.chamberName, store);
  
  chamber ?
    (
      socket.join(payload.chamberName),
      socket.broadcast.emit(
        'notification', `${payload.screenName} joined the chamber!`
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

export function addItem(payload, socket) {
  let chamber = getChamber(payload.chamberName, store);
  
  chamber ?  (chamber.data.push(payload.newItem)) : console.log("Incorrect chamber ID supplied");

  socket.broadcast.emit('chamber-data-updated', payload.newItem);
}

function getChamber(chamberName, store) {
  return store.find( chamber => chamber.chamberName === chamberName);
}