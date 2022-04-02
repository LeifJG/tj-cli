const ejs = require('ejs')
const os = require('os')
const path = require('path')
const fs = require('fs')
const utils = require('../utils')

class Template {
  constructor() {
    this.slash = os.type() === 'Windows_NT' ? '\\' : '/' // windows 与众不同，懂得都懂
  }
  getOptions(templatePath) { // 获取自定义配置问题，需要传入模板的路径
    const [optionsJson] = utils.findFiles(templatePath, 'options.json')
    if (optionsJson) {
      const options = JSON.parse(fs.readFileSync(optionsJson))
      return options
    }
    return null
  }
  findTpl(filePath) { // 用于查找目标路径内的所有 .tpl 文件
    return utils.findFiles(filePath, '^.*\.(tpl)$')
  }
}

const template = new Template()
const tplList = template.findTpl(path.resolve(__dirname, '../'))
const options = template.getOptions(path.resolve(__dirname, '../'))
console.log(tplList, options)

module.exports = new Template()