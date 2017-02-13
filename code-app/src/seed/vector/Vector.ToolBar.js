import Immutable from 'immutable'
import Eblis from './Vector.Eblis'
import Input from './Vector.Input'

class ToolBar{

  static eblis(configuration = {}){
    /**
     * 0.ID配置
     */
    const lucifier = Eblis.ids(configuration.config)
    /**
     * 1.遍历mapping读取所有配置
     */
    let $eblis = Immutable.fromJS(lucifier)
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

export default ToolBar
