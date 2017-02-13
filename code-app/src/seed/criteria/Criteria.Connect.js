class Connect{
  /**
   *
   * @param left
   * @param right
   */
  static and(left,right){
    const criteria = {}
    criteria['$LEFT$'] = left
    criteria['$RIGHT$'] = right
    // 默认可省略
    // criteria['$OP$'] = "AND"
    return criteria
  }
  /**
   *
   * @param left
   * @param right
   */
  static or(left,right){
    const criteria = {}
    criteria['$LEFT$'] = left
    criteria['$RIGHT$'] = right
    criteria['$OP$'] = "OR"
    return criteria
  }
}

export default Connect
