import Assert from '../assert'

class Tabular{
  /**
   *
   * @param config
   */
  static visit(config){
    /** 配置中必须包含info键 **/
    Assert.isObject({config});
    /** 抽取info **/
    return config.tabular;
  }
}

export default Tabular
