const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const ProjectDB = require("./data/helpers/projectModel.js");
const ActionsDB = require("./data/helpers/actionModel.js");
server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Dude!</h1>`);
});

// ========================================================= Projects

server.get("/api/projects", async (req, res) => {
  try {
    const projects = await ProjectDB.get();
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "No projects found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the projects."
    });
  }
});

server.get("/api/projects/:id", async (req, res) => {
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
      message: "Error retrieving the projects."
    });
  }
});

server.get("/api/projects/actions/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const actions = await ProjectDB.getProjectActions(req.params.id);
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "No actions found for that project." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the project's actions."
    });
  }
});

server.post("/api/projects", async (req, res) => {
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
  try {
    const project = await ProjectDB.update(req.params.id, req.body);
    if (project) {
      res.status(201).json(project);
    } else {
      res
        .status(404)
        .json({ message: "Please update an existing project.", value: null });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the project."
    });
  }
});

server.delete("/api/projects/:id", async (req, res) => {
  try {
    const project = await ProjectDB.remove(req.params.id);
    if (project) {
      res.status(200).json({
        message: "The project has been deleted.",
        numProjectsDeleted: project
      });
    } else {
      res.status(404).json({ message: "The project could not be found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the project."
    });
  }
});

// ========================================================= Actions

server.get("/api/actions", async (req, res) => {
  try {
    const action = await ActionsDB.get();
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "No actions found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the actions."
    });
  }
});

server.get("/api/actions/:id", async (req, res) => {
  try {
    const action = await ActionsDB.get(req.params.id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "No action found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the action."
    });
  }
});

server.post("/api/actions", async (req, res) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res
      .status(400)
      .json(
        "Please include a project ID, description, and notes about this action."
      );
  }
  try {
    const action = await ActionsDB.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the action."
    });
  }
});

server.put("/api/actions/:id", async (req, res) => {
  console.log(req.body);
  try {
    const action = await ActionsDB.update(req.params.id, req.body);
    if (action) {
      res.status(201).json(action);
    } else {
      res
        .status(404)
        .json({ message: "Please update an existing action.", value: null });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the action."
    });
  }
});

server.delete("/api/actions/:id", async (req, res) => {
  try {
    const action = await ActionsDB.remove(req.params.id);
    if (action) {
      res.status(200).json({
        message: "The action has been deleted.",
        numActionsDeleted: action
      });
    } else {
      res.status(404).json({ message: "The action could not be found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the action."
    });
  }
});

module.exports = server;
