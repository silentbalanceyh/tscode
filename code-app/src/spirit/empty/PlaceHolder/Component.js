import React from 'react'

import $$ from '../../../seed'
class Component extends React.PureComponent{
  render(){
    $$.Plugin.JQuery.hiddenMask()
    return (
      <div>Place Holder</div>
    )
  }
}

export default Component
