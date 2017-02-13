import Assert from '../assert'

class Cat{
  /**
   *
   * @param config
   */
  static visit(config){
    /** 配置中必须包含info键 **/
    Assert.isObject({config});
    /** 抽取info **/
    return config.cat;
  }
}

export default Cat
