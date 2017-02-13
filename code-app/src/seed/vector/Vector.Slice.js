import Eblis from './Vector.Eblis'
import Input from './Vector.Input'
import Ruler from './Vector.Ruler'
import Tool from '../tool'

import Entity from '../entity'
import Immutable from 'immutable'

class Slice {
  /**
   * 读取所有slice
   * @param props
   */
  static slices(props) {
    const pathes = ['app', 'slice']
    return Entity.Data.lookup(props, pathes);
  }

  /**
   * 读取所有horiz
   * @param props
   * @param horiz
   */
  static horiz(props = {}, horiz = {}) {
    /** 1.处理params **/
    let $props = Immutable.fromJS(props)
    const params = Entity.Params.query(props)
    $props = $props.set('params',params)
    /** 2.处理HorizData信息 **/
    const horizData = {}
    for (const key in horiz) {
      const pathes = horiz[key]
      const data = Entity.Data.lookup($props.toJS(), pathes)
      if(data && 0 < Object.keys(data).length) {
        horizData[key] = data
      }
    }
    return horizData
  }



  /**
   * 集中收集所有slices
   * @param config
   */
  static collect(config, slices) {
    let ret = []
    if (config.connect) {
      const cids = Immutable.fromJS(Object.keys(config.connect))
      const filtered = slices.filter(item => cids.contains(item.cid))
      filtered.forEach(item => {
        ret.push(item)
        ret = ret.concat(Slice.collect(item, slices))
      })
    }
    return ret
  }

  /**
   * 访问当前connect节点
   * @param props
   * @param current
   */
  static connect(props, current = {}) {
    /** 1.读取当前的connect节点 **/
    const slices = Slice.slices(props)
    const {connect} = current
    /** 2.读取子slices **/
    const connected = {}
    if (connect && connect) {
      const slice = {}
      /** 处理组件连接 **/
      const cids = Immutable.fromJS(Object.keys(connect))
      const filtered = slices.filter(item => cids.contains(item.cid))
      /** 3.重新构造slice新的数据结构 **/
      filtered.forEach(item => {
        /** 抽取data节点，用于填充子节点数据 **/
        if(connect[item.cid].data){
          item.data = connect[item.cid].data
        }
        slice[connect[item.cid].position] = item
      })
      connected['$_slice'] = slice
    }
    return connected
  }
  /**
   * 读取slice相关配置
   * @param config
   * @param prop
   */
  static eblisLayout(props, position) {
    /** 0.ID配置 **/
    let pathes = ['app', 'layout', position]
    const current = Entity.Data.lookup(props, pathes)
    const lucifier = Eblis.ids(current);
    /**
     * 1.遍历mapping读取所有配置
     */
    let $inputData = Immutable.fromJS(props.app)
    /** 必须先执行转换将app的配置数据拷贝到app节点，以及params的拷贝 **/
    $inputData = $inputData.set('app',props.app.config)
    $inputData = $inputData.set('config',current)
    $inputData = $inputData.set('params',Entity.Params.query(props))
    let $eblis = Immutable.fromJS(lucifier)
    const mapped = Eblis.lookup($inputData.toJS())
    $eblis = $eblis.merge(mapped)
    /**
     * 2.读取子Slice信息，point和connect两部分
     */
    const slice = Slice.connect(props, current)
    /**
     * 3.检查slices
     */
    $eblis = $eblis.merge(slice)
    /**
     * 4.检测当前组件之下是否存在其他slices，如果存在则slices原生变量需要继续传递
     */
    const slices = Slice.slices(props)
    const children = Slice.collect(current, slices)
    const size = (slice['$_slice']) ? Object.keys(slice['$_slice']).length : 0
    if (children.length > size) {
      // 如果搜索到的子Slice比当前的直接connect的slice长度大，证明slice还需要往下传
      $eblis = $eblis.set('slice', slices)
      $eblis = $eblis.set('$_child', slice['$_child'])
    }
    /** 5.处理当前Slice的Ajax **/
    const ajaxes = Eblis.config(current)
    const inputData = $inputData.toJS()
    if (ajaxes && 0 < Object.keys(ajaxes).length) {
      $eblis = $eblis.set('$_ajax', ajaxes)
      $eblis = $eblis.merge(Input.data(ajaxes,inputData))
    }
    /** 6.读取当前数据的Ruler **/
    const rulers = Ruler.config(inputData)
    if (rulers && 0 < Object.keys(rulers).length){
      $eblis = $eblis.set('$_ruler',rulers)
    }
    return $eblis.toJS()
  }

  /**
   * Slice只支持两级
   * @param horiz
   * @param config
   */
  static eblisSlice(config,data) {
    /** 0.ID配置 **/
    const lucifier = Eblis.ids(config)
    /**
     *  1.读取Slice信息
     */
    let $eblis = Immutable.fromJS(lucifier)
    const inputData = {config,inherit:data}
    $eblis = $eblis.merge(Eblis.lookup(inputData))
    /**
     *  3.Ajax相关Promise配置
     */
    const ajaxes = Eblis.config(config)
    if (ajaxes && 0 < Object.keys(ajaxes).length) {
      $eblis = $eblis.set('$_ajax', ajaxes)
      /**
       * 4.为Ajax准备特殊输入
       */
      $eblis = $eblis.merge(Input.data(ajaxes,inputData))
    }
    /** 6.读取当前数据的Ruler **/
    const rulers = Ruler.config(inputData)
    if (rulers && 0 < Object.keys(rulers).length){
      $eblis = $eblis.set('$_ruler',rulers)
    }
    return $eblis.toJS()
  }
}

export default Slice
