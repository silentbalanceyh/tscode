import React from 'react'
import {
  GoogleMap,
  withGoogleMap,
  Marker
} from 'react-google-maps'

import fnMarker from './Marker'
import fnInit from './Initor'
import dispatches from './Redux'
import mapping from '../spirit/_internal/Redux'

const DefinedMap = withGoogleMap(props => (
  <GoogleMap
    ref={fnMarker.onMapLoad}
    defaultZoom={14}
    defaultCenter={fnInit.$_fnLocation()}
    onClick={fnMarker.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker key={index}
        {...marker}
        onRightClick={() => fnMarker.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));
class Component extends React.Component {

  componentWillMount(){
    dispatches.$_fnInit(this.props)
  }
  render() {
    const {markers = fnInit.$_fnMarker()} = this.props

    return (
      <div className="ui container">
        <div className="ui top attached ui segment">
        </div>
        <div className="ui attached segment" style={{height: `600px`}}>
          <DefinedMap
            markers={markers}
            containerElement={
              <div style={{height: `100%`}}/>
            }
            mapElement={
              <div style={{height: `100%`}}/>
            }>
          </DefinedMap>
        </div>
      </div>
    )
  }
}

export default mapping.direct(Component,dispatches,{

})
