// 查看提供好的模板项目清单
import fse from 'fs-extra'
import { resolve } from 'path'
import ora  from 'ora'
import logSymbols  from 'log-symbols';
import { showTable } from '@util/showTable'
const spinner = ora('正在为你拼命加载...\n').start();

const dir = resolve('./lib/template')

fse.readdir(dir, (err,files) => {
  // 错误处理
  if(err){
    spinner.fail('似乎发生了什么错误');
    console.log(logSymbols.error,err)
  }else{
    spinner.succeed('加载成功，请查看结果');
    // console.log(files)
    showTable(files)
  }
})
