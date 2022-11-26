const mongoose = require('mongoose');
const Transaction = require('./Transaction');

const { Schema } = mongoose;

const accountSchema = new Schema({
  userId: {
    type: String
  },
  accountNumber: {
    type: Number,
    required:true,
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
  accountBalance: {
    type:Number,
    get: calcBalance
  },
  originalAmount: {
    type: Number,
    get: calcAmount
  },
  maturityDate: {
    type: String,
    get: calcMaturityDate
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

// function to calculate current balance
function calcBalance() {
  let balance=0;
  for(i=0;i<this.transactions.length;i++){
    balance+=this.transactions[i].amount;
  }
  return balance;
}

// function to calculate original loan or investment amount
function calcAmount() {
  return this.product.unitPrice*this.product.unitQty;
}

//function to calculate loan or investment maturity date
function calcMaturityDate() {
    const maturity = new Date(this.createdAt);
    maturity.setDate(this.createdAt.getDate() + this.product.termDays);
  return maturity.toLocaleDateString();
}


const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
