const express = require("express");

const ProjectDB = require("../data/helpers/projectModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.get("/actions/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
