import Ajax from '../ajax'

const uri = "/vlv/rule/existing"

const Existing = (config, value) => {
  const { name, remote } = config
  if(value[name]){
    const { identifier } = remote
    const field = remote.name
    const params = { identifier, name:field, value:value[name]}
    return Ajax.Async.post(uri,params);
  }else{
    /** 拥有Required验证填写的项目 **/
    if(config.required){
      const error = {}
      error[name] = config.required
      return Ajax.Async.storage(error)
    }
  }
}

export default Existing
