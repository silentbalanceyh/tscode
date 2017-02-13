
const $_fnCalcItems = (items = []) => {
  const rooms = [];
  let row = [];
  let counter = 0;
  items.forEach(item => {
    row.push(item)
    counter++
    if (0 == counter % 3) {
      rooms.push(row)
      row = []
    }
  })
  if(0 < row.length){
    rooms.push(row)
  }
  return rooms
}

export default {
  $_fnCalcItems
}
