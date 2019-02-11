const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplementsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  manufacturer: {
    type: String
  },
  stockKepingUnit: {
    type: String
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'vendors',
    alias:'vendor'
  },
  stock: {
    type: Number
  },
  lowStockWaterMark: {
    type: Number
  },
  size: {
    type: Number
  },
  activeIngredient: {
    type: String
  },
  isVegan: {
    type: Boolean
  },
  isCriticalStock: {
    type: Boolean,
    default: false
  },
});


SupplementsSchema.pre('save', async function (next) {
  const supplement = this;
  if(supplement.stock <= supplement.lowStockWaterMark){
    supplement.isCriticalStock = true;
  }
  next();
});

const SupplementsModel = mongoose.model('supplements', SupplementsSchema);

module.exports = {SupplementsModel};
