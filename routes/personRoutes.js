const express = require("express");
const router = express.Router();
const Person = require("./../models/Person.js");

// Post route to add a new Person
router.post("/", async (req, res) => {
  try {
    //Body parser stores the data in req.body, hence, we now store it in a new variable
    const data = req.body;

    //Create a new person document using Person Model
    const newPerson = new Person(data);

    //Save the new Person to database
    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get route to get Person data
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data saved");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get route to get person data based on parameters(worktype)
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Fetching worktype
    if (workType == "Chef" || workType == "Manager" || workType == "Waiter") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ Error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Update method
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //Return the updated document
        runValidators: true, //Run the mongoose validators
      }
    );

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server eror" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      res.status(400).json({ Error: "Person not found" });
    }
    console.log("Data deleted");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

module.exports = router;
