const axios = require('./http')


module.exports = {
  async getTmpList() {
    try {
      const { data } = await axios.get('/getTemplateList')
      return data
    } catch (error) {
      return [
        {
          name: 'vue2.0后台管理系统',
          url: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5',
          readme: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md'
        }, {
          name: 'vue3.0后台管理系统',
          url: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5',
          readme: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md'
        }, {
          name: 'vue4.0后台管理系统',
          url: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5',
          readme: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md'
        }, {
          name: 'vue5.0后台管理系统',
          url: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5',
          readme: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md'
        }
      ]
    }
    
  }
}