import React from 'react'
import {
  GoogleMap,
  withGoogleMap,
  Marker
} from 'react-google-maps'

import Util from './Util'
import fnInit from './Initor'
import dispatches from './Redux'
import mapping from '../spirit/_internal/Redux'

const DefinedMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={fnInit.$_fnLocation()}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker key={index}
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));
class Component extends React.Component {

  constructor(props){
    super(props)
    this.state = fnInit.$_fnState();
  }
  componentWillMount(){
    dispatches.$_fnInit(this.props)
  }
  render() {
    console.info(this.state);
    const {markers = fnInit.$_fnMarker()} = this.props

    return (
      <div className="ui container">
        <div className="ui top attached ui segment">
        </div>
        <div className="ui attached segment" style={{height: `600px`}}>
          <DefinedMap
            markers={markers}
            onMapClick={Util.onMapClick(this)}
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
