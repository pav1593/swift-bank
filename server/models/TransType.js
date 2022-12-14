const mongoose = require('mongoose');

const { Schema } = mongoose;

const transTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const TransType = mongoose.model('TransType', transTypeSchema);

module.exports = TransType;