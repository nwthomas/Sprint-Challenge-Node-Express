const express = require("express");
const server = express();
const helmet = require("helmet");
const ProjectDB = require("./data/helpers/projectModel.js");
server.use(helmet());
server.use(express.json());

// server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Dude!</h1>`);
});

server.get("/api/projects/:id", async (req, res) => {
  // Retrieve project
  try {
    const project = await ProjectDB.get(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "No project found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts."
    });
  }
});

server.post("/api/projects", async (req, res) => {
  // New project
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json("Please include a name, description, and competion status");
  }
  try {
    const project = await ProjectDB.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the project."
    });
  }
});

server.put("/api/projects/:id", async (req, res) => {
  console.log(req.body);
  // Update project
  try {
    const project = await ProjectDB.update(req.params.id, req.body);
    if (project) {
      res.status(201).json(project);
    } else {
      res.status(404).json({ message: "Please update an existing project." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the project."
    });
  }
});

module.exports = server;
