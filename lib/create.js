const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./generator')
/**
 * 执行创建命令
 * @param {string} name 项目名
 * @param {Object} options 是否覆盖
  * */ 
module.exports= async ({ template, projectName }, options)=>{
  // 当前命令行选择的目录
  const cwd = process.cwd()
  // 需要创建的目录地址
  const targetAir = path.join(cwd, projectName)
  //判断目录是否已经存在？
  if(fs.existsSync(targetAir)){
    // 是否为强制创建？
    if(options.force){
      await fs.remove(targetAir)
    }else{
      // 询问用户是否确定要覆盖
      let {action}  = await inquirer.prompt([
        {
          name:'action',
          type:'list',
          message:'Target directory already exists Pick an action:',
          choices:[
            {
              name:'cover',
              value:'cover',
            },{
              name:'Cancel',
              value:false
            }
          ]
        }
      ])
      if(!action){
        return
      }else if (action ==='cover'){
        await fs.remove(targetAir)
      }
    }
  }
  //开始创建项目
  const generator = new Generator({ template, projectName }, targetAir)
  generator.create()
}