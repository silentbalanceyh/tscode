const SNAP = {
  ID:'$SNAPS$',
  FID:'ui.field',
  VID:'ui.validate.rule',
  OID:'v.ui.form.op',
  SID:'controlId'
};
import Assert from '../assert'
import Common from './Facade.Common'
import Immutable from 'immutable'
import Visitor from '../visitor'

class Form {

  /**
   * 处理Form返回值
   * @param config
   */
  static config(config){
    // config -> Object
    Assert.isObject({config});
    Assert.isDefinedKey({config},['cid',SNAP.ID])
    let form = {};
    // 1.Form本身配置
    form['cid'] = config.cid;
    // 2.Form的初始化配置
    const configData = Visitor.visit(config);
    if(configData){
      form = Object.assign(form,configData);
    }
    // 3.Form的字段配置
    form['field'] = [];
    if(config[SNAP.ID] && config[SNAP.ID][SNAP.FID]){
      let fields = config[SNAP.ID][SNAP.FID];
      const $fields = Immutable.fromJS(fields);
      fields = $fields.sortBy(item => item.get('order')).toJS();
      fields.forEach((item) => {
        form['field'].push(item);
      });
    }
    // 4.Validate的配置信息
    const ruleMeta = [];
    if(config[SNAP.ID] && config[SNAP.ID][SNAP.VID]){
      const rules = config[SNAP.ID][SNAP.VID];
      rules.forEach((item) => {
        const rule = {};
        rule['rule'] = item['rule'];
        rule['field'] = item['field'];
        rule['config'] = item['config'];
        rule['state'] = item['state'];
        rule['async'] = item['async'];
        ruleMeta.push(rule);
      })
    }
    // 4.1.validate的分流
    form['validate'] = ruleMeta
    // 5.Action的配置
    form['op'] = [];
    if(config[SNAP.ID] && config[SNAP.ID][SNAP.OID]){
      let op = config[SNAP.ID][SNAP.OID];
      const $op = Immutable.fromJS(op);
      form['op'] = $op.sortBy(item => item.get('order')).toJS();
    }
    return form;
  }
  /** 生成Promise专用 **/
  static api({
    item, cache
  }) {
    const params = {};
    params.type = "FORM";
    const snaps = {};
    snaps[SNAP.FID] = SNAP.SID;
    snaps[SNAP.VID] = SNAP.SID;
    snaps[SNAP.OID] = SNAP.SID;
    params.snaps = snaps;
    params.uri = "/env/form/config";
    return Common.snaps(item,params,cache);
  }
}

export default Form
