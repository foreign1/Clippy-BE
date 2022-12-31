<<<<<<< Updated upstream
import express from "express";
import cors from "cors";
import { generateSession } from "./utils/utils.js";
=======
import express, { urlencoded } from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import router from "./routes/router.js";
import socket from "./routes/socket-router.js";
>>>>>>> Stashed changes

const app = express();
const PORT = 8000;

const sessionArray = [
  {
    "adorable_fish": {
      "text": [],
      "file": []
    }
  }
];

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send({message: "Hello world!"});
});

app.get('/create', (req, res) => {
  const sessionId = generateSession();
  const newSession = {
    [sessionId]: {
      text: [],
      file: [],
    }
  };
  sessionArray.push(newSession);
  return res.status(201).send({message: 'Session created successfully!', sessionId, session: newSession});
});

app.post('/join', (req, res) => {
  const sessionId = req.body?.sessionId;
  console.log(res.body)
  try {
    const clipSession = sessionArray.filter(session => 
      (Object.keys(session)[0] === sessionId)
    )[0];
    console.log(clipSession)
    if (clipSession) {
      return res.status(200).send({message: `Joined session ${sessionId}`, sessionId, session: clipSession});
    }
    return res.status(400).send({message: 'Session doesn\'t exist!'});
  } catch (error) {
    return res.status(500).send({message: error});
  }

});

app.patch("/addItem", (req, res) => {
  try {
    const { sessionId, type, item } = req.body;
    const session = sessionArray.filter(session => Object.keys(session)[0] === sessionId)[0];
    session[sessionId][type].push(item);
    return res.status(200).send({message: "Update successful."})
  } catch (error) {
    return res.status(400).send({message: "Patch operation failed", error})    
  }
});

app.delete("/deleteItem", (req, res) => {
  try {
    const { sessionId, type, index } = req.body;
    const session = sessionArray.filter(session => Object.keys(session)[0] === sessionId)[0];
    session[sessionId][type].splice(index, 1);
    return res.status(200).send({message: "Item deleted successfully."})
  } catch (error) {
    return res.status(400).send({message: "Delete operation failed", error})    
  }
});

app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`);
})