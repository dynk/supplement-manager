const { SupplementsModel } = require('../models/supplements');
const { pick } = require('ramda');

const supplementFields = ['name', 'manufacturer', 'stockKepingUnit', 'vendorId', 'stock', 'lowStockWaterMark', 'size', 'activeIngredient', 'isVegan'];

const parseFilterOptions = (query = {}) => {
  const standardFilters = [
    'name'
  ];
  const filters = pick(standardFilters,query);
  return filters;
};


const get = (query) => {
  const filters = parseFilterOptions(query);
  return SupplementsModel.find(filters);
};

const post = async (body = {}) => {
  const supplementBody = pick(supplementFields, body);
  try{
    const supplement = new SupplementsModel(supplementBody);
    await supplement.save();
    return supplement;
  }catch(error){
    return Promise.reject(error);
  }
};

const put = (id, body = {}) => {
  const supplementBody = pick(supplementFields, body);
  return SupplementsModel.findOneAndUpdate({_id: id}, supplementBody);
};


module.exports = {
  get,
  post,
  put
};