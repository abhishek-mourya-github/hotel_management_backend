const express = require("express"); 
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body // the data sent by the client to the server is processed by the body parser and store in the req.body

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel!");
});

const menuRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuRoutes);

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

app.listen(3000, function () {
    console.log("Listening on port 3000");
});