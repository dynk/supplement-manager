const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const service = require('../services/supplements');

const get = async (req, res) => {
  try{
    const {query ={}} = req;
    const users = await service.get(query);
    return responseJson(res, users);
  }catch(err){
    return responseErrorJson(res, 'supplements::get', err);
  }
};


module.exports = {
  get
};