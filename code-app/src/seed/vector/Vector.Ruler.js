import Immutable from 'immutable'

class Ruler {
  /**
   * 输入信息读取，从配置中读取Ruler
   * @param inputData
   * @param pathes
   */
  static config(inputData = {}, pathes) {
    /** 1.路径设置 **/
    pathes = (pathes) ? pathes : ['config', 'ruler']
    /** 2.读取Ruler信息 **/
    const $inputData = Immutable.fromJS(inputData)
    let ruler = $inputData.getIn(pathes)
    /** 3.默认为{} **/
    if(!ruler){
      ruler = Immutable.fromJS({})
    }
    return ruler.toJS()
  }
}

export default Ruler
