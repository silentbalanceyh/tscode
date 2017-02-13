import Tool from '../tool'
import Entity from '../entity'

const POOL = {}

const buildEblis = (eblisRef,mapping,memory,configuration) => {
  if(!POOL[memory]) POOL[memory] = {}
  console.info(POOL)
  for(const key in mapping){
    const path = mapping[key]
    let value
    if("config" == path[0]){
      const memKey = memory + "-" + configuration.config[Tool.ID.CLIENT] + ":" + path.join('-')
      if(POOL[memory][memKey]){
        /** 读取Memory **/
        value = POOL[memory][memKey]
      }else{
        /** 搜索然后写缓存 **/
        value = Entity.Data.lookup(configuration, path);
        POOL[memory][memKey] = value
      }
    }else{
      /** 缓存 **/
      value = Entity.Data.lookup(configuration, path);
    }
    eblisRef[`$_${key}`] = value;
  }
}
export default{
  POOL,
  buildEblis
}
