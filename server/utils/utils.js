function parseBoolean(value){
  const type = typeof value;
  const evaluation = {
    string: string,
    boolean: boolean,
    number: number
  };

  return evaluation[type](value);
  function string(value){
    return 'true' === value;
  }
  function boolean(value){
    return value;
  }
  function number(value){
    return !(value === 0);
  }

}

function findMissingFields(target, requiredFields){
  const result = [];
  if(typeof target !== 'object' || target === null){
    return [];
  }
  for(const field of requiredFields){
    if(!target.hasOwnProperty(field)){
      result.push(field);
    }
  }
  return result;
}

module.exports = {
  findMissingFields,
  parseBoolean
};