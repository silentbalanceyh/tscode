import React from 'react'
import actions from './Redux'
import css from './Component.scss'

class Component extends React.Component {

  constructor(props){
    super(props)
    this.state = { data:[] }
  }
  componentWillMount() {
    actions.Load(this)
  }

  componentWillUpdate(nextProps) {

  }

  render() {
    const { data = [] } = this.state
    return (
      <main className="ui segment two column grid container">
        <div className="row">
          <div className={`column ${css['left']}`}>
            <div className="ui header">Links</div>
            <div className="ui list">
              {
                data.map((item) => {
                  return (
                    <div key={item.id} className="item">
                      <a href={item.url} className="item link" onClick={actions.Click(item.id,this)} target="_blank">{item.name}</a>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Component
