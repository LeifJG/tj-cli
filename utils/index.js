const figlet =require('figlet')
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
  // 查找目标目录内的指定文件
  findFiles(filePath, fileName) { // 用于查找目标路径内的所有目标文件 支持传入正则
    const fs = require('fs')
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
  },
  // 删除文件
  async deleteDir(directoryPath) {
    if (!require('fs').existsSync(directoryPath)) {
      return
    }
    const fs = require('fs').promises
    async function rmdirAsync (directoryPath) {
      try {
        let stat = await fs.stat(directoryPath)
        if (stat.isFile()) {
          await fs.unlink(directoryPath)
        } else {
          let dirs = await fs.readdir(directoryPath)
          // 递归删除文件夹内容(文件/文件夹)
          dirs = dirs.map(dir => rmdirAsync(path.join(directoryPath, dir)))
          await Promise.all(dirs)
          await fs.rmdir(directoryPath)
        }
      } catch (e) {
        console.error(e)
      }
    }
    await rmdirAsync(directoryPath)
  },
  copyDir(srcDir, desDir) {
    const fs = require('fs')
    fs.readdir(srcDir, { withFileTypes: true }, (err, files) => {
      for (const file of files) {
        //判断是否为文件夹
        if (file.isDirectory()) {
          const dirS = path.resolve(srcDir, file.name)
          const dirD = path.resolve(desDir, file.name)
          //判断是否存在dirD文件夹
          if (!fs.existsSync(dirD)) {
            fs.mkdir(dirD, (err) => {
              if (err) console.log(err)
            })
          }
          this.copyDir(dirS, dirD)
        } else {
          const srcFile = path.resolve(srcDir, file.name)
          const desFile = path.resolve(desDir, file.name)
          fs.copyFileSync(srcFile, desFile)
          console.log(file.name + ' 拷贝成功')
        }
      }
    })
  }
}
