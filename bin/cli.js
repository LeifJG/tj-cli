#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk') //颜色
const utils = require('../utils')
// 定义命令和参数
program
  .command('create <projectName>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    require('../lib/create.js')(name,options)
  })

// 定义查看模板列表
program
.command('list')
.description('查看模板列表')
.action((name, options) => {
  utils.printTemplateLists()
})
// 配置版本号信息
program
 .version(`v${require('../package.json').version}`,'-v, -V,--version')
 .usage('<command> [option]')  

   // 监听 --help 执行
 program
  .on('--help', () => {
    //  打印logo
    // utils.printLogo()
    // 说明信息
    console.log(`\r\nRun ${chalk.cyan(`st-cli <command> --help`)} for detailed usage of given command\r\n`)
  })
//  解析用户执行命令传入参数
program.parse(program.argv)