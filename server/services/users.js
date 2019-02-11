const  UsersModel  = require('../models/users');
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
  const userBody = pick(['name','email','password'], body);
  if(adminCode && (adminCode === ADMIN_CODE)){
    userBody.accessLevel = 'ADMIN';
  }
  const user = new UsersModel(userBody);
  await user.save();
  const authenticationToken = await user.generateAuthToken();
  return {user, authenticationToken};
};

const login = async (body = {}) => {
  const requideFields = ['email', 'password'];
  const userBody = pick(requideFields, body);
  const userModel = await UsersModel.findByCredentials(userBody.email, userBody.password);
  const authenticationToken = await userModel.generateAuthToken();
  const user = userModel.toObject();
  user.authenticationToken = authenticationToken;
  user.id = userModel.id;
  return {authenticationToken, user};
};

module.exports = {
  get,
  login,
  post
};