import Immutable from 'immutable'
import Eblis from './Vector.Eblis'
import Input from './Vector.Input'

import Logger from '../logger'

class PageList{
  /**
   * PageList组件的EBLIS配置
   * @param configuration
   */
  static eblis(configuration = {}){
    let timer = new Logger.Timer('Eblis PageList','eblis(configuration)')
    timer.start()
    /**
     * 0.ID配置
     */
    const lucifier = Eblis.ids(configuration.config)
    timer.end()
    timer.output(`1 Start ${lucifier.$_cid}`)
    timer = new Logger.Timer('Eblis PageList','eblis(configuration)')
    timer.start()
    /**
     * 1.遍历mapping读取所有数据
     */
    let $eblis = Immutable.fromJS(lucifier);
    $eblis = $eblis.merge(Eblis.lookup(configuration))
    timer.end()
    timer.output(2)
    timer = new Logger.Timer('Eblis PageList','eblis(configuration)')
    timer.start()
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
    timer.end()
    timer.output(3)
    timer = new Logger.Timer('Eblis PageList','eblis(configuration)')
    timer.start()
    /**
     * 4.读取Page List中特殊配置
     */
    if(configuration.config.columns){
      $eblis = $eblis.set('$_columns',configuration.config.columns)
    }

    timer.end()
    timer.output(4)
    timer = new Logger.Timer('Eblis PageList','eblis(configuration)')
    timer.start()
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
    timer.end()
    timer.output(`5 End ${lucifier.$_cid}`)
    return $eblis.toJS()
  }
}

export default PageList
