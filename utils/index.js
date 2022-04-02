const figlet =require('figlet')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk') 

module.exports = {
  // 使用 figlet 绘制 Logo
  printLogo () {
    console.log(
      chalk.green(
        '\r\n' +
        figlet.textSync('Y u n  J i  N i u  B i', {
          font: 'Standard',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 100,
          whitespaceBreak: true,
        })
      )
    )
  },
  // 打印模板列表 这里就写假数据 
  printTemplateLists () {
    console.log(chalk.green('后台管理系统'))
    console.log(chalk.green('小程序'))
    console.log(chalk.green('H5'))
    console.log(chalk.green('node'))
    console.log(chalk.green('nuxt'))
  },
  // 查找目标目录内的指定文件
  findFiles(filePath, fileName) { // 用于查找目标路径内的所有 .tpl 文件
    const tplList = []
    const findTplPath = (filePath) => {
      const target = eval(`/${fileName}/`)
      // const tplRegExp= /^.*\.(tpl)$/
      const files = fs.readdirSync(filePath)
      files.forEach((item) => {
        const fPath = path.join(filePath, item)
        const stat = fs.statSync(fPath)
        if (stat.isFile() && target.test(fPath)) {
          tplList.push(fPath)
        } else if (stat.isDirectory() === true && fPath.indexOf(`${this.slash}node_modules`) === -1 && fPath.indexOf(`${this.slash}.git`) === -1) {
          findTplPath(fPath)
        }
      })
    }
    findTplPath(filePath)
    return tplList
  }
}
