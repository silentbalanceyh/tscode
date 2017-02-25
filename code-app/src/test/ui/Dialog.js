import React from 'react'

import css from './Dialog.scss'

class Dialog extends React.Component{

  render(){
    const { fooditems = '' } = this.props
    const foods = fooditems.split(':')
    return (
      <div>
        <div className={`ui attached segment ${css['item']} ${css['pagelist']}`}>
          <div className="ui header">
            <i className="shipping icon"/>Truck Details:
          </div>
          <div className="ui list">
            <div className="item">Applicant: {this.props.applicant}</div>
            <div className="item">Status: {this.props.status}</div>
            <div className="item">Facility Type: {this.props.facilitytype}</div>
            <div className="item">Address: {this.props.address}</div>
            <div className="item">Permit: {this.props.permit}</div>
            <div className="item">Schedule:
              <a href={this.props.schedule} className="link item" target="_blank">Download</a>
            </div>
            <div className="item">
              <div className="header">
                <i className="food icon"/>Foods:
              </div>
              <div className="ui list">
              {
                foods.map((item,index) => {
                  return (
                    <div className="item" key={index}>{item}</div>
                  )
                })
              }
              </div>
            </div>
            <div className="item">
              <i className="blue marker icon"/>Location Details: {this.props.locationdescription}
            </div>
          </div>
        </div>
        <div className={`ui bottom attached menu ${css['bottom']} ${css['item']}`}>
          <div className={`actions ${css['actions']}`}>
            <div id='btnNo' className="ui cancel red button">
              <i className="cancel icon"></i>
              Close
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dialog
