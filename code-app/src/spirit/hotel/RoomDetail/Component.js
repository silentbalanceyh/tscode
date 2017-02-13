import React from 'react'
import dispatches from './Redux'
import css from './Component.scss'

class Component extends React.Component {

  render() {
    /** 1.本地数据化，不从远程读取 **/
    const {selector = {}} = this.props
    /** 2.读取房间的基础数据 **/
    let {data = {}, selected } = selector
    /** 3.解析选择器中的数据 **/
    let render;
    if (data.list) {
      data = data.list.filter(item => item.uniqueId == selected)
      render = (1 == data.length)
      data = data[0]
    }
    /** 4.房型信息处理 **/
    data = dispatches.$_fnCalcStatus(data, selector)

    return (
      <div>
        <div className={`ui top attached menu ${css['top']} ${css['item']}`}>
          <div className={`ui header ${css['header']}`}>房间详细信息</div>
        </div>
        <div className={`ui attached segment ${css['item']} ${css['pagelist']}`}>
          {
            (render) ? (
                <div className="ui grid">
                  <div className="row">
                    <div className="column">
                      <div className="ui left aligned basic segment">
                        <div className="ui blue horizontal statistic">
                          <div className="value">
                            {data.room.number}
                          </div>
                          <div className="label">
                            {data.roomType.name}
                          </div>
                        </div>
                        <div className="ui horizontal divider">基本信息</div>
                        <div className="ui list">
                          <div className="item">栋信息：{data.tent.name} —— {data.tent.code}</div>
                          <div className="item">层信息：{data.floor.name} —— {data.floor.code}</div>
                          <div className="item">早餐券：{data.roomType.brekkerTicket}张</div>
                          <div className="item">午餐券：{data.roomType.lunchTicket}张</div>
                          <div className="item">晚餐券：{data.roomType.supperTicket}张</div>
                        </div>
                        <div className="ui horizontal divider">房间状态</div>
                        <div className="ui list">
                          <div className="item">
                            清洁状态：
                            <i className={`${data.cleanStatus.config.icon} icon`}></i>
                            {data.cleanStatus.name}
                          </div>
                          <div className="item">
                            特殊状态：
                            <i className={`${data.opStatus.config.icon} icon`}></i>
                            {data.opStatus.name}
                          </div>
                          <div className="item">
                            预离房<i className={`${data.flags['Leaving'].icon} icon`}></i>：
                            {(data.leaving && !data.arriving)?"是":"否"}
                          </div>
                          <div className="item">
                            预抵房<i className={`${data.flags['Arriving'].icon} icon`}></i>：
                            {(!data.leaving && data.arriving)?"是":"否"}
                          </div>
                          <div className="item">
                            空房间<i className={`${data.flags['Empty'].icon} icon`}></i>：
                            {(!data.leaving && !data.arriving)?"是":"否"}
                          </div>
                          <div className="item">
                            占用房<i className={`${data.flags['Taken'].icon} icon`}></i>：
                            {(data.leaving && data.arriving)?"是":"否"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : false
          }
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
