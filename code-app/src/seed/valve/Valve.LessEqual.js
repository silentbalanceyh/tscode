
const LessEqual = (config,value) => {
  const errors = {}
  const {name, message, cid} = config;
  const target = jQuery(`#${cid}`).val()
  const checked = value[name]
  if(target && checked){
    if(Number(checked) > Number(target)){
      errors[name] = message
    }
  }
  return errors
}

export default LessEqual
