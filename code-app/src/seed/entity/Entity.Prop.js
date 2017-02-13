import Immutable from 'immutable'

class Prop {
  /**
   * Filter过滤
   * @param data
   */
  static filter(data = {}) {
    const $data = Immutable.fromJS(data);
    const _data = $data.toJS();
    delete _data['topbar'];
    delete _data['menu'];
    delete _data['sidebar'];
    return _data;
  }
}

export default Prop
