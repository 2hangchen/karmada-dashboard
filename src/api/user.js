import request from '@/utils/request'

export function jLogin(data) {
  return request({
    url: '/apis/v1/jcc-user/admin/login',
    method: 'POST',
    data
  })
}
export function jRegister(data) {
  return request({
    url: '/apis/v1/jcc-user/admin/register',
    method: 'post',
    data
  })
}
export function jUserInfo(params) {
  return request({
    url: '/apis/v1/jcc-user/admin/info',
    method: 'get',
    params
  })
}
