const SNAP = {
  ID:'$SNAPS$',
  IID:'ui.item',
  SID:'controlId'
};
import Entity from '../entity'
import Assert from '../assert'
import Visitor from '../visitor'
import Common from './Facade.Common'

class DataList{
  /** 生成Promise专用 **/
  static api({
    item, cache
  }) {
    const params = {};
    params.type = "DATALIST";
    const snaps = {};
    snaps[SNAP.IID] = SNAP.SID;
    params.snaps = snaps;
    params.uri = "/env/datalist/config";
    return Common.snaps(item,params,cache);
  }
  /** DataList的配置 **/
  static config(config){
    // config -> Object
    Assert.isObject({config});
    Assert.isDefinedKey({config},['cid',SNAP.ID]);
    let datalist = {};
    // 1.DataList本身配置
    datalist['cid'] = config.cid;
    // 2.DataList的初始化配置
    const configData = Visitor.visit(config);
    if(configData){
      datalist = Object.assign(datalist,configData);
    }
    // 3.DataList的Item配置
    datalist['items'] = [];
    if(config[SNAP.ID] && config[SNAP.ID][SNAP.IID]){
      const items = config[SNAP.ID][SNAP.IID];
      items.forEach((item) => {
        datalist['items'].push(Entity.Data.flat(item));
      });
    }
    return datalist;
  }
}

export default DataList
