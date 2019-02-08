const {
  UsersModel
} = require('../models/users');
const {
  pick
} = require('ramda');




function get(query) {
  const filters = parseFilterOptions(query);
  return UsersModel.find(filters);
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