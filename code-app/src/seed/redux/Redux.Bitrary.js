import Random from 'random-js'

class Bitrary{

  static string(length){
    const engine = Random.engines.mt19937().autoSeed()
    return Random.string()(engine,length)
  }
}

export default Bitrary
