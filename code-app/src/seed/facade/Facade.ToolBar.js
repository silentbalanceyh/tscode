const SNAP = {
  ID:"$SNAPS$",
  OID:"v.ui.form.op",
  SID:"controlId"
}

import Common from './Facade.Common'
import Assert from '../assert'
import Visitor from '../visitor'
import Immutable from 'immutable'
/**
 * 借用了Form的Op
 */
class ToolBar{

  static config(config){
    // config -> Object
    Assert.isObject({config});
    Assert.isDefinedKey({config},['cid',SNAP.ID]);
    let toolbar = {}
    // 1.ToolBar本身配置
    toolbar['cid'] = config.cid
    // 2.Toolbar的初始化配置
    const configData = Visitor.visit(config);
    if(configData){
      toolbar = Object.assign(toolbar,configData);
    }
    // 3.Action配置
    toolbar['op'] = [];
    if(config[SNAP.ID] && config[SNAP.ID][SNAP.OID]){
      let op = config[SNAP.ID][SNAP.OID];
      const $op = Immutable.fromJS(op);
      toolbar['op'] = $op.sortBy(item => item.get('order')).toJS()
    }
    return toolbar
  }

  static api({
    item, cache
  }){
    const params = {};
    params.type = "TOOLBAR";
    const snaps = {};
    snaps[SNAP.OID] = SNAP.SID;
    params.snaps = snaps;
    params.uri = "/env/form/config";
    return Common.snaps(item,params,cache);
  }
}

export default ToolBar
