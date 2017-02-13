// ======================================================
// LabelRender
// ======================================================
import PureLabel from '../_assembly/PureLabel'
import mapping from '../../_internal/Redux'
import dispatches from './Redux'

class Component extends PureLabel {
  constructor(props) {
    super(props, 'linker')
  }

  shouldComponentUpdate(){
    return true
  }
  componentDidUpdate(prevProps){
    dispatches.$_fnUpdate(this.props,prevProps)
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {

}
export default mapping.single(Component, [
  "form"
], dispatches, 'inputes')
