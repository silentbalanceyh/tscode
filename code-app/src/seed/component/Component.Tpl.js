import Assert from '../assert'
import Tool from '../tool'
import Visitor from '../visitor'
import Vector from '../vector'

class Tpl {
  /** 1.直接构造Template，Slice单独配置 **/
  static buildTemplate(props) {
    /** Adaptor专用 **/
    const {app:{layout = {}, slice = []}} = props
    if (1 == slice.length && layout.template == slice[0].name) {
      return slice[0]
    }
  }

  /**
   * 构建组件信息
   * @param slice
   * @param template
   */
  static _buildComponent(slice) {
    if (slice && slice.name) {
      return Tool.UCA.uca(slice.name);
    }
  }

  /**
   * 构建Component
   * @param layout
   */
  static buildComponent(layout) {
    // layout -> Object
    Assert.isObject({layout});
    return {
      Header: Tpl._buildComponent(layout.header),
      Footer: Tpl._buildComponent(layout.footer),
      Nav: Tpl._buildComponent(layout.nav),
      Menu: Tpl._buildComponent(layout.menu),
      Initiate: Tpl._buildComponent(layout.initiate),
      Status: Tpl._buildComponent(layout.status),
    }
  }

  /**
   *
   * @param slice
   * @private
   */
  static _buildConfig(slice, props) {
    slice = (slice) ? Visitor.visit(slice) : slice;
    return slice
  }

  /**
   * 构建对应的配置
   * @param layout
   */
  static buildConfig(layout, props) {
    // layout -> Object
    Assert.isObject({layout});
    return {
      HeaderConfig: Vector.Slice.eblisLayout(props, 'header'),
      FooterConfig: Vector.Slice.eblisLayout(props, 'footer'),
      NavConfig: Vector.Slice.eblisLayout(props, 'nav'),
      MenuConfig: Vector.Slice.eblisLayout(props, 'menu'),
      InitiateConfig: Vector.Slice.eblisLayout(props, 'initiate'),
      StatusConfig: Vector.Slice.eblisLayout(props, 'status'),
    }
  }
}

export default Tpl
