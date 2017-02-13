import { connect } from 'react-redux'
// ------------------------------------
// Shared Component
// ------------------------------------
import Layout from '../ui/Content'
import MOD from '../module'
// ------------------------------------
// Mapping Definition
// ------------------------------------
export default connect(
  MOD.$$.Redux.Vector.appS2P(),
  MOD.$$.Redux.Vector.stdD2P(MOD.Act)
)(Layout)
