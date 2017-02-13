// ------------------------------------
// React Architecture
// ------------------------------------
import React from 'react'
// ------------------------------------
// Component
// ------------------------------------
import MOD from '../module'

import Container from '../../layout/core/Container'
import Root from './RootContainer'
// ------------------------------------
// Class Definition
// ------------------------------------
class Content extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {config: {}}
  }

  componentWillMount() {
    const {etat} = this.props
    if (etat.isConfig) {
      MOD.$$.Tool.Flow.init(this.props, {force: true}, this)
    }
  }

  componentDidMount() {
    MOD.$$.Plugin.JQuery.showMask()
  }

  componentWillUpdate(nextProps) {
    MOD.$$.Tool.Flow.startMod(this.props, nextProps)
  }

  componentDidUpdate() {
    const {etat, status} = this.props
    if (etat.isConfig && !status.isConfig) {
      MOD.$$.Tool.Flow.init(this.props, {force: true}, this)
    }
  }

  render() {
    MOD.$$.Logger.Prop.template("arena.Module", this.props)
    const {app, status} = this.props
    const $_fnConfig = () => (this.state.config)
    return (
      <Container {...this.props}>
        <Root app={app} status={status} $_fnConfig={$_fnConfig}/>
      </Container>
    )// (status.isConfig) ? Component : false
  }
}
// ------------------------------------
// Redux Form
// ------------------------------------
export default Content
