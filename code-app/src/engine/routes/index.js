// We only need to import the modules necessary for initial render
/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => ({
  getChildRoutes(location, cb){
    require.ensure([], (require) => {
      const route = require('../../arena/routes').default(store)
      cb(null, [
        //require('../../post/app/console/routes').default(store),
        //require('../../post/app/redux/routes').default(store),
        //require('../../post/app/develop/routes').default(store),
        //require('../../post/app/hdp/routes').default(store),
        route,
        require('./main').default(store)
      ])
    })
  }
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes
