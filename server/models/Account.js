const mongoose = require('mongoose');
const Transaction = require('./Transaction');

const { Schema } = mongoose;

const accountSchema = new Schema({
  userId: {
    type: String,
    // required:true
  },
  accountNumber: {
    type: String,
    trim:true
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
    type: String
  },
  product: 
    {
      type: Schema.Types.ObjectId,
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
