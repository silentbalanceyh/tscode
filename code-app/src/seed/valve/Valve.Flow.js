class Flow{
  /**
   *
   * @param field
   * @param value
   * @param message
   * @param fun
   */
  static verify(field, value, message, fun, errors){
    /** 1.判断value **/
    if(value && Array.prototype.isPrototypeOf(value)){
      /** 2.数组类型的处理 **/
      const errs = []
      /** 3.创建对应的索引 **/
      value.forEach(item => {
        if(fun(item[field])){
          const error = {}
          error[field] = message
          errs.push(error)
        }else{
          errs.push({})
        }
      })
      if(0 < errs.length){
        errors[field] = errs
      }
    }else{
      if(fun(value)){
        errors[field] = message
      }
    }
  }
}

export default Flow
