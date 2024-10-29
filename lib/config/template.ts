import { resolve } from 'path'
import { pathExistsSync, readJsonSync, readdirSync } from 'fs-extra'

export interface TemplateConfig {
  name: string
  description: string
  prompts?: {
    name: string
    type: string 
    message: string
    choices?: string[]
    default?: any
  }[]
  dependencies?: {
    [key: string]: string
  }
  devDependencies?: {
    [key: string]: string
  }
  category?: string
  tags?: string[]
  repository?: string
}

export function getTemplateConfig(templatePath: string): TemplateConfig | null {
  const configPath = resolve(templatePath, 'fdm.config.js')
  
  if (!pathExistsSync(configPath)) {
    return null
  }

  try {
    const config = require(configPath)
    return config
  } catch (err) {
    return null
  }
}

export function validateTemplate(templatePath: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Check if template directory exists
  if (!pathExistsSync(templatePath)) {
    errors.push('Template directory does not exist')
    return { valid: false, errors }
  }

  // Check template structure
  const requiredFiles = ['package.json', 'README.md']
  for (const file of requiredFiles) {
    if (!pathExistsSync(resolve(templatePath, file))) {
      errors.push(`Missing required file: ${file}`)
    }
  }

  // Validate template config if exists
  const config = getTemplateConfig(templatePath)
  if (config) {
    if (!config.name) errors.push('Template config missing name')
    if (!config.description) errors.push('Template config missing description')
    
    // Validate prompts if defined
    if (config.prompts) {
      config.prompts.forEach((prompt, index) => {
        if (!prompt.name) errors.push(`Prompt ${index + 1} missing name`)
        if (!prompt.type) errors.push(`Prompt ${index + 1} missing type`)
        if (!prompt.message) errors.push(`Prompt ${index + 1} missing message`)
      })
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

export function validateConfig(config: TemplateConfig): boolean {
  if (!config.name || !config.description) {
    return false
  }
  return true
}