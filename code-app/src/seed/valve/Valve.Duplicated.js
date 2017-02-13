import Ajax from '../ajax'

const uri = "/vlv/rule/duplicated"

const Duplicated = (config, value) => {
  const { name, remote } = config
  if(value[name]){
    const { identifier } = remote
    const field = remote.name
    const params = { identifier, name:field, value:value[name]}
    // 更新流程中，重新设定了unquieId则使用重新设定后的unquieId，否则取默认的unquieId，添加流程中什么也不取
    if (remote.unquieId && value[remote.unquieId]){
        params['uniqueId'] = value[remote.unquieId]
    }else if(value['uniqueId']){
        params['uniqueId'] = value['uniqueId']
    }
    return Ajax.Async.post(uri,params)
  }else{
    /** 拥有Required验证填写的项目 **/
    if(config.required){
      const error = {}
      error[name] = config.required
      return Ajax.Async.storage(error)
    }
  }
}

export default Duplicated
