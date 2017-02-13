const base = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

const $_fnSelected = () => ({lat: 37.7, lng: -122.4})

const $_fnLocate = (position) => {
  if (!position) position = $_fnSelected()
  return {
    key: 'Default',
    title: 'Start Point',
    position: position,
    icon: base,
    defaultAnimation: 2
  }
}

export default {
  $_fnLocate,
  $_fnSelected
}
