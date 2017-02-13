import Factory from './State.Factory'
import Cache from '../../cache'

class App {

  /**
   * 应用程序成功状态迁移
   * @param state
   */
  static success(state, {
    config = {}, data = {}, user = {},
    status = {}, slice = {}
  }) {
    /** 登录控制 **/
    const $user = Cache.Session.get(Cache.Key.SESSION)
    if (user && 'object' == typeof($user)) {
      status.isAuthorized = true
    }
    /** 添加状态节点，初始化的时候全部设置成false **/
    const $state = Factory.mergeMulti(state, [
      ['config'], ['status'],
      ['slice'], ['data'], ['user']
    ], [
      config, status,
      slice, data, user
    ]);
    return $state
  }

  /**
   * 应用程序失败状态迁移
   * @param error
   * @param status
   * @returns {*}
   */
  static failure(state, {
    error = {},
    status = {}
  }) {
    const $state = Factory.mergeMulti(state, [
      ['error'], ['status']
    ], [
      error, status
    ])
    return $state
  }
}

export default App;
