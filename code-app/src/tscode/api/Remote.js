import $$ from '../../seed'
import Config from '../config.json'
import Types from '../core/Types'

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

const $_fnInit = (props) => {
  const promise = $$.Ajax.Api.get(Config['api'])
  const {dispatch} = props
  return promise.then(data => {
    if (0 < data.length) {
      dispatch({type: Types.SUCCESS_DATA, data})
    }
  })
}

export default {
  $_fnInit
}
