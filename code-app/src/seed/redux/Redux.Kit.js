import Bitrary from './Redux.Bitrary'
import Immutable from 'immutable'
// DEBUG or Hooker
import diff from 'immutablediff'

const diffEtat = (oldEtat, newEtat) => {
  const $old = Immutable.fromJS(oldEtat)
  const $new = Immutable.fromJS(newEtat)
  const $diff = diff($old,$new)
  const patches = $diff.toJS()
  return 0 < patches.length
}

const resetHash = ($state, cid, old) => {
  let refresh = true
  if(old){
    refresh = diffEtat(old,$state.toJS())
  }
  if (cid && refresh) {
    const pathes = ['controls', cid, 'hash']
    $state = $state.setIn(pathes, Bitrary.string(16))
  }
  return $state
}

export default {
  resetHash,
  diffEtat
}
