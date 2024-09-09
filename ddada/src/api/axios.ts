'use client'

import axios from 'axios'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
