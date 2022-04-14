const ora = require('ora')
const api = require('../lib/api')
const DownloadGitReop = require('download-git-repo')
const inquirer = require('inquirer')
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
  constructor ({ template, projectName }, targetDir){
    // 项目名称
    this.projectName = projectName;
    // 模板名称
    this.template = template;
    // 创建位置
    this.targetDir = targetDir;
    // 模板列表
    this.templateList = []
  }

  // 获取用户选择的模板
  async getRepo() {
    // 我们需要的模板名称
    const list = await api.getTmpList()
    const repos = list.map(item => item.name)
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: '请选择使用的模板'
    })
    return repo;
  }

  // // 获取用户选择的版本
  // async getTag(repo) {
  //   const tagsList =['v1.0.0','v1.0.1','v1.0.2']

  //   //用户选择自己需要下载的 tag
  //   const { tag } = await inquirer.prompt({
  //     name: 'tag',
  //     type: 'input',
  //     message: '请输入版本号，直接回车则使用最新版本'
  //   })
  //   return tag
  // }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  async create({ template, projectName }){

    // 1）获取模板名称
    this.templateList = await this.getRepo()
     // 2) 获取 tag 名称
    // this.tag = await this.getTag(repo)
    
    console.log('用户选择了，repo=' + repo + ', tag='+tag)

    // TODO  这里就是对模板的处理

    // TODO  创建模板后 提示用户
    // console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    // console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    // console.log('  npm run dev\r\n')
      
  }
}

module.exports = Generator;
