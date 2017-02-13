import Cache from '../../cache'

const getKey = (key) => {
  if (key) {
    const user = Cache.Session.get(Cache.Key.SESSION);
    if (user) {
      const generated = `${Cache.Key.DATA}/${user.uniqueId}/${key}`
      return generated
    }
  }
}

const readData = (key) => {
  if (key) {
    key = getKey(key)
    if(key) {
      const data = Cache.Session.get(key)
      return data
    }
  }
}

const writeData = (key, data = {}) => {
  if (key) {
    key = getKey(key)
    if(key) {
      Cache.Session.put(key, data)
    }
  }
}

export default {
  readData,
  writeData
}
