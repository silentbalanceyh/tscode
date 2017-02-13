import React from 'react'
import Immutable from 'immutable'


import dispatches from './Redux'
import mapping from '../../_internal/Redux'

class Component extends React.PureComponent {
  render() {
    const {data = [], config, cid} = this.props;
    let $data = Immutable.fromJS(data)
    const items = []
    if (config.source) {
      const $source = Immutable.fromJS(this.props).getIn(config.source)
      if ($source) {
        $source.toJS().forEach(item => {
          if ($data.contains(String(item.uniqueId))) {
            items.push(item[config.value])
          }
        })
      }
    }
    const rooms = dispatches.$_fnCalcItems(items)
    return (
      <div id={cid} className="ui list" value={data}>
        {(0 < rooms.length) ? rooms.map((items,ridx) => (
            <div className="item" key={`row${ridx}`}>
              {(0 < items.length) ? items.map((item, idx) => (
                  <label className="ui green basic label" key={`item${item}${idx}`}>{item}</label>)) : config.empty}
            </div>
          )) : false}
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
export default mapping.dispatch(Component,dispatches);
