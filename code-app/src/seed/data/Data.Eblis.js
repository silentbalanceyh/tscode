import Ajax from '../ajax'
import Cache from '../cache'
import Tool from '../tool'
import Tabular from './Data.Tabular'
import Immutable from 'immutable'
/**
 * 防止Assist重复加载
 * @param assist
 * @param meta
 */
class Eblis{
  /**
   * 生成单个Promise
   * @param props
   * @param config
   * @param params
   */
  static common(props, config, params, refresh){
    /** 1.处理参数 **/
    const prepared = Tool.Parameter.prepare(props,config,params);
    /** 2.直接返回Promise **/
    const { method, api, parameters } = prepared;
    if(props["$_sigma"]) parameters.sigma = props['$_sigma']
    /** 3.主Record是否Tabular专用链接 **/
    if(Tabular.isTabular(api)){
      /** Tabular主流程专用 **/
      parameters.type = config.tabular
    }
    return Ajax.Async.locator(method, api, parameters, refresh);
  }

  /**
   *
   * @param props
   * @param config
   * @param params
   */
  static assist(props, config, params = {}){
    /** 1.Assist删除query参数 **/
    delete params.orders
    delete params.pager
    delete params.criterias
    delete params.filters
    return Eblis.common(props, config, params, config.refresh)
  }
  /**
   * Record类型的Ajax处理，只能返回单个Promise
   * @param props
   * @param params
   */
  static record(props, params = {}, refresh){
    const {$_ajax:{record}} = props;
    /** 1.读取Cache **/
    const data = Cache.Config.readData(Eblis.cacheKey(props))
    if(data){
      /** 2.Local的Promise数据 **/
      return Ajax.Async.storage(data)
    }else{
      return Eblis.common(props, record, params, refresh)
    }
  }

  /**
   * 构造缓存参数
   * @param props
   */
  static cacheKey(props){
    const { params } = props
    const { record } = props.$_ajax
    const user = Cache.Session.get(Cache.Key.SESSION)
    return { user, config:record, params }
  }

  /**
   *
   * @param output
   */
  static key(output){
    let keys = []
    if(0 < output.indexOf(',')){
      keys = output.split(',')
    }else{
      keys = [output]
    }
    return keys
  }
  /**
   *
   * @param props
   */
  static output(props = {}) {
    const ajaxes = props.$_ajax?props.$_ajax:{}
    const {record, assist, cat, tabular} = ajaxes
    const key = {};
    if (record && record.output)key.record = Eblis.key(record.output);
    if (assist){
      const meta = Eblis.filterAssist(props.$_assist,assist)
      for(const item in meta){
        const value = meta[item]
        if(value.output) {
          key[item] = Eblis.key(value.output)
        }else{
          key[item] = Eblis.key(`assist,${item}`)
        }
      }
    }
    if (cat && cat.output) key.cat = Eblis.key(cat.output);
    if (tabular && tabular.output) key.tabular = Eblis.key(tabular.output);
    return key;
  }

  /**
   *
   * @param props
   * @param promise
   * @param params
   */
  static promises(props, promise, params = {}){
    /** 1.提取Ajax专用配置 **/
    const { $_ajax, $_assist, $_tabular } = props
    /** 2.提取添加标准的Promise **/
    const promises = {};
    if(promise) promises.input = promise
    /** Ajax存在时候处理 **/
    if($_ajax) {
      /** 3.提取Record中的Promise **/
      if ($_ajax.record) {
        const promise = Eblis.record(props, params, true)
        promises.record = promise
      }
      /** 4.提取Tabular中的Promise **/
      if ($_ajax.tabular) {
        const promise = Tabular.promise(props)
        promises.tabular = promise
      }
      /** 5.提取Assist中的Promise **/
      if ($_ajax.assist){
        const meta = Eblis.filterAssist($_assist,$_ajax.assist)
        for(const key in meta){
          const assist = meta[key]
          if(assist){
            const promise = Eblis.assist(props,assist,params)
            promises[key] = promise
          }
        }
      }
    }
    return promises;
  }

  static filterAssist(assist = {}, meta = {}){
    const $assist = Immutable.fromJS(meta).toJS()
    for(const key in $assist){
      if(assist[key] && !$assist[key].refresh){
        delete $assist[key]
      }
    }
    return $assist
  }
}

export default Eblis
