class Quaternary{
  /**
   * 构造LIKE表达式 name LIKE 'xxx'
   * @param name
   * @param value
   * @param config
   */
  static like(name,value,config){
    const criteria = {}
    criteria[name] = value
    criteria['$OP$'] = config.op
    criteria['$MODE$'] = config.mode
    return criteria
  }
}

export default Quaternary
