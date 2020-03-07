import request from '@/utils/myRequest'

export function fetchList(params) {
  return request({
    url:'/smsPosition/list',
    method:'get',
    params:params
  })
}
export function createPosition(data) {
  return request({
    url:'/smsPosition/add',
    method:'post',
    data:data
  })
}
export function updatePosition(data) {
  return request({
    url:'/smsPosition/update',
    method:'post',
    data:data
  })
}
