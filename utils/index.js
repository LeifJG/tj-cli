const figlet =require('figlet')
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
  }
}
