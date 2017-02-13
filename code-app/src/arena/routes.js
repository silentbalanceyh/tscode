export default (store) => ({
  // TODO：Module：修改路由地址，路由中不包含Context
  path: `:app/:module/:page`,
  getComponent(nextState, cb){
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      /**
       let Container;
       let key;
       if(nextState.params) {
        key = $_fnKey(nextState.params)
      }
       if(process.env.NODE_ENV === `development`){
        console.warn(key, nextState.params, Object.keys(COMPONENTS).length)
      }
       if(key){
        if(COMPONENTS[key]){
          Container = COMPONENTS[key]
        }else{
          Container = require(`./core/Container`).default
          COMPONENTS[key] = Container
        }
      }else {
        Container = require(`./core/Container`).default
      }**/
      const Container = require(`./modules/core/Container`).default
      /*  Reducer处理的信息 */
      // const reducer = require(`./core/Reducer`).default
      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'content', reducer })
      /*  Return getComponent   */
      cb(null, Container)

      /* Webpack named bundle   */
      // TODO：Module：修改最终打包的JS脚本地址，脚本命名如：
      // TODO：<app>.mod.<module>
    }, "dynamic.module")
  }
})
