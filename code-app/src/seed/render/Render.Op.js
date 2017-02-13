import React from 'react'
import Assert from '../assert'
import Tool from '../tool'
// ======================================================
// Operation Render
// ======================================================
const getUCA = (config) => {
  Assert.isObject({config});
  Assert.isDefinedKey({config}, ['op']);
  // 0.提取所需要的UCA
  const {op} = config
  // 1.提取组件信息
  const Component = Tool.UCA.uca(op);
  Assert.isFunction({Component});
  return Component
}

const getKey = (config) => {
  const key = {}
  key['key'] = config.cid
  key['type'] = config.op
  return key
}
class Op {
  /** **/
  static injectProps(config, props) {
    /** 1.是否存在callback回调 **/
    if (props['$_fnCallback']) config['fnCallback'] = props['$_fnCallback']
    /** 2.注入cid **/
    if (props['$_cid']) config.form = props['$_cid']
    /** 3.处理当前站点的root **/
    if (props['$_route']) config.route = props['$_route']
  }

  /**
   * 渲染Link类型
   * @param config
   * @param props
   */
  static jsxLink(config, props, meta) {
    // 1.提取组件信息
    const Component = getUCA(config)
    /** 执行回调信息 ** **/
    Op.injectProps(config, props)
    /** OP中是否追加sigma **/
    config.sigma = props['$_sigma']
    const key = getKey(config)
    return (<Component {...key} config={config} meta={meta}/>)
  }

  /**
   *
   * @param config
   * @param props
   * @param meta
   */
  static jsxAct(config, props, meta = {}) {
    // 1.提取Redux Form需要的信息
    const {
      handleSubmit,
      reset,
      pristine,
      submitting,
    } = props;
    // 2.提取组件信息
    const Component = getUCA(config)
    /** 执行回调信息 ** **/
    Op.injectProps(config, props)
    /** OP中是否追加sigma **/
    if (props["$_sigma"]) config.sigma = props["$_sigma"]
    // 4.传入Op组件中
    const key = getKey(config)
    return (<Component {...key} config={config}
                       handleSubmit={handleSubmit}
                       reset={reset}
                       pristine={pristine}
                       submitting={submitting}
                       meta={meta}/>)
  }

  /**
   *
   * @param config
   * @param props
   * @param etat
   * @returns {XML}
   */
  static jsxOp(config, props, etat, meta = {}) {
    // 1.提取Redux Form需要的信息
    const {
      handleSubmit,
      reset,
      pristine,
      submitting,
    } = props;
    // 2.提取组件信息
    const Component = getUCA(config)
    // 3.判断显示条件
    const render = Tool.Form.filterOp(config, etat);
    /** 执行回调信息 ** **/
    Op.injectProps(config, props)
    /** OP中是否追加sigma **/
    if (props["$_sigma"]) config.sigma = props["$_sigma"]
    // 4.传入Op组件中
    const key = getKey(config)
    return (render) ?
      (<Component {...key} config={config}
                  handleSubmit={handleSubmit}
                  reset={reset}
                  pristine={pristine}
                  submitting={submitting}
                  meta={meta}/>
      ) : false
  }
}

export default Op
