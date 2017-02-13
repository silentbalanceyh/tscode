import 'rc-calendar/assets/index.css'
import 'rc-time-picker/assets/index.css'
import 'rc-color-picker/assets/index.css'
import React from 'react'
import moment from 'moment'

import $$ from '../../../../seed'
// 切换时间组件
import Calendar from 'rc-calendar'
import DatePicker from 'rc-calendar/lib/Picker'
import TimePickerPanel from 'rc-time-picker/lib/Panel'

import ColorPicker from 'rc-color-picker'

class Marrow {
  /**
   * 渲染时间格式
   * @param config
   * @param input
   * @returns {XML}
   */
  static jsxDate(config, input) {
    const {
      hint, name, cid,
      style, format = {},
      className,
    } = config;
    /** 1.将日期格式本地化，注意只是 **/
    moment.locale($$.I18n.localizer())
    const {date, time} = format
    /** 2.设置格式，是否时间格式 **/
    const meta = {}
    meta.format = time ? date + ' ' + time : date
    if (input.value) {
      input.value = moment(input.value, meta.format)
    }
    /** 3.计算分钟和秒 **/
    let minute = false, second = false
    if (time) {
      if (0 <= time.indexOf('mm')) minute = true
      if (0 <= time.indexOf('ss')) second = true
    }
    /** 4.Calendar初始化 **/
    const calendar = (
      <Calendar locale={$$.I18n.calendar()}
                timePicker={time ? <TimePickerPanel showMinute={minute} showSecond={second}/> : null}
                disabledTime={null}
                format={meta.format}
                showDateInput={false}
                style={Object.assign({zIndex: 1000}, style)}
                dateInputPlaceholder={hint}/>)
    return (
      <DatePicker id={cid}
                  name={name}
                  animation="slide-up"
                  calendar={calendar}
                  format={meta.format}
                  value={input.value ? input.value : null}
                  onChange={input.onChange}
                  onBlur={input.onBlur}
                  onFocus={input.onFocus}>
        {
          ({value}) => {
            return (
              <input id={`selector-${cid}`}
                     style={style}
                     className={`ant-calendar-picker-input ant-input ${className}`}
                     value={value && value.format(meta.format) || ''}
                     placeholder={hint}
                     onChange={input.onChange}
                     onBlur={input.onBlur}
                     onFocus={input.onFocus}/>
            )
          }
        }
      </DatePicker>
    )
  }


  static changehandler(colors) {
  console.log(colors)
}

  static jsxColor(config, input) {
      const {
        hint, name, cid,
        style, format = {},
        className,
      } = config;
    const {color} = input.value;

      return (
          <ColorPicker
            id={cid}
            name={name}
            animation="slide-up"
            color={color}
            defaultColor="#000000"
            {...input}
          >
          </ColorPicker>
    )
  }
}

export default Marrow
