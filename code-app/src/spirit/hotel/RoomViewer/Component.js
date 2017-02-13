import 'rc-calendar/assets/index.css'
import 'rc-time-picker/assets/index.css'
import React from 'react'
import moment from 'moment'

import css from './Component.scss'
import selectors from './Selectors'
import $$ from '../../../seed'
// 切换时间组件
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import Calendar from 'rc-calendar'
import DatePicker from 'rc-calendar/lib/Picker'

import StatusList from './StatusList'
import RoomIcons from './RoomIcons'

class Component extends React.Component {

  constructor(props) {
    super(props)
    this.state = selectors.$_fnInit(props)
  }

  componentDidMount() {
    $$.Dialog.Ingest.init(this)
  }

  render() {
    const {selector} = this.props
    const {dimension, data = [], tabIndex = 0} = this.state
    console.info(this.props)
    let firstDim = []
    if (dimension.first) {
      const {path} = dimension.first
      firstDim = $$.Entity.Data.lookup(selector, path).list
    }
    let second = {}
    if (dimension.second) {
      const {path} = dimension.second
      second = $$.Entity.Data.lookup(selector, path)
    }
    moment.locale($$.I18n.localizer())
    const reference = this
    /** 4.Calendar初始化 **/
    const calendar = (
      <Calendar locale={zhCN}
                disabledTime={null}
                format={'YYYY年MM月DD日'}
                showDateInput={true}
                style={{zIndex: 1000}}
                dateInputPlaceholder={'请输入查询日期'}/>)
    const search = (selector.search && "disabled" == selector.search) ? false : true
    return (
      <div>
        <div className={`ui top attached menu ${css['top']} ${css['item']}`}>
          <div className="actions">
            <div className={`ui action input ${css['search']}`}>
              {
                (search) ? (
                    <div className="inline field">
                      <label className={css['ilabel']}>选择时间：</label>
                      <div className="ui input">
                        <DatePicker id={'dpStatusDate'}
                                    name={name}
                                    animation="slide-up"
                                    calendar={calendar}
                                    onChange={selectors.$_fnChangeDate(reference)}
                                    value={selectors.$_fnNow(this.props)}
                                    format={'YYYY年MM月DD日'}>
                          {
                            ({value}) => {
                              return (
                                <input id={`selector-${'dpStatusDate'}`}
                                       readOnly={true}
                                       className={`ant-calendar-picker-input ant-input`}
                                       value={value && value.format("YYYY年MM月DD日") || ''}
                                       placeholder={'请输入查询日期'}/>
                              )
                            }
                          }
                        </DatePicker>
                      </div>
                    </div>
                  ) : false
              }
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="inline field">
                {(!this.state.loaded) ? <label className={css['ilabel']}>
                    数据加载中……
                  </label> : false
                }
              </div>
            </div>
          </div>
        </div>
        <div className={`ui attached segment ${css['item']} ${css['pagelist']}`}>
          <div className={`ui two column grid`}>
            <div className="column" style={{width: "83%"}}>
              {
                (0 < data.length) ? (
                    <div>
                      <div className={`ui top attached tabular menu`}>
                        {
                          firstDim.map((item, idx) => {
                            const name = `cube-tab${item.uniqueId}`;
                            let className = idx == tabIndex ? "active item" : "item";
                            className = `${className} ${css['ctitle']}`
                            return (
                              <div className={`cubetab ${className} ${css['ctab']}`} key={name}
                                   id={`cubetab${item.uniqueId}`}
                                   onClick={selectors.$_fnMove(item.uniqueId)}>{item[dimension.first.target]}</div>
                            )
                          })
                        }
                      </div>
                      {
                        firstDim.map((fitem, fidx) => {
                          const name = `cube-tabpage${fitem.uniqueId}`
                          let className = fidx == tabIndex ? "ui bottom attached active tab segment rtvheight cubetab" : "ui bottom attached tab segment rtvheight cubetab";
                          className = `${className} ${css['tabpage']}`
                          let secondDim = second.list ? second.list.filter(item => item[dimension.second.filter] == fitem.uniqueId) : []
                          secondDim = secondDim.reverse()
                          return (
                            <div className={className} key={name} id={`cubepage${fitem.uniqueId}`}>
                              {
                                secondDim.map((sitem, sidx) => {
                                  const $_current = data.filter(ditem => ditem[dimension.first.field] == fitem.uniqueId && ditem[dimension.second.field] == sitem.uniqueId)
                                  const name = `cube-tabpage-item${fidx}${sidx}`;
                                  return (
                                    <dl className={`ui divided selection list ${css['cdatalist']}`} key={name}>
                                      <dt className={`item ${css['citem']}`}>
                                        <label
                                          className={`ui green circular label`}>{sitem[dimension.second.target]}</label>
                                      </dt>
                                      <dd className={`item ${css['cdatalist']}`}>
                                        <StatusList $_current={$_current} {...selector}/>
                                      </dd>
                                    </dl>
                                  )
                                })
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                  ) : false
              }
            </div>
            <div className="column" style={{width: "16%"}}>
              <RoomIcons tabular={selector.tabular}/>
            </div>
          </div>
        </div>
        <div className={`ui bottom attached menu ${css['bottom']} ${css['item']}`}>
          <div className={`actions ${css['actions']}`}>
            <div id='btnYes' className="ui ok red button">
              <i className="reply icon"></i>
              返回
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Component
