class Ternary {
  /**
   * 构造等于表达式 name = value
   * @param name
   * @param value
   * @param config
   */
  static eq(name,value){
    const criteria = {}
    // 默认可省略
    // criteria['$OP$'] = "EQ"
    criteria[name] = value
    return criteria
  }

  /**
   * 构造IN表达式 name IN ["value1","value2"]
   * @param name
   * @param value
   */
  static in(name,value = []){
    const criteria = {}
    criteria[name] = value
    criteria['$OP$'] = "IN"
    return criteria
  }
}

export default Ternary
