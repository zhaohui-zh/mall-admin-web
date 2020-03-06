import request from '@/utils/myRequest'

export function fetchList(params) {
  return request({
    url:'/smsShuangxuanhui/list',
    method:'get',
    params:params
  })
}
export function createSxh(data) {
  return request({
    url:'/smsShuangxuanhui/add',
    method:'post',
    data:data
  })
}
