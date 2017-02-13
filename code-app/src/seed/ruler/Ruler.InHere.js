class InHere {
  /**
   * 是否Render
   * @param props
   * @param name
   */
  static isRender(props, name) {
    return props[`$_${name}`] ? true : false
  }

  /**
   * 是否Update
   * @param props
   * @param prevProps
   * @param name
   */
  static isUpdated(props, nextProps, name){
    if(InHere.isRender(props,name)) {
      const key = `$_${name}`
      const newVal = nextProps[key]
      const oldVal = props[key]
      return newVal != oldVal
    }else{
      return true
    }
  }
}

export default InHere
