const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  acctId: {
    type: String,
    required:true
  },
  transferTo: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'TransType',
    required: true
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;