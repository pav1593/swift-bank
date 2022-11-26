const mongoose = require('mongoose');
const Transaction = require('./Transaction');

const { Schema } = mongoose;

const accountSchema = new Schema({
  userId: {
    type: String
  },
  accountNumber: {
    type: Number,
    trim:true
    // unused, but planned to be used for easier client reference
  },
  alias: {
    type: String,
    trim:true
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
  product: 
    {
      type: String,
      ref: 'Product',
      required: true
    },
  transactions: [Transaction.schema]
},
{
  toJSON: {
    getters: true,
  }
}
);

// virtual to calculate current balance

// virtual to calculate current period interest

// virtual to calculate accumulated interest

// virtual to calculate funds available

// virtual to calculate average balance funds

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
