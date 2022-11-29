// import mongoose from "mongoose";

require('dotenv').config;

// mongoose
//   .connect(proecess.env.DATABASE, {})
//   .then (() => console.log("DB Connected"))
//   .catch ((e) => console.log("DB Error: ", error));


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swiftbank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then (() => console.log("DB Connected"))
.catch ((e) => console.log("DB Error: ", error));

module.exports = mongoose.connection;