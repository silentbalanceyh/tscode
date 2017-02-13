import Entity from '../entity'

class Params {
  /** Arena中的App级别的参数提取 **/
  static app(props) {
    /** 1.参数处理 **/
    const {params = {}} = props;
    return params;
  }

  /** Arena中的Module的参数提取 **/
  static module(props) {
    const {app:{language}, page, params} = props;
    // 参数基本转换，转换成pageId
    return Entity.Data.merge({pageId:page, language}, params);
  }

  /** Arena中提取参数params **/
  static query(props) {
    /** 1.提取属性 **/
    const {params = {}, location:{query}} = props;
    /** 2.合并参数生成最终参数 **/
    return Entity.Data.merge(params, query);
  }
}

export default Params
