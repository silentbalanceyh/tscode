import Assert from '../assert'
import Immutable from 'immutable'

const DFTS = {
  "holder.MessageHolder":{
    "title": ["config","info","title"],
    "icon": ["config","info","icon"],
    "brief":["config","spec","brief"],
    "messages":["config","spec","messages"]
  },
  "holder.CubeHolder":{
    "title": ["config","info","title"],
    "icon": ["config","info","icon"],
    "left": ["config","style","left"],
    "right": ["config","style","right"],
    "dimension":["config","spec","dimension"],
    "active":["config","spec","tab","active"]
  },
  "holder.SingleFormHolder":{
    "title": ["config","info","title"],
    "icon": ["config","info","icon"],
    "help":["config","info","help"],
    "left": ["config","style","left"],
    "right": ["config","style","right"],
    "theme":["config","style","help"],
    "steps":["config","spec","steps"],
    "connect":["config","connect"],
  },
  "holder.DivideHolder":{
    "title": ["config","info","title"],
    "icon": ["config","info","icon"],
    "help":["config","info","help"],
    "left": ["config","style","left"],
    "right": ["config","style","right"]
  },
  "holder.TabListHolder": {
    "title": ["config", "info", "title"],
    "icon": ["config", "info", "icon"],
    "steps": ["config", "info", "steps"],
    "left": ["config", "style", "left"],
    "right": ["config", "style", "right"],
    "theme": ["config", "style", "help"],
    "search": ["config", "spec", "search"],
    "connect":["config","connect"],
  },
  "holder.ListHolder": {
    "title": ["config", "info", "title"],
    "icon": ["config", "info", "icon"],
    "steps": ["config", "info", "steps"],
    "left": ["config", "style", "left"],
    "right": ["config", "style", "right"],
    "theme": ["config", "style", "help"],
    "search": ["config", "spec", "search"],
    "dynamic": ["config", "spec", "tab", "dynamic"],
    "active": ["uex", "tab", "active"],
    "headers": ["uex", "tab", "headers"]
  },
  "list.TriplexList": {
    "topbar": ["config", "op"],
    "selected": ["uex", "selected", "row"],
    "reload": ["uex", "reload", "pgList"],
    "empty": ["config", "spec", "empty"],
    "pager": ["config", "spec", "pager"],
    "goto": ["config", "spec", "goto"],
    "pages": ["config", "spec", "tab", "dynamic"],
    "counter": ["config", "spec", "counter"],
    "dropdown": ["config", "spec", "dropdown"]
  },
  "list.FlexList": {
    "topbar": ["config", "op"],
    "selected": ["uex", "selected", "row"],
    "reload": ["uex", "reload", "pgList"],
    "data": ["data", "list"],
    "empty": ["config", "spec", "empty"]
  },
  "form.StateForm": {
    "title": ["config", "info", "title"],
    "render": ["config", "spec", "render"]
  },
  "form.FieldSetForm": {
    "title": ["config", "info", "title"],
    "render": ["config", "spec", "render"],
    "fieldset": ["config", "spec", "fieldset"],
    "columns": ["config", "spec", "columns"]
  },
  "form.CriteriaForm":{
    "title":["config","info","title"],
    "criterias":["query","criterias"],
    "render":["config","spec","render"],
  }
}
class Mapping {
  /**
   *
   * @param config
   */
  static visit(config) {
    /** 配置中必须包含info键 **/
    Assert.isObject({config});
    /** 读取默认Mapping **/
    const mapping = DFTS[config.name] ? DFTS[config.name] : {}
    let target = Immutable.fromJS(mapping)
    if (!config.mapping) {
      return target.toJS()
    } else {
      return Object.assign(target.toJS(),config.mapping)
    }
  }
}

export default Mapping
