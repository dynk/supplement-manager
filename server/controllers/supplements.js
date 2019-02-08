const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const service = require('../services/supplements');

const get = async (req, res) => {
  try{
    const {query ={}} = req;
    const supplements = await service.get(query);
    return responseJson(res, supplements);
  }catch(err){
    return responseErrorJson(res, 'supplements::get', err);
  }
};

const post = async (req, res) => {
  try{
    const {body ={}} = req;
    const supplements = await service.post(body);
    return responseJson(res, supplements);
  }catch(err){
    return responseErrorJson(res, 'supplements::post', err);
  }
};

const put = async (req, res) => {
  try{
    const {body ={}, params = {}} = req;
    const supplements = await service.put(params.id, body);
    return responseJson(res, supplements);
  }catch(err){
    return responseErrorJson(res, 'supplements::put', err);
  }
};

module.exports = {
  get,
  post,
  put
};