const ora = require('ora')
const inquirer = require('inquirer')

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
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
  }

  // 获取用户选择的模板
  async getRepo() {
    // 我们需要的模板名称
    const repos = ['vue2.*','react','vue3.*','webpack']
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: '请选择使用的模板'
    })
    return repo;
  }

  // 获取用户选择的版本
  async getTag(repo) {
   
    const tagsList =['v1.0.0','v1.0.1','v1.0.2']

    //用户选择自己需要下载的 tag
    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagsList,
      message: '请选择版本号'
    })
    return tag
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  async create(){

    // 1）获取模板名称
    const repo = await this.getRepo()
     // 2) 获取 tag 名称
     const tag = await this.getTag(repo)
    
    console.log('用户选择了，repo=' + repo + ', tag='+tag)

    // TODO  这里就是对模板的处理

    // TODO  创建模板后 提示用户
    // console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    // console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    // console.log('  npm run dev\r\n')
      
  }
}

module.exports = Generator;
