const mongoose = require('mongoose');

// name, manufacturer, stock keeping unit, vendor Id, stock, low stock water mark, size, active ingredient, is vegan
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
    type: String
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
  isCritcalStock: {
    type: Boolean,
    default: false
  },
});


SupplementsSchema.pre('save', async function (next) {
  const supplement = this;
  if(supplement.stock <= supplement.lowStockWaterMark){
    supplement.isCritcalStock = true;
  }
  next();
});

const SupplementsModel = mongoose.model('supplements', SupplementsSchema);

module.exports = {SupplementsModel};
