const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
server.use(helmet());
server.use(express.json());
server.use(cors());

const projectsRouter = require("./projects/projects-router.js");
const actionsRouter = require("./actions/actions-router.js");

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Dude!</h1>`);
});

module.exports = server;
