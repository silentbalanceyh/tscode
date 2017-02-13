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
    const oldMarker = $state.get('markers')
    let initMarkers;
    if(!oldMarker){
      initMarkers = [Future.$_fnLocate()]
    }else{
      initMarkers = [oldMarker.toJS()[0]]
    }
    const refreshed = initMarkers.concat(markers)
    $state = $state.set('markers', refreshed)
    return $state.toJS();
  }
}

const fnSelected = (state, {
  selected = {}
}) => {
  if(selected){
    let $state = Immutable.fromJS(state)
    let $selected = $state.get('selected')
    if($selected){
      $selected = $selected.toJS()
      selected.distance = $selected.distance
    }
    $state = $state.set('selected',selected)
    // Refresh Markers
    let markers = $state.get('markers')
    if(markers){
      markers = markers.toJS()
      if(0 < markers.length) markers[0] = Future.$_fnLocate(selected)
      $state = $state.set('markers',markers)
    }
    return $state.toJS()
  }else{
    return state
  }
}

const fnDistance = (state,{
  distance = 5
}) => {
  let $state = Immutable.fromJS(state)
  let selected = $state.get('selected')
  if(selected){
    selected = selected.toJS()
    selected.distance = distance
    $state = $state.set('selected',selected)
    return $state.toJS()
  }else{
    selected = Object.assign({distance},Future.$_fnSelected())
    $state = $state.set('selected',selected)
    return $state.toJS()
  }
}

export default{
  SUCCESS_DATA: fnData,
  SUCCESS_SELECTED: fnSelected,
  SUCCESS_DISTANCE: fnDistance
}
