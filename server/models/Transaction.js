const mongoose = require('mongoose');
const TransType = require('./TransType');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  // acctId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  // },
  transferTo: {
    type: Schema.Types.ObjectId,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  approvedAt: {
    type: Date
  },
  status: {
    type: String,
    default: 'pending'
  },
  approverId: {
    type: Schema.Types.ObjectId,
  },
  type: [TransType.schema],
  // {
  //   type: Schema.Types.ObjectId,
  //   ref: 'TransType',
  //   //required: true
  // }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;