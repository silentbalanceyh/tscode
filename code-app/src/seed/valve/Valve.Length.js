import Tool from '../tool'
// ------------------------------------
// Length Rule Checking
// ------------------------------------
const isInvalid = (value, {min,max}) => {
  let invalid = false;
  if(value) {
    const length = value.length;
    // 重新赋值min和max
    if(!min || min < 0){
      min = -1;
    }
    if(!max || max < 0){
      max = length + 1;
    }
    // 检查
    if(max < length || length < min){
      invalid = true;
    }
  }
  return invalid;
}

const Length = (config, value) => {
  const errors = {};
  const {name, message, length} = config;
  const checked = value[name];
  if(checked && isInvalid(checked,length)){
    const error = Tool.Format.stringParams(message,length);
    errors[name] = error;
  }
  return errors;
}

export default Length
