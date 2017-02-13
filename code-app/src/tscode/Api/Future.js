const base = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

const $_fnLocate = (position) => {
  if(position){
    return {
      key:'Default',
      title:'Start Point',
      position:position,
      icon:base,
      defaultAnimation:2
    }
  }
}
// Default Marker
const $_fnLocation = () => ({lat: 37.7, lng: -122.4})
// Format default marker
const $_fnMarker = () => (
  [$_fnLocate($_fnLocation())]
)

const $_fnState = () => ({
  markers:$_fnMarker()
})
export default {
  $_fnMarker,
  $_fnLocation,
  $_fnState,
  $_fnLocate
}
