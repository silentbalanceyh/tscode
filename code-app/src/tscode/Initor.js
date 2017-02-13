
const $_fnMarker = () => (
  [{
    title:'Start Point',
    type:'info',
    position:$_fnLocation()
  }]
)

const $_fnLocation = () => ({lat: 37.7, lng: -122.4})

export default {
  $_fnMarker,
  $_fnLocation
}
