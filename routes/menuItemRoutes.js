const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem.js");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const chicken = new MenuItem(data);

    const response = await chicken.save();
    console.log("Menu item saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data saved");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (
      tasteType == "Sweet" ||
      tasteType == "Bitter" ||
      tasteType == "Spicy" ||
      tasteType == "Sour"
    ) {
      const response = await MenuItem.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type !" });
    }
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPersonData = req.body;
    const response = await MenuItem.findByIdAndUpdate(id, updatedPersonData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await MenuItem.findByIdAndDelete(id);

    if (!response) {
      res.status(404).json({ error: "Menu Item not found" });
    }

    console.log("Menu Item deleted");
    res.status(200).json({ message: "Data deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

module.exports = router;
