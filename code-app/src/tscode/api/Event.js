import Future from './Future'

const $_fnMapClick = (component) => (event) => {
  const newPos = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  }
  const marker = Future.$_fnLocate(newPos)
  // Reset Status
  component.setState({
    markers: [marker]
  })
}

export default {
  $_fnMapClick
}
