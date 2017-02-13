import React from 'react'
import {
  GoogleMap,
  withGoogleMap,
  Marker
} from 'react-google-maps'

const DefinedMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{lat: 37.7, lng: -122.4}}
  >
    {props.markers.map((marker, index) => (
      <Marker {...marker}/>
    ))}
  </GoogleMap>
));
class Component extends React.Component {

  componentWillMount() {
    const {$_fnInit} = this.props
    console.assert($_fnInit)
    if ($_fnInit) {
      $_fnInit(this.props)
    }
  }

  render() {
    const {markers = []} = this.props
    console.info(this.props)
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

export default Component
