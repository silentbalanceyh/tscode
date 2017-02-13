import Immutable from 'immutable'
import Future from '../api/Future'

const buildMarker = (data = []) => {
  const filtered = []
  data.forEach(item => {
    const dataItem = {}
    // Title
    dataItem['title'] = item['applicant']
    dataItem['position'] = {
      lat: parseFloat(item['latitude']),
      lng: parseFloat(item['longitude'])
    }
    dataItem['key'] = item[':id']
    filtered.push(dataItem)
  })
  return filtered
}

const fnData = (state, {
  data = []
}) => {
  if (0 == data.length) {
    return state;
  } else {
    // Data
    let $state = Immutable.fromJS(state)
    $state = $state.set('data', data)
    // Markers
    const markers = buildMarker(data)
    // Refresh Data
    const initMarker = [Future.$_fnLocate()]
    const refreshed = initMarker.concat(markers)
    $state = $state.set('markers', refreshed)
    return $state.toJS();
  }
}

export default{
  SUCCESS_DATA: fnData
}
