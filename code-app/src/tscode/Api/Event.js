import Future from './Future'

const onMapLoad = () => {

}

const onMapClick = (component) => (event) => {
  const newPos = {
    lat:event.latLng.lat(),
    lng:event.latLng.lng()
  }
  const marker = Future.$_fnLocate(newPos)
  const { markers } = component.state
  // Refresh the first element
  if(markers && 0 < markers.length){
    markers[0] = marker
    // Reset Status
    component.setState({
      markers:markers
    })
  }
}

const onMarkerRightClick = () => {

}

export default {
  onMapClick,
  onMapLoad,
  onMarkerRightClick
}
