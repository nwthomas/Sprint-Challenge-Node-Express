const express = require("express");

const ActionsDB = require("../data/helpers/actionModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
