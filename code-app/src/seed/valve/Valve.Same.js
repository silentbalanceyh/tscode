// ------------------------------------
// Same Rule Checking
// ------------------------------------
const Same = (config,value) => {
  const errors = {};
  const { name, target, message } = config;
  if(value[name] && value[target]){
    if(value[name] != value[target]){
      errors[name] = message;
    }
  }
  return errors;
}

export default Same
