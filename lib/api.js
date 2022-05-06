const axios = require('./http')


module.exports = {
  async getTplList() {
    try {
      const { data } = await axios.get(`http://static.yunjiglobal.com/qnUpload/frontend/config/tj_tpl_list?t=${new Date().getTime()}`, {}, { timeout: 10 * 1000 })
      if (data && data.length) {
        return data
      }
      throw new Error('获取模板列表失败')
    } catch (error) {
      console.log('获取模板列表失败：', error)
      return [
        {
          "name": "admin-vue2",
          "url": "https://github.com/LeifJG/vue-multiple.git",
          "readme": "https://github.com/LeifJG/vue-multiple/blob/master/README.md"
        }, {
          "name": "admin-vue3",
          "url": "https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5",
          "readme": "https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md"
        }, {
          "name": "h5-vue2",
          "url": "https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5",
          "readme": "https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md"
        }, {
          "name": "h5-vue3",
          "url": "https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5",
          "readme": "https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md"
        }, {
          "name": "test-data",
          "url": "https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5",
          "readme": "https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md"
        }
      ]
    }
    
  }
}