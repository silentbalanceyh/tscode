import Event from './Event'
import $$ from '../../seed'
import Dialog from '../ui/Dialog'

const base = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

const $_fnSelected = () => ({lat: 37.763997637045456, lng: -122.408946454525})

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

const $_fnMarker = (props = {}) => (marker = {}) => () => {
  const { data = []} = props
  const { key } = marker
  if(key){
    let mapping = Event.$_fnData(data)
    mapping = mapping[key]
    if(mapping && 0 < mapping.length){
      mapping = mapping[0]
    }
    console.info(mapping)
    if(mapping){
      $$.Dialog.Retort.dialog(Dialog,mapping,'winDialog')
    }
  }
}

export default {
  $_fnLocate,
  $_fnMarker,
  $_fnSelected
}
