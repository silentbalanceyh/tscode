import $$ from '../../seed'

const Load = (component) => {
  const promise = $$.Ajax.Api.get("/links")
  return promise.then(data => {
    console.info(data)
    component.setState({data})
  })
}

const Click = (id,component) => () => {
  const promise = $$.Ajax.Api.post("/links",{
    id
  })
  promise.then(() => {
    Load(component)
  })
}

export default {
  Load,
  Click
}
