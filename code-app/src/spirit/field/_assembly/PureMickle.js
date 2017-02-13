import React from 'react'
import {Field} from 'redux-form'
import Cellula from '../_cellula'
import css from '../_cellula/Pivot/Pivot.scss'
import $$ from '../../../seed'

class Component extends React.PureComponent {

  constructor(props, type = 'radio', redux = {}) {
    super(props)
    this.type = type
    this.component = Cellula.Pivot.jsxOption
    this.redux = redux
  }

  shouldComponentUpdate(){
    return false
  }

  render() {
    const {config} = this.props;
    const {name, cid} = config;
    /** 注入dispatch方法 **/
    const { dispatch } = this.props
    if(dispatch){
      config.dispatch = dispatch
    }
    /**
     *  1.宽度计算
     *   1）如果多列，则根据99% / column计算每一列的宽度
     *   2）需要注意如果设置了range则表示当前这个field会跨行操作，结果会影响最终宽度
     */
    const style = Cellula.Iota.calcWide(config)
    /**
     *  2.inline计算
     */
    const inline = (config.inline) ? 'inline': ''
    /**
     *  3.Label计算
     */
    const { label } = config
    /**
     *  4.Items计算
     */
    const { items = []} = config
    return (
      <div className={`${inline} field ${css['field']}`.trim()} style={style}>
        <label style={Cellula.Iota.labelWidth()}>
          {label}
          {Cellula.Lymph.jsxAsterisk(config)}
        </label>
        <div className="ui input">
          {
            items.map((item,idx) => {
              /** 打印RadioBox信息 **/
              $$.Logger.Input.field(config, 'jsxRadio')
              const id = `${cid}${idx}`
              return (
                <div className={`ui radio checkbox ${css['radiobox']}`} key={id}>
                  <Field id={id} name={name} type={this.type} value={item.value} config={config} component={this.component}/>
                  <label>{item.label}</label>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Component
