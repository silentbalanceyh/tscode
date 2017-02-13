import Assert from '../assert'

class Info{
  /**
   *
   * @param config
   */
  static visit(config){
    /** 配置中必须包含info键 **/
    Assert.isObject({config});
    /** 抽取info **/
    return config.info;
  }
}

export default Info
