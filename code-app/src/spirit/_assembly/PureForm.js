import PureModule from './PureModule'
import memoize from 'lodash/memoize'
import Immutable from 'immutable'
import $$ from '../../seed'

class PureForm extends PureModule{
  // ------------------------------------
  // 统一构造函数，提供当前组件名
  // ------------------------------------
  constructor(props, name) {
    super(props,{
      logger:'form',
      name,
      parent:'PureForm'
    })
  }
  // ------------------------------------
  // Component Valid Ensure
  // ------------------------------------
  componentWillMount() {
    /** 0.专用组件验证 **/
    $$.Tool.Flow.init(this.props,{ force:true })
  }

  componentDidUpdate(prevProps) {
    // 必须代码，在Router修改了params时重新初始化
    $$.Plugin.ReduxForm.initialize(this.props, prevProps);
  }
  // ------------------------------------
  // Component Valid Ensure
  // ------------------------------------
  componentWillUnmount() {
    $$.Plugin.ReduxForm.clean(this.props)
  }
  _shouldComponentUpdate = memoize((nextProps) => {
    let updated = $$.Tool.Hooker.isRefresh(this.props, nextProps)
    // Dirty为true时要执行re-render，Fix Redux Form的Issue
    if(!updated){
      updated = $$.Tool.Hooker.isRefreshForm(this.props, nextProps)
    }
    if (process.env.NODE_ENV === `development`) {
      if (updated) {
        this.counter++
      } else {
        this.resetCounter = true
      }
    }
    // datum判断
    if(!updated){
      const odatum = Immutable.fromJS(this.props['datum'])
      const ndatum = Immutable.fromJS(nextProps['datum'])
      updated = !Immutable.is(odatum,ndatum)
    }
    return updated
  })
  // ------------------------------------
  // Performance Fix
  // ------------------------------------
  shouldComponentUpdate(nextProps) {
    return this._shouldComponentUpdate(nextProps)
  }
}

export default PureForm
