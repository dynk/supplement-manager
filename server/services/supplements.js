const {
  SupplementsModel
} = require('../models/supplements');
const {
  pick
} = require('ramda');




function get(query) {
  const filters = parseFilterOptions(query);
  return SupplementsModel.find(filters);
}

function parseFilterOptions(query = {}) {
  const standardFilters = [
    'name'
  ];
  const filters = pick(standardFilters,query);
  return filters;
}


module.exports = {
  get
};