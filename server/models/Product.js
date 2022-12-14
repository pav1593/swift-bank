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
  fixedRate: {
    type: Number,
    default: 0
  },
  floatRate: {
    type: Number,
    default: 0
  },
  // type: {
  //   type: String,
  //   ref: 'Category',
  //   required: true
  // }
},
// {
//   id: false,
// }
);


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
