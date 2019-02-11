const { UsersModel } = require('../models/users');
const { pick } = require('ramda');
const ADMIN_CODE = process.env.ADMIN_CODE;

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

const post = async (body = {}) => {

  const {  adminCode } = body;
  const userBody = pick(['name','email'], body);
  if(adminCode && (adminCode === ADMIN_CODE)){
    userBody.accessLevel = 'ADMIN';
  }
  const user = new UsersModel(userBody);
  await user.save();
  const authenticationToken = await user.generateAuthToken();
  return {user, authenticationToken};
};

module.exports = {
  get,
  post
};