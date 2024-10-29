import pkg, { copy } from 'fs-extra'
import inquirer from 'inquirer'
import ora from 'ora'
import logSymbols from 'log-symbols'
import { resolve } from 'path'
import { CWD, TEMPLATE } from '@lib/config'
import { get, Template } from '@util/store'
import { getTemplateConfig, TemplateConfig, validateTemplate } from '@lib/config/template'

const { pathExistsSync } = pkg
const { prompt } = inquirer
const templateList: Template[] = get('templateList')
const templateNum = templateList.length
const templateNames = templateList.map((tem) => {
  return tem.name
})

export async function createProject(project: { name: string }) {
  if (!templateNum) {
    console.error(
      logSymbols.error,
      '模板库中似乎还没有模板，快通过save命令保存一个吧'
    )
    return
  }

  // Get project name
  const { name } = project.name
    ? project
    : await prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Your Project Name: ',
          default: 'new-app'
        }
      ])

  // Select template
  const { template: selectedTemplate } = await prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select your project template: ',
      choices: templateNames
    }
  ])

  const templatePath = resolve(TEMPLATE, selectedTemplate)
  
  // Validate template
  const validation = validateTemplate(templatePath)
  if (!validation.valid) {
    console.error(logSymbols.error, '模板验证失败:')
    validation.errors.forEach(error => console.error(`- ${error}`))
    return
  }

  const templateConfig = getTemplateConfig(templatePath)

  // Handle template configuration if exists
  let answers = {}
  if (templateConfig?.prompts) {
    answers = await prompt(templateConfig.prompts)
  }

  const dir = resolve(CWD, name)
  if (pathExistsSync(dir)) {
    console.error(logSymbols.error, `${name} already exists`)
    return
  }

  const spinner = ora('正在创建项目...\n').start()
  try {
    // Copy template
    await copy(templatePath, dir)

    // Install dependencies if specified in config
    if (templateConfig?.dependencies || templateConfig?.devDependencies) {
      spinner.text = '正在安装依赖...'
      // TODO: Install dependencies using npm/yarn
    }

    spinner.succeed('项目创建成功!')
    
    // Show next steps
    console.log('\n🎉 项目创建完成! 接下来你可以:\n')
    console.log(`  cd ${name}`)
    console.log('  npm install')
    console.log('  npm run dev\n')
  } catch (error) {
    spinner.fail('创建失败')
    console.error(logSymbols.error, error)
  }
}