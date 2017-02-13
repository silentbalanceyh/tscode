class Matrix{
  constructor(){
    this.matrix = []
  }

  /**
   *
   * @param $_field
   * @param position
   */
  put($_field, position = [0,0]){
    const x = position[0]
    const y = position[1]
    /** 1.x位置 **/
    if(!this.matrix[x]){
      this.matrix[x] = []
    }
    const item = this.matrix[x][y]
    if(!item){
      this.matrix[x][y] = $_field
    }
  }

  /**
   *
   * @returns {Array}
   */
  get(){
    return this.matrix
  }
}

export default Matrix
