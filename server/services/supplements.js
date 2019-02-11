const { SupplementsModel } = require('../models/supplements');
const { pick } = require('ramda');
const { parseBoolean } = require('../utils/utils');

const supplementFields = ['name', 'manufacturer', 'stockKepingUnit', 'vendorId', 'stock', 'lowStockWaterMark', 'size', 'activeIngredient', 'isVegan'];

const parseFilterOptions = (query = {}) => {
  const standardFilters = [
    'name',
    'vendorId',
    'stock'
  ];
  const filters = pick(standardFilters,query);
  if(query.isCriticalStock){
    filters.isCriticalStock = parseBoolean(query.isCriticalStock);
  }
  return filters;
};

const parseVendorFilter = (query) => {
  const { vendorName } = query;
  const filter = {};
  if(vendorName){
    filter['vendor.name'] = vendorName;
  }
  return filter;
};


const get = (query) => {
  const filters = parseFilterOptions(query);
  return SupplementsModel.aggregate([
    {
      $match: filters
    },
    {
      $lookup: {
        from: 'vendors',
        localField: 'vendorId',
        foreignField: '_id',
        as: 'vendor'
      }
    },
    {
      $match: parseVendorFilter(query)
    }

  ]);
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
    updatedSupplement.isCriticalStock = true;
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