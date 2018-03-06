/**
 * Created by Huyongbin on 2017/12/18.
 */
//  jsonp 请求URL   https://c.y.qq.com/splcloud/fcgi-bin/p.fcg?g_tk=5381&format=jsonp&jsonpCallback=jsonp1

import promiseJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    promiseJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (var key in data) {
    let value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
