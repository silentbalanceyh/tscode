import Immutable from 'immutable'

class Builder {
  /**
   * 创建data节点
   * @param $state
   * @param key
   * @param data
   * @returns {*}
   */
  static data($state, key, data) {
    let $data = $state.get('data');
    if (!$data) $data = Immutable.fromJS({});
    return $data.setIn(key, data);
  }

  /**
   * 创建state内容
   * @param $state
   * @param $data
   * @returns {*}
   */
  static status($state, $data) {
    let $status = $state.get('status');
    $status = $status.set('isData', true);
    if($data) {
      $state = $state.set('data', $data.toJS());
    }
    return $state.set('status', $status.toJS());
  }

  /**
   * 通用刷新
   * @param state
   * @param data
   * @param key
   * @returns {*|any}
   */
  static refreshState(state, data, key) {
    // 1.创建immutable对象
    let $state = Immutable.fromJS(state);
    console.assert($state !== state);
    // 2.构造record记录
    const $data = Builder.data($state, key, data);
    // 2.加载$state
    $state = Builder.status($state, $data);
    return $state.toJS();
  }

}

export default Builder
