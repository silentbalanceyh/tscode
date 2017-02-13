const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'

const icons = {
  info:iconBase + 'ranger_station.png'
}
const $_fnMarker = () => (
  [{
    key:'Default',
    title:'Start Point',
    position:$_fnLocation(),
    defaultAnimation:2,
    color:"blue"
  }]
)

const $_fnLocation = () => ({lat: 37.7, lng: -122.4})

const $_fnState = () => ({
  markers:$_fnMarker()
})
export default {
  $_fnMarker,
  $_fnLocation,
  $_fnState
}
