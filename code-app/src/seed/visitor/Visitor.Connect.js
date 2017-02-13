import Assert from '../assert'

class Connect {
  /**
   *
   * @param config
   * @param slice
   * @returns {{}}
   */
  static visit(config) {
    /** 配置中必须包含connect键 **/
    Assert.isObject({config});
    /** 遍历slice **/
    return config.connect;
  }
}

export default Connect
