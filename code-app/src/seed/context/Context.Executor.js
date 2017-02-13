import $$ from '../Kit'

class Executor {

  static twinkle({
    script,
    api,
    method
  },input){
    try{
      // 0.为了保证pre/post内部可使用，必须使用该赋值
      const Tool = $$.Tool;
      const Promise = $$.Ajax.Promise;
      // 1.执行前置条件的脚本
      eval(script);
      // 2.执行Ajax脚本
      console.log(input);
    }catch(error){
      console.error(error);
    }
  }
}

export default Executor
