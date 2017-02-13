import 'rc-calendar/assets/index.css'
import React from 'react'
import FullCalendar from 'rc-calendar/lib/FullCalendar'

import 'rc-select/assets/index.css'
import Select from 'rc-select'

import moment from 'moment'

import $$ from '../../../seed'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'

import PureBusiness from '../../_assembly/PureBusiness'

class Component extends PureBusiness{
  constructor(props){
    super(props, 'hotel.RoomStatusCalendar')
    this.state = { selected:moment(), reload:false }
  }
  // ------------------------------------
  // Component Valid Ensure
  // ------------------------------------
  // ------------------------------------
  // Performance Fix
  // ------------------------------------
  shouldComponentUpdate(nextProps) {
    return true
  }

  componentWillMount() {
    $$.Tool.Flow.init(this.props)
  }

  componentDidUpdate(prevProps){
    /** 重新加载数据 **/
    dispatches.$_fnReload(this)
    dispatches.$_offMask(this.props,prevProps)
  }

  render(){
    const { $_data } = this.props
    const render = $$.Adom.Render.mountJObject($_data)
    /** 1.将日期格式本地化 **/
    moment.locale($$.I18n.localizer())
    // showTypeSwitch：不显示年月模式的交换，当前Calendar只能用于查询某年某月的房态信息
    return super.romance((render)?
      <FullCalendar
        style={{margin:10}}
        Select={Select}
        onSelect={dispatches.$_fnSelect(this.props)}
        onChange={dispatches.$_fnChange(this)}
        dateCellContentRender={dispatches.$_fnDateRender(this)}
        showTypeSwitch={false}
        fullscreen={true}
        locale={$$.I18n.calendar()}
      />:false)
  }
}

export default mapping.dispatch(Component,dispatches);
