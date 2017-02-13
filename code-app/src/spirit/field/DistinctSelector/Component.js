// ======================================================
// FieldRender
// ======================================================
import PureField from '../_assembly/PureField'

class Component extends PureField {
  constructor(props) {
    super(props, 'distinct.selector')
  }

  componentDidMount(){
    const { config = {}} = this.props
    if(config.cid){
      jQuery(`#btn${config.cid}`).popup({
        inline:true,
        position:'top left',
        popup:`#popup${config.cid}`,
        on:'click',
        delay:{
          show:300,
          hide:500
        }
      })
    }
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {

}
export default Component
