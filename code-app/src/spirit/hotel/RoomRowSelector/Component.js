import React from 'react'
import $$ from '../../../seed'

import Cellula from '../../../spirit/field/_cellula'
import mapping from '../../_internal/Redux'
import dispatches from './Redux'
import css from './Component.scss'

class Component extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    dispatches.$_fnInit(this.props)
  }

  componentDidMount() {
    const { cid } = this.props
    jQuery(`#${cid}`).dropdown('clear')
  }

  componentDidUpdate(prevProps){
    /** 重新加载 **/
    dispatches.$_fnReload(this.props, prevProps)
    const { cid } = this.props
    jQuery(`#${cid}`).dropdown('clear')
  }

  render() {
    const {config, monitor, datum = {}, cid } = this.props;
    /** 1.计算下拉选项 **/
    const {meta} = config
    let data = $$.Entity.Data.lookup(this.props, meta.source)
    const filter = monitor[meta.filter]
    /** 1.1.注意第二条件用于过滤已经选中项 **/
    data = data.list.filter(item => (item[meta.filter] == filter && dispatches.$_fnExcept(datum, item.uniqueId)))
    /** 2.计算下拉选项 **/
    const options = []
    const {value, display} = meta.options
    if (0 < data.length) {
      data.forEach(item => {
        const option = {}
        option.value = item[value]
        option.display = item[display]
        options.push(option)
      })
    }
    /** 3.计算value **/
    const input = {}
    input.onChange = dispatches.$_fnSelect(this.props)
    const disables = datum[cid] ? datum[cid] : []
    return (
      <div className={`ui horizontal list`}>
        <div className="item">
          {Cellula.Neuron.jsxSelect({
            options,
            cid,
            className: css['select'],
            clear: true,
            compact: true
          }, input)}
        </div>
        <div className="item">
          <button className="ui small blue button"
                  disabled={(0 == disables.length) ? true : false}
                  onClick={dispatches.$_fnClean(this.props)}>清除所选
          </button>
        </div>
      </div>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    data: React.PropTypes.any
  }
}
export default mapping.single(Component, [
  "content", "data", "extension", "scheduled"
], dispatches, 'datum')
