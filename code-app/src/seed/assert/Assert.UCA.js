import Basic from './Assert.Basic'
import $Object from './Assert.Object'

const isValidUCA = (props, keys = []) => {
  /** 默认必须mapping主键，有mapping才可处理shouldComponentUpdate方法 **/
    // TODO: 暂时不考虑将mapping必填
    // keys = keys.concat(['mapping']);
  const {config} = props;
  if (Basic.development()) {
    $Object.isObject({config});
    let input = Basic.filter({config});
    keys.forEach(key => {
      const value = input.value[key];
      const message = `[RTV] UCA Configuration missing, keys = ${JSON.stringify(keys)} must be required. ${key} = ${value}`;
      console.assert(value, [message]);
    })
  }
}

export default {
  isValidUCA
}
