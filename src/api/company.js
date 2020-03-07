import request from '@/utils/myRequest'

export function fetchList(params) {
  return request({
    url:'/smsCompany/list',
    method:'get',
    params:params
  })
}
export function createCompany(data) {
  return request({
    url:'/smsCompany/add',
    method:'post',
    data:data
  })
}
export function updateCompany(data) {
  return request({
    url:'/smsCompany/update',
    method:'post',
    data:data
  })
}
