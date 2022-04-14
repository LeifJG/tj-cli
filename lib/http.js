const Axios = require('axios')
const baseURL = 'http://127.0.0.1:7001/skyadmin'
// const baseURL = 'https://t-do-dev.yunjiglobal.com/skyadmin'

const http = Axios.create({
  timeout: 7000,
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

module.exports = http
