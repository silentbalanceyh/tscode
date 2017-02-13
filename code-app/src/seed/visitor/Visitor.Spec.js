import Assert from '../assert'
import Immutable from 'immutable'
import Shared from './Visitor.Shared'

const DFTS = {
  "list.TriplexList":{
    "goto":"第{0}页",
    "counter":"总共{1}页，{0}条数据",
    "dropdown":{
      "prefix":"每页显示",
      "options": [10,15,20,50,100]
    },
    "pager":[
      {"name": "btnFirst","text": "首页","icon": "angle double left","code": "pageFirst"},
      {"name": "btnPrevious","text": "上一页","icon": "angle left","code": "pagePrev"},
      {"name": "btnNext","text": "下一页","icon": "angle right","code": "pageNext","inverted": true},
      {"name": "btnLast","text": "末页","icon": "angle double right","code": "pageLast","inverted": true}
    ]
  }
}

const DFTCV = {
  TPLIST:["goto","counter","dropdown","pager","tab","empty"]
}

const DFTSFUN = {
  "list.TriplexList":(dft, config) => {
    const result = Shared.$_fnMerge(dft, config.spec, DFTCV.TPLIST)
    const $existing = Immutable.fromJS(DFTCV.TPLIST)
    /** 合并多余的配置项 **/
    if(config.spec) {
      for (const key in config.spec) {
        if (!$existing.contains(key)) {
          result[key] = config.spec[key]
        }
      }
    }
    return result
  }
}
class Spec{
  /**
   *
   * @param config
   */
  static visit(config){
    /** 配置中必须包含info键 **/
    Assert.isObject({config});
    /** 提取默认的Mapping **/
    const spec = DFTS[config.name]?DFTS[config.name]:{}
    let target = Immutable.fromJS(spec)
    if(!config.spec){
      return target.toJS()
    }else{
      const jsFun = DFTSFUN[config.name]
      if(jsFun) return jsFun(target, config)
      else return config.spec
    }
  }
}

export default Spec
