const ora = require('ora')
const ejs = require('ejs')
const path = require('path')
const DownloadGitReop = require('download-git-repo')
const inquirer = require('inquirer')
const util = require('../utils/index')
const api = require('../lib/api')
const templateUtil = require('./template')
// git CJ4pkydHLn7rvNxq9AJg

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...')
  } 
}

class Generator {
  constructor ({ projectName }, targetDir){
    // 项目名称
    this.projectName = projectName;
    // 创建位置
    this.targetDir = targetDir;
    // 模板列表
    this.templateList = []
    // 用户选项结果
    this.userOptions = {}
    
  }
  async getAllTplList() {
    if (!this.templateList || this.templateList.length === 0) {
      const tplList = await api.getTplList()
      this.templateList = tplList
    } 
    return this.templateList
  }
  // 获取用户选择的模板
  async getUserTpl() {
    // 我们需要的模板名称
    const allTplList = await this.getAllTplList()
    const choices = allTplList.map(item => item.name)
    const { tplName } = await inquirer.prompt({
      name: 'tplName',
      type: 'list',
      choices,
      message: '请选择使用的模板'
    })
    return allTplList.find(item => tplName === item.name);
  }

  // 获取用户选择的版本
  async getTag(repo) {
    // const tagsList =['v1.0.0','v1.0.1','v1.0.2'
    //用户选择自己需要下载的 tag
    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'input',
      message: '请输入版本号，直接回车则使用最新版本'
    })
    return tag || 'latest'
  }
  // 下载模板
  downloadGitReop(tpl, path, callback) {
    const { url, name } = tpl
    const loading = ora(`downloading ${name}：${url}`).start()
    DownloadGitReop(`direct:${url}`, path, { clone: true }, (err) => {
      if (err) {
        loading.fail()
        console.log('模板下载失败', err)
      } else {
        loading.succeed()
        console.log('模板下载成功')
        callback && callback(path)
      }
    })
  }
  async initTpl(tplPath, tplOptions) {
    // loading
    const loading = ora('Initializing').start()
    // 把下载下载的模板tplPath复制到targetDir目标目录
    util.copyDir(tplPath, this.targetDir)
    // 用tplOptions 初始化模板
    try {
      await templateUtil.processOptions(this.targetDir, tplOptions)
    } catch (error) {
      loading.fail(`initialization failed：${error}`)
      return
    }
    // 结束loading
    loading.succeed('initialization succeed')
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  async create(){
    // 1）获取模板名称
    const userTpl = await this.getUserTpl()
    if (!userTpl) throw new Error('未找到对应模板')
    // 2) 获取 tag 名称
    // const userTag = await this.getTag()
    // console.log(`使用模板：${userTpl.name} 仓库地址：${userTpl.url} 版本：${userTag}`)
    // 下载模板
    const tplPath = path.join(__dirname, `../.template/${userTpl.name}`)
    await util.deleteDir(tplPath) // 先删除旧的
    this.downloadGitReop(userTpl, tplPath, async (path) => {
      const optionsList = templateUtil.getOptions(path)
      const options = await inquirer.prompt(optionsList)
      const userOptions = Object.assign({} , options, {
        projectName: this.projectName
      })
      this.userOptions = userOptions
      setTimeout(() => {
        this.initTpl(tplPath, userOptions)
      }, 1000)
    })
    // console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    // console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    // console.log('  npm run dev\r\n')
      
  }
}

module.exports = Generator;
