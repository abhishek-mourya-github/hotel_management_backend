const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new MenuItem(data);

    const responce = await newMenu.save();

    newMenu.save();

    console.log("Menu saved");
    res.status(200).json(responce);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();

    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/:taste', async (req, res) => {
  try {
    
  const taste = req.params.taste;

  if(taste == "sweet" || taste == "sour" || taste == "spicy" || taste == "normal"){
   const responce = await MenuItem.find({taste: taste});
   console.log("Response Fetched");
   res.status(200).json(responce);
  }else{
   res.status(404).json({error : "Not Found"});
  }

  } catch (err) {
    console.log("err");
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;
