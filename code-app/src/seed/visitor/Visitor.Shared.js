const $_fnMerge = (source, target, keys = []) => {
  keys.forEach(key => {
    if(target[key]) {
      source = source.set(key, target[key])
    }
  })
  return source.toJS()
}

export default {
  $_fnMerge
}
