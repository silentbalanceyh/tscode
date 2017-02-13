import Tool from '../tool'
import Ajax from '../ajax'

class Ingest {
  /**
   * 将最终结果和返回数据合并生成新状态，
   * 注：这里不能使用Immutable，因为需要修改状态
   * @param state
   * @param props
   * @param data
   */
  static merge(component, data, loaded = false) {
    /** 1.设置状态数据 **/
    const state = component.state
    /** 2.设置state的数据 **/
    state.data = data.list
    /** 3.设置pager **/
    if (component.props.query) {
      state.pager.index = component.props.query.pager.index
      state.pager.size = component.props.query.pager.size
    }
    if (state.pager) {
      /** 4.设置counter **/
      state.counter.count = data.count
      state.counter.pages = Math.ceil(data.count / state.pager.size)
    }
    /** 5.设置加载项 **/
    state.loaded = loaded
    /** 6.返回最终状态 **/
    return state
  }

  /**
   * 初始化Ingest
   * @param props
   */
  static init(component) {
    const {props, state} = component
    /** 1.构造远程Promise **/
    const promise = Ingest.promise(props, state)
    /** 2.调用promise **/
    promise.then((data) => {
      /** 3.修改当前组件状态，因为有值所以将loaded设置成true **/
      const $state = Ingest.merge(component, data, true)
      /** 4.设置最新状态 **/
      component.setState($state)
    })
  }

  /**
   * 创建当前Dialog使用的Promise
   * @param props
   */
  static promise(props, state) {
    /** 1.提取ingest参数 **/
    const {ingest, query, selector} = props
    /** 2.根据ingest构造promise **/
    if (state.criterias) query.criterias = state.criterias
    if (state.pager) query.pager = state.pager
    const prepared = Tool.Parameter.prepare(selector, ingest, query)
    /** 3.直接返回Promise **/
    const {method, api, parameters} = prepared;
    /** 4.处理Sigma **/
    if(props.sigma) parameters.sigma = props.sigma
    return Ajax.Async.locator(method, api, parameters)
  }
}

export default Ingest
