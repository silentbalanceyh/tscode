const $_fnCalcStatus = (item, status, types = []) => {
  /** 1.构造item **/
  const $item = {};
  /** 2.赋值房间号 **/
  $item['number'] = item.number;
  /** 3.设置标记 **/
  let arriving = (item.arriving)?item.arriving:false;
  let leaving = (item.leaving)?item.leaving:false;
  /** 4.构造房间类型 **/
  const $type = types.filter((type) => type.uniqueId == item.roomTypeId)[0];
  $item['type'] = $type.name;
  /** 5.读取清洁状态 **/
  const $clean = status.filter((stat) => stat.uniqueId == item.cleanStatus && stat.type == 'room.clean.status')[0];
  $item['clean'] = $clean.config;
  /** 6.处理可操作状态 **/
  let $op = status.filter((op) => op.uniqueId == item.opStatus && op.type == 'room.status')[0];
  /** 可操作的情况 **/
  $item['color'] = '#D3D3D3'  // 默认颜色
  if($op.code == "Operation"){
    /** 进一步读取 **/
    if(arriving && leaving){
      /** 两个同为true，占用房间 **/
      $op = status.filter((op) => op.code == 'Taken')[0];
      $item['color'] = '#87CEFA';  // 蓝色
    }else if(arriving && !leaving){
      /** 预抵房间 **/
      $op = status.filter((op) => op.code == 'Arriving')[0];
      $item['color'] = '#87CEFA';  // 蓝色
    }else if(!arriving && leaving){
      /** 预离房间 **/
      $op = status.filter((op) => op.code == 'Leaving')[0];
    }else{
      /** 空房间 **/
      $op = status.filter((op) => op.code == 'Empty')[0];
      /** 是否已经打扫 **/
      if($clean.code == 'Checked') {
        $item['color'] = '#98FB98'; // 绿色
      }
    }
  }else {
    if ($op.code == 'Left') {
      $item['color'] = '#AFEEEE'; // 预留
    } else {
      $item['color'] = '#FFB6C1'; // 红色
    }
  }
  $item['op'] = $op.config;
  if(!$item.op){
    $item.op = { icon: ''}
  }
  if(!$item.clean){
    $item.clean = { icon: ''}
  }
  return $item;
}
export default {
  $_fnCalcStatus
}
