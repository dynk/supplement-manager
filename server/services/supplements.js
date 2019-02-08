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

const put = async (id, body = {}) => {
  const supplementBody = pick(supplementFields, body);
  const updatedSupplement = await SupplementsModel.findOneAndUpdate({_id: id}, supplementBody, {new: true});
  if(updatedSupplement.stock <= updatedSupplement.lowStockWaterMark){
    updatedSupplement.isCritcalStock = true;
    await updatedSupplement.save();
  }
  return updatedSupplement;
};

const destroy = (id) => {
  return SupplementsModel.remove({_id: id});
};

module.exports = {
  destroy,
  get,
  post,
  put
};