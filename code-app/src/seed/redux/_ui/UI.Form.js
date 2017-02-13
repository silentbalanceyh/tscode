import Immutable from 'immutable'
import Builder from '../Redux.Builder'
import System from '../_state/State.System'
import Bitrary from '../Redux.Bitrary'
import Kit from '../Redux.Kit'
import Tool from '../../tool'

class Form {
  /**
   * Form初始化
   * @param state
   * @param data
   * @param key
   * @param form
   * @returns {any|*}
   */
  static init(state, {
    data = {},
    keys = {},
    form = {}
  }) {
    // 0.构造state的Immutable对象转换一个新的JavaScript对象
    let _state = Immutable.fromJS(state).toJS()
    // 1.添加tabular, record, assist, cat
    for (let item in keys) {
      let key = keys[item];
      let itemData = data[item];
      // 2.特殊处理tabular
      itemData = System.tabular(key, itemData);
      // 3.处理最终数据部分
      _state = Builder.refreshState(_state, itemData, key);
    }

    // 4.处理当前的Form状态信息
    let $state = Immutable.fromJS(_state);
    // 处理type
    if (form.type && Tool.Form.isSearchForm(form.type)) {
      const active = $state.getIn(['uex', 'tab', 'active'])
      if (0 == active) {
        // 满足条件的搜索Form专用设置激活页
        $state = $state.setIn(['uex', 'tab', 'active'], 1)
      }
    }
    if (form.cid && form.state) {
      let pathes = ["data", "form", form.cid, 'state'];
      $state = $state.setIn(pathes, form.state)
      // 5.重新生成当前Form状态，因为执行过初始化
      // $state = Kit.resetHash($state, form.cid, state)
    }
    return $state.toJS();
  }

  /**
   * Form设置查询条件
   * @param state
   * @param criterias
   * @param form
   */
  static criteria(state, {
    criterias,
    form,
    active
  }) {
    let $state = Immutable.fromJS(state);
    // 设置查询路径
    let pathes = ['query', 'criterias']
    $state = $state.setIn(pathes, criterias)
    // 修改当前Form的Hash
    if (undefined === active) {
      /** 默认情况设置active **/
      $state = $state.setIn(['uex', 'tab', 'active'], 1)
    }
    // 搜索的Reload必须设置，相同数据
    $state = $state.setIn(['uex','reload',form],Bitrary.string(16))
    /** 修改了再刷新 **/
    $state = Kit.resetHash($state, form, state)
    // 读取状态信息
    return $state.toJS()
  }

  /**
   * Clean当前Form的配置
   * @param state
   * @param form
   * @returns {any|*}
   */
  static clean(state, {
    form
  }) {
    let $state = Immutable.fromJS(state);
    // 清空初始化参数
    let pathes = ['data', 'form', form, 'initialValues'];
    $state = $state.deleteIn(pathes)
    // 设置Hash值
    return $state.toJS()
  }

  /**
   * 设置Form的状态
   * @param state
   * @param etat
   * @param form
   * @returns {any|*}
   */
  static etat(state, {
    etat,
    form
  }) {
    let $state = Immutable.fromJS(state);
    const pathes = ['data', 'form', form, 'state'];
    $state = $state.setIn(pathes, etat);
    return $state.toJS();
  }
}

export default Form
