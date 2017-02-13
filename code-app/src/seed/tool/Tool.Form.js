import Immutable from 'immutable'
import Entity from '../entity'
import Adom from '../adom'
import Format from './Tool.Format'

const ETAT_MAP = {
  "COMMON": "commun",
  "ADD": "ajouter",
  "VIEW": "vue",
  "EDIT": "modifier"
}

const options = (config = {}, meta = {}) => {
  let $config = Immutable.fromJS(config)
  if (config.options) {
    let optionRaw = Entity.Data.lookup(meta, config.options.concat("list"))
    if (!optionRaw) optionRaw = []
    /** 构造最终返回结果 **/
    const options = []
    optionRaw.forEach((item) => {
      const option = {}
      option.value = item[config.value]
      /** 1.是否表达式 **/
      if (config.expr) {
        /** 显示的信息为表达式格式 **/
        option.display = Format.expression(config.display, item)
      } else {
        /** 显示的信息直接从字段中提取 **/
        option.display = item[config.display]
      }
      options.push(option)
    })
    $config = $config.set('options', options)
  }
  return $config
}

const treenodes = (config = {}, meta = {}) => {
  let $config = Immutable.fromJS(config)
  if (config.treenodes) {
    let treenodeRaw = Entity.Data.lookup(meta, config.treenodes.concat("list"))
    if (!treenodeRaw) treenodeRaw = []
    /** 构造最终返回结果 **/
    const treenodes = []
    treenodeRaw.forEach((item) => {
      const treenode = {}
      treenode.key = item[config.key]
      treenode.pId = item[config.pid]
      treenode.value = item[config.value]
      /** 1.是否表达式 **/
      if (config.expr) {
        /** 显示的信息为表达式格式 **/
        treenode.label = Format.expression(config.display, item)
      } else {
        /** 显示的信息直接从字段中提取 **/
        treenode.label = item[config.display]
      }
      treenodes.push(treenode)
    })
    $config = $config.set('treenodes', treenodes)
  }
  return $config
}

/**
 * 提取当前字段需要使用的assit
 * @param config
 * @param meta
 */
const assist = (config = {}, meta = {}) => {
  let $config = Immutable.fromJS(config)
  /** 1.读取Meta中的selector **/
  if (meta.assist && config.assist) {
    $config = $config.set('assist', meta.assist[config.assist])
  }
  return $config
}
/**
 *
 * @param config
 * @param meta
 */
const selector = (config = {}, meta = {}) => {
  let $config = Immutable.fromJS(config)
  /** 1.读取Meta中的selector **/
  if (meta.selector) {
    $config = $config.set('selector', meta.selector)
  }
  return $config
}
/**
 * 从config中直接抽取Tabular，注意返回值
 * @param $config
 * @param meta
 */
const tabular = (config = {}, meta = {}) => {
  let $config = Immutable.fromJS(config)
  /** 1.读取Tabular专用配置 **/
  if (meta.tabular) {
    const code = $config.get('code')
    /** 2.绑定Tabular **/
    const tabular = meta.tabular[code]
    if (tabular) {
      $config = $config.set('tabular', tabular)
    }
  }
  return $config
}
/**
 *
 * @param config
 * @param meta
 */
const user = (config = {}, meta = {}) => {
  let $config = Immutable.fromJS(config)
  if (meta.user) {
    $config = $config.set('user', meta.user)
  }
  return $config
}

/**
 *
 * @param config
 * @param meta
 */
const sigma = (config = {}, meta = {}) => {
  let $config = Immutable.fromJS(config)
  if (meta.sigma) {
    $config = $config.set('sigma', meta.sigma)
  }
  return $config
}

class Form {
  /**
   *
   * @param props
   */
  static render(props) {
    const {$_tabular, $_assist, $_render = {}} = props
    if ($_render) {
      let assist = ($_render.assist) ? Adom.Render.mountJObject($_assist) : true
      let tabular = ($_render.tabular) ? Adom.Render.mountJObject($_tabular) : true
      return assist && tabular
    } else {
      return true
    }
  }

  /**
   *
   * @param fields
   * @param etat
   */
  static criterias(fields = [], etat) {
    const criterias = {}
    const configKey = ETAT_MAP[etat]
    fields.forEach((field) => {
      criterias[field.name] = field[configKey]['criteria']
    })
    return criterias
  }

  /**
   * 1.根据Form当前状态处理Fields
   * @param config
   * @param state
   * @param meta
   * @returns {any|*}
   */
  static configField(config, state, meta = {}) {
    /** 1.读取当前状态配置 **/
    let $config = Immutable.fromJS(config)
    const field = ETAT_MAP[state]
    const stateData = $config.get(field);
    if (stateData) {
      $config = $config.merge($config.get(field))
      /** 2.读取Tabular **/
      $config = tabular($config.toJS(), meta)
      /** 3.读取Selector **/
      $config = selector($config.toJS(), meta)
      /** 4.读取Assist **/
      $config = assist($config.toJS(), meta)
      /** 5.读取Options **/
      $config = options($config.toJS(), meta)
      /** 5.2 读取Treenodes **/
      $config = treenodes($config.toJS(), meta)
      /** 6.设置Sigma **/
      $config = sigma($config.toJS(), meta)
      /** 7.读取user **/
      $config = user($config.toJS(), meta)
      return $config.toJS();
    }
  }

  /**
   *
   * @param etat
   */
  static configKey(etat) {
    if (Form.etat(etat)) {
      return ETAT_MAP[etat]
    }
  }

  /**
   * 初始化配置信息
   * @param props
   */
  static initUi(props) {
    /** 1.读取配置节点 **/
    const {config = {}, datum, form} = props
    /** 2.读取field，op相关信息 **/
    if (datum) {
      const current = datum[form]
      if (current.state) {
        const ret = config[current.state]
        /** 3.处理配置结果 **/
        return {
          field: ret.$_field ? ret.$_field : [],
          op: ret.$_op ? ret.$_op : []
        }
      }
    }
  }

  /**
   *
   */
  static configData(props = {}) {
    const {
      $_tabular, $_assist, $_selector,
      $_sigma, $_user, $_extension,
      $_cid, $_data, $_reload, $_renew
    } = props
    const {validate, inputes, $_monitor, dispatch} = props
    /** 数据节点拷贝 **/
    const data = {}
    if ($_tabular) data['tabular'] = $_tabular
    /** Hash节点的改变 **/
    if ($_reload) data['reload'] = $_reload
    /** 当前界面的改变 **/
    if ($_renew) data['renew'] = $_renew
    if ($_assist) data['assist'] = $_assist
    if ($_selector) data['selector'] = $_selector
    if ($_sigma) data['sigma'] = $_sigma
    if ($_user) data['user'] = $_user
    if ($_extension) data['extension'] = $_extension
    if ($_cid) data['cid'] = $_cid
    if ($_data) data['data'] = $_data
    /** Redux Form专用 **/
    if (dispatch) data['dispatch'] = dispatch
    if (validate) data['validate'] = validate
    if (inputes && $_monitor) {
      const monitor = {}
      for (const key in $_monitor) {
        const path = $_monitor[key]
        const value = Entity.Data.lookup(inputes, path)
        if (value) {
          monitor[key] = value
        }
      }
      data['monitor'] = monitor
    }
    return data
  }

  /**
   * 2.根据Form当前状态处理Op
   * @param config
   * @param state
   * @returns {*}
   */
  static filterOp(config, state) {
    const supported = Entity.Data.lookup(config, ['state', 'supported']);
    const $supported = Immutable.fromJS(supported);
    return $supported.contains(state);
  }

  /**
   * 3.根据Form当前状态处理Validate Rule
   * @param validate
   * @param state
   * @returns {Array.<*>}
   */
  static filterRules(validate = [], state) {
    return validate.filter((item) => Form.filterOp(item, state));
  }

  /**
   * 4.检查Form状态是否合法
   * @param state
   * @returns {boolean}
   */
  static etat(state) {
    const $supported = Immutable.Set.of("COMMON", "ADD", "EDIT", "VIEW")
    return $supported.contains(state)
  }

  /**
   * 5.判断是否一个Array类型
   * @param type
   */
  static isArrayField(type) {
    const $supported = Immutable.Set.of("field.TextBoxArray")
    return $supported.contains(type)
  }

  /**
   * 判断是否Hidden类型
   * @param type
   * @returns {boolean}
   */
  static isHidden(type) {
    const $supported = Immutable.Set.of('field.Hidden', 'field.LoaderHidden')
    return $supported.contains(type)
  }

  /**
   *
   * @param type
   */
  static isError(type) {
    const $supported = Immutable.Set.of(
      'field.CounterBox',
      'field.OrderedBox',
      'field.AsyncBox',
      'field.DatePicker',
      'field.CalculateDater'
    )
    return $supported.contains(type)
  }

  /**
   *
   * @param type
   * @returns {boolean}
   */
  static isTime(type) {
    const $supported = Immutable.Set.of('field.DatePicker')
    return $supported.contains(type)
  }

  /**
   *
   * @param identifier
   */
  static isSigma(identifier) {
    const $supported = Immutable.Set.of("sys.list.fixed")
    return $supported.contains(identifier)
  }

  /**
   *
   * @param type
   */
  static isDropdown(type) {
    const $supported = Immutable.Set.of('field.StaticDrop', 'field.TabularDrop', 'field.FilterSelector', 'field.TabularSelector')
    return $supported.contains(type)
  }

  /**
   *
   * @param type
   */
  static isCheckbox(type) {
    const $supported = Immutable.Set.of('field.CheckBox')
    return $supported.contains(type)
  }

  /**
   *
   * @param type
   * @returns {boolean}
   */
  static isSearchForm(type) {
    const $supported = Immutable.Set.of('form.CriteriaForm')
    return $supported.contains(type)
  }
}

export default Form
