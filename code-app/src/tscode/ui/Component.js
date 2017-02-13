import React from 'react'
import {
  GoogleMap,
  withGoogleMap,
  Marker,
  Circle
} from 'react-google-maps'
import css from './Component.scss'
import Config from '../config.json'
import Form from './Form'
const DefinedMap = withGoogleMap(props => {
  let {markers = [], selected = {}} = props
  if (0 == Object.keys(selected).length) selected = props.onSelected()
  const distance = (selected.distance) ? selected.distance : 1
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={props.onSelected()}
      onClick={props.onMapClick}
    >
      {markers.map((marker, index) => (
        <Marker {...marker} onClick={props.onMarker(marker)}/>
      ))}
      <Circle onClick={props.onMapClick} fillOpacity={0.20} center={selected} radius={distance * 1000}/>
    </GoogleMap>
  )
});
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
    const {markers = [], data = [], selected = {}} = this.props
    const {$_fnStatus, $_fnType} = this.props
    // Status
    const reports = $_fnStatus(data)
    const rptKeys = Object.keys(reports)
    // Types
    const types = $_fnType(data)
    const tpKeys = Object.keys(types)
    const {$_fnMapClick, $_fnMarker, $_fnSelected} = this.props
    return (
      <main className="ui segment two column grid">
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
            <div className="ui header">Types</div>
            <div className="ui list">
              {
                tpKeys.map((key) => {
                  const count = types[key].length
                  return (
                    <div className="item" key={`type${key}`}>{key} - {count}</div>
                  )
                })
              }
            </div>
            <div className="ui header">Radius ( km )</div>
            <Form distance={selected.distance}/>
            <div className="ui header">Features</div>
            <div className="ui list">
              <div className="item">
                1.When you click any location, the system will search Trucks near this location less than x ( Default = {Config['distance']} ) kilometers.
              </div>
              <div className="item">
                2.Click the Marker on the map to view truck details.
              </div>
            </div>
          </div>
          <div className={`column ${css['right']} jsxMap`}>
            <DefinedMap
              selected={selected}
              markers={markers}
              onSelected={$_fnSelected}
              onMapClick={$_fnMapClick(this.props)}
              onMarker={$_fnMarker(this.props)}
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
