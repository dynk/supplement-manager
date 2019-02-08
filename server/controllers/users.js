const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const service = require('../services/users');

const get = async (req, res) => {
  try{
    const {query ={}} = req;
    const users = await service.get(query);
    return responseJson(res, users);
  }catch(err){
    return responseErrorJson(res, 'users::get', err);
  }
};


module.exports = {
  get
};