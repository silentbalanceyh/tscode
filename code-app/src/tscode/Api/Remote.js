import $$ from '../../seed'
import Config from '../config.json'

const $_filterData = (data = []) => {
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

const $_refreshMarkers = (component, data = []) => {
  // Extract old markers
  const {markers = []} = component.state
  // Selected
  const selected = 0 < markers.length ? markers[0] : null
  // Error for Old
  if (selected) {
    const target = [selected].concat($_filterData(data))
    component.setState({
      markers: target
    })
  }
}

const $_fnInit = (component) => {
  const promise = $$.Ajax.Api.get(Config['api'])
  promise.then(data => {
    if (0 < data.length) {
      $_refreshMarkers(component, data)
    }
  })
}

export default {
  $_fnInit
}
