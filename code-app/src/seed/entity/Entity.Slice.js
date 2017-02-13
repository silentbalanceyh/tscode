import Immutable from 'immutable'
import Assert from '../assert'

const SLC_LYT = [
  "header",
  "footer",
  "nav",
  "menu",
  "initiate",
  "status"
]

class Slice {
  /**
   * 处理Slice
   * @param slice
   */
  static process(slice) {
    /** 1.读取slice信息 **/
    Assert.isArray({list: slice.list});
    const $slice = Immutable.fromJS(slice.list);
    /** 2.返回Slice **/
    const data = {}
    $slice.forEach((item) => {
      const name = item.get('name');
      data[name] = item.toJS();
    });
    return data;
  }

  /**
   * 将Slice中的信息Attach到Layout中
   * @param layout
   */
  static mountTo(layout, slice) {
    /** 1.处理Layout **/
    let $layout = Immutable.fromJS(layout);
    /** 2.操作模板中的值，用于Attach **/
    SLC_LYT.forEach((key) => {
      const slck = $layout.get(key);
      if (slice[slck]) {
        const $data = Immutable.fromJS(slice[slck]);
        $layout = $layout.set(key, $data.toJS());
        /** 3.删除模板上已经Mount过的Slice配置 **/
        delete slice[slck];
      } else {
        $layout = $layout.set(key, {});
      }
    });
    /** 3.返回最终值 **/
    return $layout.toJS();
  }

  /**
   *
   * @param slice
   * @param config
   * @param refArr
   */
  static refactor(slice, refArr) {
    for (const key in slice) {
      if (slice[key]) {
        refArr.push(slice[key]);
      }
    }
  }
}

export default Slice
