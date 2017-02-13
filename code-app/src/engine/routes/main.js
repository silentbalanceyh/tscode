import Apps from '../page/apps';
/**
 * 根路由
 * @param store
 */
export default (store) => ({
  path:'/',
  component:Apps.layout,
  indexRoute:Apps.content
})
