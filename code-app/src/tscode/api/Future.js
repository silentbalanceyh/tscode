const base = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

const $_fnLocate = (position) => {
  if (!position) position = {lat: 37.7, lng: -122.4}
  return {
    key: 'Default',
    title: 'Start Point',
    position: position,
    icon: base,
    defaultAnimation: 2
  }
}

export default {
  $_fnLocate
}
