const { VendorsModel } = require('../models/vendors');
const { pick } = require('ramda');

const get = (query) => {
  const filters = parseFilterOptions(query);
  return VendorsModel.find(filters);
};

const parseFilterOptions = (query = {}) => {
  const standardFilters = ['name'];
  const filters = pick(standardFilters,query);
  return filters;
};

const post = (body) => {
  const vendorBody = pick(['name'], body);
  const vendor = new VendorsModel(vendorBody);
  return vendor.save();
};


module.exports = {
  get,
  post
};