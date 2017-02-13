const onMapLoad = () => {

}

const onMapClick = (component) => (event) => {
  const newPos = {
    lat:event.latLng.lat(),
    lng:event.latLng.lng()
  }
  const nextMarkers = [
    ...component.state.markers,
    {
      position: newPos,
      key: Date.now()
    }
  ]
  component.setState({
    markers:nextMarkers
  })
}

const onMarkerRightClick = () => {

}

export default {
  onMapClick,
  onMapLoad,
  onMarkerRightClick
}
