import Types from '../core/Types'
import Immutable from 'immutable'

const $_fnMapClick = (props) => (event) => {
  const selected = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  }
  const {dispatch} = props
  dispatch({type: Types.SUCCESS_SELECTED, selected})
}

const $_fnGroup = (key = '') => (data = []) => {
  const $data = Immutable.fromJS(data)
  return $data.groupBy(item => item.get(key)).toJS()
}

const $_fnStatus = $_fnGroup('status')

const $_fnType = $_fnGroup('facilitytype')

export default {
  $_fnMapClick,
  $_fnStatus,
  $_fnType
}
