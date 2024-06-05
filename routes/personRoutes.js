const express = require("express");
const router = express.Router();
const Person = require('./../models/Person');

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const responce = await newPerson.save();

    console.log("data saved");
    res.status(200).json(responce);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();

    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;

    if (worktype == "chef" || worktype == "waiter" || worktype == "manager" || worktype == "owner") {
      const responce = await Person.find({ work: worktype });
      console.log("Response Fetched");
      res.status(200).json(responce);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    console.log("err");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/:id', async (req, res) => {
try {
    const personId = req.params.id;
    const updatesPersonData = req.body;
    
    const responce = await Person.findByIdAndUpdate(personId, updatesPersonData, {
        new : true,
        runValidators : true
    });

    if(!responce){
        return res.status(404).json({ error: "Person not found" });
    }

    console.log('data updates');
    res.status(200).json(responce);

} catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
}
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
 
        const responce = await Person.findByIdAndDelete(personId);
 
        if(!responce){
            return res.status(404).json({ error: "Person not found" });
        }

        console.log(" Data Delete");
        res.status(200).json({message: "Person deleted successfully"})

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
