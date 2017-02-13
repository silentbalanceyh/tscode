import React from 'react'
import {
  GoogleMap,
  withGoogleMap,
  Marker
} from 'react-google-maps'

import Event from './Api/Event'
import Future from './Api/Future'
import Remote from './Api/Remote'
import mapping from '../spirit/_internal/Redux'

const DefinedMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={Future.$_fnLocation()}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));
class Component extends React.Component {

  constructor(props){
    super(props)
    this.state = Future.$_fnState();
  }
  componentWillMount(){
    Remote.$_fnInit(this)
  }
  render() {
    const {markers = []} = this.state
    return (
      <div className="ui container">
        <div className="ui top attached ui segment">
        </div>
        <div className="ui attached segment" style={{height: `600px`}}>
          <DefinedMap
            markers={markers}
            onMapClick={Event.onMapClick(this)}
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

export default mapping.direct(Component,Remote,{

})
