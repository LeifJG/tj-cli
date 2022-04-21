const ora = require('ora')
const path = require('path')
const DownloadGitReop = require('download-git-repo')
const inquirer = require('inquirer')
const util = require('../utils/index')
const api = require('../lib/api')
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
  constructor ({ templateName, projectName }, targetDir){
    // 项目名称
    this.projectName = projectName;
    // 模板名称
    this.templateName = templateName;
    // 创建位置
    this.targetDir = targetDir;
    // 模板列表
    this.templateList = []
  }
  async getAllTmpList() {
    if (!this.templateList || this.templateList.length === 0) {
      const tmpList = await api.getTmpList()
      this.templateList = tmpList
    } 
    return this.templateList
  }
  // 获取用户选择的模板
  async getUserTmp() {
    // 我们需要的模板名称
    const allTmpList = await this.getAllTmpList()
    const choices = allTmpList.map(item => item.name)
    const { tmpName } = await inquirer.prompt({
      name: 'tmpName',
      type: 'list',
      choices,
      message: '请选择使用的模板'
    })
    return allTmpList.find(item => tmpName === item.name);
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

  async processOptions(options) {
    console.log('初始化options.json', options)
  }
  // 下载模板
  downloadGitReop(tmp, path, callback) {
    const { url, name } = tmp
    DownloadGitReop(`direct:${url}`, path, { clone: true }, (err) => {
      if (err) {
        console.log('模板下载失败', JSON.stringify(err))
      } else {
        console.log('模板下载成功')
        callback && callback(path)
      }
    })
  }


  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  async create(){
    // 1）获取模板名称
    const userTmp = await this.getUserTmp()
    if (!userTmp) throw new Error('未找到对应模板')
    // 2) 获取 tag 名称
    const userTag = await this.getTag()
    console.log(`使用模板：${userTmp.name} 仓库地址：${userTmp.url} 版本：${userTag}`)
    // TODO  这里就是对模板的处理
    const tmpPath = path.join(__dirname, `../template/${userTmp.name}`)
    console.log(tmpPath)
    await util.deleteDir(tmpPath) // 先删除旧的
    this.downloadGitReop(userTmp, tmpPath, (path) => {
      const options = util.findFiles(path, `options.json`)
      console.log(options)
    })
    // TODO  创建模板后 提示用户
    // console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    // console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    // console.log('  npm run dev\r\n')
      
  }
}

module.exports = Generator;
