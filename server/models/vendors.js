const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

const VendorsModel = mongoose.model('vendors', VendorSchema);

module.exports = {VendorsModel};
