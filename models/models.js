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
    console.log("Couldn't add item to chamber as chamber with supplied ID does not exist!");
}

export { createChamber, getChamber, addItem }