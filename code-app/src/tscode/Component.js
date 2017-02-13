import React from 'react'
import {
  GoogleMap,
  GoogleMapLoader,
  Marker
} from 'react-google-maps'

class Component extends React.Component {

  render() {
    console.info(this.props)
    const { markers = [] } = this.props

    return (
      <GoogleMapLoader containerElement={
        <div className="ui container">
        </div>
      } query={{libraries: "geometry,drawing,places,visualization"}} googleMapElement={
        <GoogleMap ref={(map) => console.log(map)}
                   defaultZoom={3}
                   defaultCenter={{ lat: -25.363882, lng: 131.044922 }}>

        </GoogleMap>
      }>
        {markers.map((marker, index) => (
          <Marker
            {...marker}
            onRightclick={() => console.info(index)}
          />
        ))}
      </GoogleMapLoader>
    )
  }
}

export default Component
