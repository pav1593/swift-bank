const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  unitQty: {
    type: Number,
    min: 0,
    default: 0
  },
  termDays: {
    type: Number,
    min: 0,
    default: 0
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

// virtual to calculate outstanding amount

// virtual to calculate maturity date

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
