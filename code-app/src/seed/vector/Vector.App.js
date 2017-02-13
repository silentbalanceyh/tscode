import Immutable from 'immutable'

class App{
  /**
   *
   * @param configuration
   */
  static app(configuration){
    const $data = Immutable.fromJS(configuration.data.app)
    if($data) {
      return $data.toJS()
    }else{
      return {}
    }
  }
}

export default App
