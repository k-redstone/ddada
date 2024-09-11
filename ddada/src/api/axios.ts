'use client'

import axios from 'axios'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const publicAPI = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
export const privateAPI = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

privateAPI.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accessToken')

  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

privateAPI.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // const statusCode = error.response?.status
    // if (error.config.url === '/api/reissue' && statusCode === 400) {
    //   return Promise.reject(error)
    // }
    // if (statusCode === 401) {
    //   const res = await privateAPI.post('/api/reissue')
    //   sessionStorage.setItem('access', res.headers.access)
    //   error.config.headers.access = res.headers.access
    //   const reResponse = await axios(error.config)
    //   return reResponse
    // }
    // if (statusCode === 404) {
    //   console.log(404)
    // }
    return Promise.reject(error)
  },
)
