import Immutable from 'immutable'
import Assert from '../assert'
/**
 * 数据准备阶段
 */
class UI{
  /** 抽取对应的Config **/
  static Config = {
    /** Control的处理 **/
    control:(props) => {
      const {config, id} = props;
      Assert.isString({id});
      const target = config[id];
      return Object.assign({id}, target.data);
    },
    /** Container的处理 **/
    container:(props) => {
      const $props = Immutable.fromJS(props);
      const { config } = props;
      Assert.isObject({config});
      Assert.isDefinedKey({props},['id']);
      let $config = Immutable.fromJS(config[props.id]);
      return $props.set('config',Object.assign({id:props.id},$config.get('data').toJS())).toJS();
    }
  }
}

export default UI
