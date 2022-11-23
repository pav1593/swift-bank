import mongoose from "mongoose";

require('dotenv').config;

mongoose
  .connect(proecess.env.DATABASE, {})
  .then (() => console.log("DB Connected"))
  .catch ((e) => console.log("DB Error: ", error));