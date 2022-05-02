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
    const [optionsJson] = utils.findFiles(templatePath, 'package.json')
    if (optionsJson) {
      const options = JSON.parse(fs.readFileSync(optionsJson))
      return options.tjOptions
    }
    console.log(templatePath, '未找到package.json')
    return null
  }
  findTpl(filePath) { // 用于查找目标路径内的所有 .tpl 文件
    return utils.findFiles(filePath, '^.*\.(tpl)$')
  }
  async processOptions(tplDir, options) {
    console.log(`初始化 ${tplDir}, options：`, options)
    // 查找所有模板文件
    const tplFiles = this.findTpl(tplDir)
    tplFiles.unshift(path.resolve(tplDir, 'package.json'))
    console.log('需要ejs处理的文件：', tplFiles)
    tplFiles.forEach(((file) => {
      const dirName = path.dirname(file) // 文件路径
      const tplFileName = path.basename(file) // 模板文件名
      const fileName = path.basename(file, '.tpl') // 模板格式化后文件名
      ejs.renderFile(file, options, { async: false }, (err, str) => {
        // str => 输出渲染后的 HTML 字符串
        if (err) return console.log(`${file} 模板处理失败：${err}`)
        fs.writeFileSync(path.resolve(dirName, fileName), str)
        if (fileName === 'package.json') return
        fs.rm(file, { force: true }, (err) => {
          if (err) return console.log(`删除模板文件 ${file} 失败：${err}`)
        })
        console.log(`模板文件处理成功：${file}`)
      })
    }))
    return true
  }
}

// const template = new Template()
// const tplList = template.findTpl(path.resolve(__dirname, '../'))
// const options = template.getOptions(path.resolve(__dirname, '../'))
// console.log(tplList, options)

module.exports = new Template()