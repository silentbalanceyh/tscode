class Flag {
  /**
   * 是否Update
   * @param props
   * @param prevProps
   * @param name
   */
  static isUpdated(props, nextProps, name){
      const key = `$_${name}`
      const newVal = nextProps[key]
      const oldVal = props[key]
      return newVal != oldVal
  }
}

export default Flag
