import express from "express";
import cors from "cors";
import { generateSession } from "./utils/utils.js";

const app = express();
const PORT = 8000;

const sessionArray = [];

app.use(cors());

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
  return res.status(201).send({message: 'Session created successfully', sessionId});
});

app.post('/join', (req, res) => {
  const sessionId = req.body?.sessionId;
  try {
    const clipSession = sessionArray.filter(session => session.sessionId === sessionId)[0];
    if (clipSession) {
      return res.status(200).send({message: 'Session found!'}, clipSession);
    }
    return res.status(400).send({message: 'Session doesn\'t exist!'});
  } catch (error) {
    return res.status(500).send({message: error});
  }

});

app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`);
})