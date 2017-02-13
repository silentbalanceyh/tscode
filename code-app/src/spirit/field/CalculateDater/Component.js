// ======================================================
// FieldRender
// ======================================================
import PureField from '../_assembly/PureField'
import mapping from '../../_internal/Redux'
import dispatches from './Redux'

class Component extends PureField {
  constructor(props) {
    super(props, 'date')
  }

  componentDidUpdate(prevProps){
    dispatches.$_fnUpdate(this.props,prevProps)
  }

  componentDidMount() {
    const {cid} = this.props.config
    if (cid) {
      jQuery(`#icon-${cid}`).on('click',() => {
        jQuery(`#selector-${cid}`).click()
      })
    }
  }

  shouldComponentUpdate(){
    return true
  }
}


export default mapping.single(Component, [
  "form"
], dispatches, 'inputes')
