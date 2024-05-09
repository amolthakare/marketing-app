const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const { connection } = require("./config/db");
const userRoutes = require("./routes/route");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.get("/hello",(req,res)=>{
    res.send("Hello Amol");
})
app.use("/", userRoutes);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
  console.log(`listening to port ${process.env.port}`);
});
