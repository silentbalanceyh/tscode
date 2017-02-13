class Seman{

  static dropdown(selector, value){
    jQuery(selector).dropdown({
      className:{
        dropdown:'jsxSelect',
        selection:'jsxItem'
      }
    })
    jQuery(selector).dropdown('set selected', value)
  }
}

export default Seman
