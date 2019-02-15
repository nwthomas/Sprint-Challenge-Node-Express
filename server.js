const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
server.use(helmet());
server.use(express.json());
server.use(cors());
const server = express();

server.get("/", (req, res) => {
  res.status(200).json("You've reached the server! Please choose a new route!");
});

module.exports = server;
