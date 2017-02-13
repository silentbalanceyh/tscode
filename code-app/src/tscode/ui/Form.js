import React from 'react'
import {reduxForm, Field} from 'redux-form'
import Types from '../core/Types'
import Config from '../config.json'

const Render = (display) => ({
  input
}) => {
  return (
    <input {...input} className="ui mini input"/>
  )
}
const Submit = (props) => (state) => {
  const {dispatch} = props
  const {distance = Config['distance']} = state
  dispatch({type: Types.SUCCESS_DISTANCE, distance})
}

class Component extends React.Component {
  componentDidMount() {
    const {initialize} = this.props
    if (initialize) {
      initialize({distance: Config['distance']})
    }
  }

  render() {
    const {handleSubmit, distance} = this.props
    const display = (distance) ? distance : Config['distance']
    return (
      <form id="fmDistance" className="ui form" onSubmit={handleSubmit(Submit(this.props))}>
        <div className="field">
          <Field type="text" className="ui mini input" component={Render(display)} name="distance"/>
        </div>
        <div className="inline field">
          <button type="submit" className="ui blue button">Change</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'fmDistance'
})(Component)
