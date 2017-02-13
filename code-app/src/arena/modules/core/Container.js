import { connect } from 'react-redux'
// ------------------------------------
// Shared Component
// ------------------------------------
import Content from '../ui/Content'
import MOD from '../module'

export default connect(
  MOD.$$.Redux.Vector.modS2P(),
  MOD.$$.Redux.Vector.stdD2P(MOD.Act)
)(Content)
