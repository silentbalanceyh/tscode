import _State from './_state'
import _UI from './_ui'
// ------------------------------------
// 初始化状态
// ------------------------------------
class State {
  /**
   *
   * @type {{}}
   */
  static Redux = {
    reset: _State
  }
  /**
   *
   * @type {{success: Data.successHash}}
   */
  static Hash = {
    success: _State.Data.successHash,
  }
  /**
   *
   * @type {{success: Data.successArray}}
   */
  static Array = {
    success: _State.Data.successArray
  }
  /**
   * Fantom数据处理，用于处理各种数据集合
   * @type {{success: Data.successFantom}}
   */
  static Fantom = {
    success: _State.Data.successFantom,
    clean:_State.Data.cleanFantom
  }
  /**
   * 针对Arbor节点的处理统一管理
   * @type {{}}
   */
  static Arbor = {
    success: _State.Data.successApp,
    init: _State.Data.successTpl,
    download:_State.Data.download,
  }
  /**
   * 针对Module中的Gooney节点处理的统一管理
   * @type {{}}
   */
  static Gooney = {
    success: _State.Data.successMod,
    clean:_State.Data.cleanData
  }
  /**
   * 模块状态管理
   * @type {{success, failure}}
   */
  static Module = {
    success: _State.Module.success,
    failure: _State.Module.failure,
    loading: _State.Module.loading,
  }
  /**
   * 应用程序状态管理
   * @type {{success: *, failure: (any)}}
   */
  static App = {
    success: _State.App.success,
    failure: _State.App.failure
  }
  /**
   * 初始化状态信息
   * @type {{app: Initiator.initAppState, module: Init.initModState}}
   */
  static Init = {
    app: _State.Init.initAppState,
    module: _State.Init.initModState
  }
  /**
   * 初始化状态信息
   * @type {{}}
   */
  static Status = {
    write:_State.Status.write
  }
  /**
   * 连接UI部分
   * @type {{Tab}}
   */
  static UI = _UI
}

export default State
