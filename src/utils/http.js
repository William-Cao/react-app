import axios from 'axios'
import { Component } from 'react'
import { message } from 'antd';
import utils from './common';

const Qs = require('qs')

// let base = '/api'
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 30000

axios.interceptors.request.use(request => {
  if (sessionStorage.getItem('Authorization')) {
    request.headers.Authorization = 'Bearer ' + sessionStorage.getItem('Authorization');
  }
  return request
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return checkStatus(response)
}, error => {
  return Promise.reject(error.response)
})

function checkStatus (response) {
  if (response.status === 200 || response.status === 304) {
    if (response.data.code !== 200 && response.data.code !== 401) {
      message.error(response.data.message)
      return Promise.reject(response.data)
    } else if (response.data.code === 401) {
      utils.loginOut()
      return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
  }
  return Promise.reject(response)
}

const http = {
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params
    })
  },
  post (url, params) {
    return axios({
      method: 'post',
      url,
      data: params
    })
  },
  delete (url, params) {
    return axios({
      method: 'delete',
      url,
      data: params
    })
  },
  put (url, params) {
    return axios({
      method: 'put',
      url,
      data: params
    })
  },
  download (url, param) {
    return `api${url}?` + Qs.stringify(param)
  }
}

Component.prototype.http = http