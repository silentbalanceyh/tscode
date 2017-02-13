import Immutable from 'immutable'
/**
 * 是否子节点
 */
const isNode = (criterias = {}) => {
  if(criterias["$LEFT$"] && criterias["$RIGHT$"]){
    return false
  }else{
    return true
  }
}

const locator = (criteria, data) => {
  /** 拷贝配置 **/
  let $config = Immutable.fromJS(criteria)
  const $data = Immutable.fromJS(data);
  /** 统一处理 **/
  for(const key in criteria){
    /** 直接过滤IS NULL和NOT NULL **/
    if("NIL" != key && "NNL" != key){
      /** 过滤四元操作符 **/
      if("$OP$" != key && "$MODE$" != key){
        const pathes = criteria[key];
        const value = $data.getIn(pathes)
        /** 可以搜索则搜索，搜索不到则直接返回Pathes，Array类型 **/
        if(value) {
          $config = $config.set(key,value)
        }
      }
    }
  }
  return $config.toJS()
}

class Input{

  static analyze(criterias = "{}", data){
    /** 先执行转换 **/
    if("string" == typeof(criterias)) {
      criterias = JSON.parse(criterias)
    }
    if(isNode(criterias)){
      /** 子节点 **/
      return locator(criterias,data)
    }else{
      /** 复杂表达式 **/
      const complex = {}
      if(criterias["$OP$"]){
        complex["$OP$"] = criterias["$OP$"];
      }
      /** 左右子树递归  **/
      complex["$LEFT$"] = Input.analyze(criterias["$LEFT$"],data);
      complex["$RIGHT$"] = Input.analyze(criterias["$RIGHT$"],data);
      return complex
    }
  }
}

export default Input
