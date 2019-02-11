const { UsersModel } = require('../models/users');
const { pick } = require('ramda');

const get = (query) => {
  const filters = parseFilterOptions(query);
  return UsersModel.find(filters);
};

const parseFilterOptions = (query = {}) => {
  const standardFilters = [
    'name'
  ];
  const filters = pick(standardFilters,query);
  return filters;
};

const post = (body = {}) => {

  const {  adminCode } = body;
  const userBody = pick(['name','email'], body);
  if(adminCode && (adminCode === 'secretadmincode123')){
    userBody.accessLevel = 'ADMIN';
  }
  const user = new UsersModel(userBody);
  return user.save();
};

module.exports = {
  get,
  post
};