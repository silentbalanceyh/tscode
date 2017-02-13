import React from 'react'
import Immutable from 'immutable'

class Component extends React.PureComponent{
  render(){
    const { data = [], config } = this.props;
    let $data = Immutable.fromJS(data)
    const items = []
    if(config.source){
      const $source = Immutable.fromJS(this.props).getIn(config.source)
      if($source){
        $source.toJS().forEach(item => {
          if($data.contains(String(item.uniqueId))){
            items.push(item[config.value])
          }
        })
      }
    }
    return (
      <div className="ui list">
        {
          items.map((item,idx) => (
            <li className="item" key={`item${item}${idx}`}>{item}</li>
          ))
        }
      </div>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    data: React.PropTypes.any
  }
}
export default Component
