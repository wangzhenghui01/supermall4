import {request} from "./request";

export function getChargeTypeProportion(param) {
  return request({
    url:'rs/sql/getChargeTypeProportion',
    method:'post',
    data:{
      data:{
        this_year:param
      }
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
