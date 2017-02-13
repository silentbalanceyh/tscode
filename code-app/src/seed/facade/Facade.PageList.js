const SNAP = {
  ID:'$SNAPS$',
  OID:"v.ui.form.op",
  CID:'ui.column',
  SID:'controlId'
}
import Entity from '../entity'
import Assert from '../assert'
import Visitor from '../visitor'
import Common from './Facade.Common'
import Immutable from 'immutable'

class PageList{
  /** 生成Promise专用 **/
  static api({
    item, cache
  }){
    const params = {};
    params.type = "PAGELIST";
    const snaps = {};
    snaps[SNAP.CID] = SNAP.SID;
    snaps[SNAP.OID] = SNAP.SID;
    params.snaps = snaps;
    params.uri = "/env/pagelist/config";
    return Common.snaps(item,params,cache);
  }
  /** PageList的配置 **/
  static config(config){
    // config -> Object
    Assert.isObject({config});
    Assert.isDefinedKey({config},['cid',SNAP.ID]);
    let pagelist = {};
    // 1.DataList本身配置
    pagelist['cid'] = config.cid;
    // 2.DataList的初始化配置
    const configData = Visitor.visit(config);
    if(configData){
      pagelist = Object.assign(pagelist,configData);
    }
    // 3.PageList的Column配置
    pagelist['columns'] = [];
    if(config[SNAP.ID] && config[SNAP.ID][SNAP.CID]){
      let items = config[SNAP.ID][SNAP.CID];
      const $items = Immutable.fromJS(items);
      items = $items.sortBy(item => item.get('order')).toJS();
      items.forEach((item) => {
        pagelist['columns'].push(Entity.Data.flat(item));
      });
    }
    // 4.Action配置
    pagelist['op'] = [];
    if(config[SNAP.ID] && config[SNAP.ID][SNAP.OID]){
      let op = config[SNAP.ID][SNAP.OID];
      const $op = Immutable.fromJS(op);
      pagelist['op'] = $op.sortBy(item => item.get('order')).toJS()
    }
    return pagelist;
  }
}

export default PageList
