const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const service = require('../services/users');
const { pick } = require('ramda');

const get = async (req, res) => {
  try{
    const {query ={}} = req;
    const users = await service.get(query);
    return responseJson(res, users.map(u => pick(['name','email','accessLevel'], u)));
  }catch(err){
    return responseErrorJson(res, 'users::get', err);
  }
};

const post = async (req, res) => {
  try{
    const {body ={}} = req;
    const {user, authenticationToken} = await service.post(body);
    res.header('x-auth', authenticationToken);
    return responseJson(res, pick(['id', 'name', 'email', 'accessLevel'], user));
  }catch(err){
    return responseErrorJson(res, 'users::post', err);
  }
};

module.exports = {
  get,
  post
};