// ======================================================
// FieldRender
// ======================================================
import PureField from '../_assembly/PureField'

class Component extends PureField {
  constructor(props) {
    super(props, 'color')
  }

  componentDidMount() {
    /*
    const {cid} = this.props.config
    if (cid) {
      jQuery(`#icon-${cid}`).on('click',() => {
        jQuery(`#selector-${cid}`).click()
      })
    }
     */
  }
}

export default Component
