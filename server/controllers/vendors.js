const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const service = require('../services/vendors');

const get = async (req, res) => {
  try{
    const {query ={}} = req;
    const users = await service.get(query);
    return responseJson(res, users);
  }catch(err){
    return responseErrorJson(res, 'vendors::get', err);
  }
};

const post = async (req, res) => {
  try{
    const {body ={}} = req;
    const users = await service.post(body);
    return responseJson(res, users);
  }catch(err){
    return responseErrorJson(res, 'vendors::post', err);
  }
};

module.exports = {
  get,
  post
};