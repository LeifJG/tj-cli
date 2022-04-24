const axios = require('./http')


module.exports = {
  async getTplList() {
    try {
      const { data } = await axios.get('/getTemplateList')
      return data
    } catch (error) {
      return [
        {
          name: 'admin-vue2',
          url: 'https://github.com/LeifJG/vue-multiple.git',
          readme: 'https://github.com/LeifJG/vue-multiple/blob/master/README.md'
        }, {
          name: 'admin-vue3',
          url: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5',
          readme: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md'
        }, {
          name: 'h5-vue2',
          url: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5',
          readme: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md'
        }, {
          name: 'h5-vue3',
          url: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5',
          readme: 'https://gitlab.yunjiglobal.com/fe/yjthirdparty-h5/blob/master/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md'
        }
      ]
    }
    
  }
}