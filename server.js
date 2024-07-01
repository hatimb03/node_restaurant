const express = require("express");
const app = express();
const db = require("./db.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Welcome to our Restaurant");
});

//Importing the personRoutes
const personRoutes = require("./routes/personRoutes.js");

// Using the route created
app.use("/person", personRoutes);

const menuItemRoutes = require("./routes/menuItemRoutes.js");
app.use("/menu", menuItemRoutes);

app.listen(3000, () => {
  console.log("Server is running on the given port");
});
