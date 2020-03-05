import request from '@/utils/myRequest'

export function fetchList(params) {
  return request({
    url:'/smsShuangxuanhui/list',
    method:'get',
    params:params
  })
}
