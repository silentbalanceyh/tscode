import React from 'react'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'

class Component extends React.PureComponent {

  render() {
    const {data, config, dispatch, selected} = this.props;
    let {target} = this.props
    target = (target) ? target : ((config.target) ? config.target : undefined)
    const checked = (data == selected) ? true : false
    return (
      <div className="ui flitted radio checkbox" style={config.style}>
        <input type="radio" name={config.group} value={data} checked={checked}
               readOnly={true}
               onClick={dispatches.fnSelected(dispatch, target, config.path)}/>
        <label></label>
      </div>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    config: React.PropTypes.shape({
      group: React.PropTypes.string.isRequired
    }).isRequired,
    data: React.PropTypes.any
  }
}

export default mapping.multi(Component, dispatches,{
  selected:["content","uex","selected","row"]
});
