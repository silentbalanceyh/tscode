import $$ from '../../seed'
import {connect} from 'react-redux'
import Immutable from 'immutable'
/**
 * 映射连接
 * @param Component
 * @param keys
 * @param dispatches
 * @param attr
 */
const single = (Component, keys, dispatches, attr = "current") => {
  /** State -> Props **/
  const mapStateToProps = (state) => {
    if (0 < keys.length) {
      const data = $$.Entity.Data.lookup(state, keys);
      const props = {};
      props[attr] = data;
      return props;
    } else {
      return {};
    }
  }
  /** Dispatch -> Props **/
  const mapDispatchToProps = (dispatch) => {
    let props = {dispatch};
    props = $$.Entity.Data.merge(props, dispatches); // Object.assign(props,Remote);
    return props;
  }
  return connect(mapStateToProps, mapDispatchToProps)(Component)
}

const direct = (Component, dispatches, mapping) => {
  /** State -> Props **/
  const mapStateToProps = (state) => (mapping)
  /** Dispatch -> Props **/
  const mapDispatchToProps = (dispatch) => {
    let props = {dispatch};
    props = $$.Entity.Data.merge(props, dispatches); // Object.assign(props,Remote);
    return props;
  }
  return connect(mapStateToProps, mapDispatchToProps)(Component)
}
/**
 *
 * @param Component
 * @param dispatches
 * @param mapping
 */
const multi = (Component, dispatches, mapping = {}) => {
  /** State -> Props **/
  const mapStateToProps = (state) => {
    const $state = Immutable.fromJS(state)
    if (0 < Object.keys(mapping).length) {
      const result = {}
      for (const key in mapping) {
        const path = mapping[key]
        if (Array.prototype.isPrototypeOf(path)) {
          let value = $state.getIn(path)
          if(value) {
            if (value.toJS) {
              result[key] = value.toJS()
            } else {
              result[key] = value
            }
          }else{
            // Undefined值保留
            result[key] = value
          }
        }
      }
      return result
    } else {
      return {};
    }
  }
  /** Dispatch -> Props **/
  const mapDispatchToProps = (dispatch) => {
    let props = {dispatch};
    props = $$.Entity.Data.merge(props, dispatches); // Object.assign(props,Remote);
    return props;
  }
  return connect(mapStateToProps, mapDispatchToProps)(Component)
}

const dispatch = (Component, dispatches) => {
  /** State -> Props **/
  const mapStateToProps = (state) => ({})
  /** Dispatch -> Props **/
  const mapDispatchToProps = (dispatch) => {
    let props = {dispatch};
    props = $$.Entity.Data.merge(props, dispatches); // Object.assign(props,Remote);
    return props;
  }
  return connect(mapStateToProps, mapDispatchToProps)(Component)
}

/**
 *
 * @param Component
 * @param dispatches
 * @param mapping
 */
const redux = (Component, dispatches) => {
  /** State -> Props **/
  const mapStateToProps = (state) => {
    const result = {}
    // Redux Form专用
    result['inputes'] = $$.Entity.Data.lookup(state,['form'])
    // 配置Form专用
    result['datum'] = $$.Entity.Data.lookup(state,['content','data','form'])
    // 配置validate专用
    result['validate'] = $$.Valve.sync
    // 配置asyncValidate
    // $$.Valve.asyncInject(result)
    result['asyncValidate'] = $$.Valve.async
    return result
  }
  /** Dispatch -> Props **/
  const mapDispatchToProps = (dispatch) => {
    let props = {dispatch};
    props = $$.Entity.Data.merge(props, dispatches); // Object.assign(props,Remote);
    return props;
  }
  return connect(mapStateToProps, mapDispatchToProps)(Component)
}

export default {
  single,
  multi,
  direct,
  redux,
  dispatch
}
