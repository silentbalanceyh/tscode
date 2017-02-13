import { connect } from 'react-redux'

import Event from '../api/Event'
import Future from '../api/Future'
import Remote from '../api/Remote'

import Component from '../ui/Component'

export default connect((state) => {
  // State => Prop
  const { app = {} } = state
  return {
    selected:app.selected,
    data:app.data,
    markers:app.markers
  }
},
  // Dispatch => Prop
  (dispatch) => {
  let props = {dispatch}
  props = Object.assign(props,Future)
  props = Object.assign(props,Remote)
  props = Object.assign(props,Event)
  return props
})(Component)
