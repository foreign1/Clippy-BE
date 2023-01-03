import db from "../db/db.js";

const createChamber = (chamberData) => {
  db.chambers.push(chamberData);
}

const getChamber = (chamberName) => {
  return db.chambers.find(chamber => chamber.chamberName === chamberName);
}

const addItem = (chamberName, item) => {
  const chamber = getChamber(chamberName);
  chamber ? chamber.data.push(item) : 
    console.error("Couldn't add item to chamber as chamber with supplied ID does not exist!");
}

const getItem = (chamberName, itemId) => {
  try {
    return getChamber(chamberName).data.find(item => item.id === itemId);
  } catch (error) {
    console.log(error)
  }
}

const deleteItem = (chamberName, itemId) => {
  const chamber = getChamber(chamberName);
  chamber.data.splice(chamber.data.findIndex(item => item.id === itemId), 1);
}

export { createChamber, getChamber, addItem, getItem, deleteItem }