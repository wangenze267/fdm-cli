import { get, set } from '@util/store'
import { Template } from '@util/store/store'
import { validateTemplate } from './template'
import download from 'download-git-repo'
import { resolve } from 'path'
import { TEMPLATE } from './index'
import { promisify } from 'util'
import ora from 'ora'

const downloadRepo = promisify(download)

interface RemoteTemplate extends Template {
  repository: string
}

export async function downloadTemplate(repository: string, name: string): Promise<boolean> {
  const spinner = ora('Downloading template...').start()
  const targetPath = resolve(TEMPLATE, name)

  try {
    await downloadRepo(repository, targetPath, { clone: true })
    
    // Validate downloaded template
    const validation = validateTemplate(targetPath)
    if (!validation.valid) {
      spinner.fail('Invalid template structure')
      console.error('Validation errors:', validation.errors)
      return false
    }

    spinner.succeed('Template downloaded successfully')
    return true
  } catch (error) {
    spinner.fail('Failed to download template')
    console.error('Download error:', error)
    return false
  }
}

export function addRemoteTemplate(template: RemoteTemplate): void {
  const templateList: Template[] = get('templateList')
  templateList.push(template)
  set('templateList', templateList)
}

export async function syncRemoteTemplates(): Promise<void> {
  const spinner = ora('Syncing remote templates...').start()
  
  try {
    // Here we could fetch from a central registry
    const officialTemplates: RemoteTemplate[] = [
      {
        name: 'vue3-enterprise',
        description: 'Vue 3 Enterprise Template',
        repository: 'github:user/vue3-enterprise-template'
      },
      {
        name: 'react-typescript',
        description: 'React TypeScript Template',
        repository: 'github:user/react-typescript-template'
      }
    ]

    for (const template of officialTemplates) {
      await downloadTemplate(template.repository, template.name)
      addRemoteTemplate(template)
    }

    spinner.succeed('Remote templates synced successfully')
  } catch (error) {
    spinner.fail('Failed to sync remote templates')
    console.error('Sync error:', error)
  }
}