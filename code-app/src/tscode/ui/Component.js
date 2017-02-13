import React from 'react'
import {
  GoogleMap,
  withGoogleMap,
  Marker
} from 'react-google-maps'
import css from './Component.scss'

const DefinedMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{lat: 37.7, lng: -122.4}}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker {...marker}/>
    ))}
  </GoogleMap>
));
class Component extends React.Component {

  componentWillMount() {
    const {$_fnInit} = this.props
    $_fnInit(this.props)
  }

  componentDidUpdate(nextProps) {
    const {$_fnInit, $_fnIsUpdate} = this.props
    if ($_fnIsUpdate(this.props, nextProps)) {
      $_fnInit(this.props)
    }
  }

  render() {
    const {markers = [], data = []} = this.props
    const { $_fnStatus } = this.props
    const reports = $_fnStatus(data)
    const rptKeys = Object.keys(reports)
    const {$_fnMapClick} = this.props
    return (
      <main className="ui basic segment two column grid">
        <div className="row">
          <div className={`column ${css['left']}`}>
            <div className="ui header">Status</div>
            <div className="ui list">
              {
                rptKeys.map((key) => {
                  const count = reports[key].length
                  return (
                    <div className="item" key={`status${key}`}>{key} - {count}</div>
                  )
                })
              }
            </div>
            <div className="ui header">Foods</div>
            <div className="ui list">

            </div>
          </div>
          <div className={`column ${css['right']}`} style={{height: `600px`}}>
            <DefinedMap
              markers={markers}
              onMapClick={$_fnMapClick(this.props)}
              containerElement={
                <div style={{height: `100%`}}/>
              }
              mapElement={
                <div style={{height: `100%`}}/>
              }>
            </DefinedMap>
          </div>
        </div>
      </main>
    )
  }
}

export default Component
