import Eblis from './Vector.Eblis'
import Immutable from 'immutable'
import Input from './Vector.Input'

class DataList{
  /**
   * DataList组件专用的EBLIS配置
   * @param configuration
   */
  static eblis(configuration = {}){
    /**
     * 0.ID配置
     */
    const lucifier = Eblis.ids(configuration.config)
    /**
     * 1.遍历mapping读取所有数据
     */
    let $eblis = Immutable.fromJS(lucifier);
    $eblis = $eblis.merge(Eblis.lookup(configuration))
    /**
     * 2.Ajax相关Promise配置
     */
    const ajaxes = Eblis.config(configuration.config)
    if (ajaxes && 0 < Object.keys(ajaxes).length) {
      $eblis = $eblis.set('$_ajax', ajaxes)
      /**
       * 3.为Ajax准备特殊输入
       */
      $eblis = $eblis.merge(Input.data(ajaxes,configuration))
    }
    /**
     * 4.读取Data List中特殊配置
     */
    if(configuration.config.items){
      $eblis = $eblis.set('$_items',configuration.config.items)
    }
    /**
     * 5.处理更新配置
     */
    const controls = Eblis.updated(configuration)
    if(controls && 0 < Object.keys(controls).length){
      /**
       * 5.1.更新表设置
       */
      $eblis = $eblis.set('$_renew',controls)
    }
    return $eblis.toJS()
  }
}

export default DataList
