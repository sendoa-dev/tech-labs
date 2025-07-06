import fs from 'fs'
import path from 'path'

import dotenv from 'dotenv'
import fsExtra from 'fs-extra'
import {glob} from 'glob'
import mjml2html from 'mjml'

console.time('built in')

const availableEnvs = ['staging', 'pre', 'production']
const ENV = availableEnvs.includes(process.env.NODE_ENV) ? process.env.NODE_ENV : 'staging'

console.info('Building for ', ENV)

dotenv.config({ path: `.env.${ENV}` })

function simpleMerge (current, updates) {
  if (typeof current !== 'object' || typeof updates !== 'object') {
    throw new Error('Both parameters must be objects')
  }

  const merged = JSON.parse(JSON.stringify(current))

  for (const [key, value] of Object.entries(updates)) {
    typeof value === 'object' && value !== null && !Array.isArray(value)
      ? merged[key] = simpleMerge(merged[key] || {}, value)
      : merged[key] = value
  }

  return merged
}

const loadLayoutTranslations = () => {
  let translations = {}

  glob.sync('./**/_layout/locales.json').forEach((translationFile) => {
    const content = fs.readFileSync(translationFile, 'utf8')
    try {
      translations = JSON.parse(content)
    } catch (error) {
      console.error(`Error parsing file ${translationFile}:`, error)
    }
  })

  return translations
}
const loadFileTranslations = (path) => {
  let translations = {}

  glob.sync(`./**/${path}/locales.json`).forEach((translationFile) => {
    const content = fs.readFileSync(translationFile, 'utf8')
    try {
      translations = JSON.parse(content)
    } catch (error) {
      console.error(`Error parsing file ${translationFile}:`, error)
    }
  })

  return translations
}

const replaceAuth0Message = (mjmlContent, allTranslations) => {
  const translatorRegex = /\{\{\s?\$auth0Message\(([^)]+)\)\s?\}\}/g
  mjmlContent = mjmlContent.html || mjmlContent

  const emailLanguages = Object.keys(allTranslations)
  const defaultLanguage = emailLanguages.includes('en') ? 'en' : emailLanguages[0]

  const firstLanguageCondition = (language, message) => {
    return `{% if user.user_metadata.language == '${language}' %}${message}`
  }
  const consecuentLanguageCondition = (language, message) => {
    return `{% elsif user.user_metadata.language == '${language}' %}${message}`
  }
  const defaultLanguageCondition = (message) => {
    return `{% else %}${message}{% endif %}`
  }

  return mjmlContent.replace(translatorRegex, (match, p1) => {
    const builtConditionArray = []
    emailLanguages.forEach((language, index) => {
      if (index === 0) {
        builtConditionArray.push(firstLanguageCondition(language, allTranslations[language][p1]))
      }

      if (index > 0 && index < emailLanguages.length) {
        builtConditionArray.push(consecuentLanguageCondition(language, allTranslations[language][p1]))
      }

      if (emailLanguages.length === (index + 1)) {
        builtConditionArray.push(defaultLanguageCondition(allTranslations[defaultLanguage][p1]))
      }
    })

    return builtConditionArray.join('') || match
  })
}
const replaceTranslations = (mjmlContent, translations) => {
  const translatorRegex = /\{\{\s?\$t\(([^)]+)\)\s?\}\}/g
  mjmlContent = mjmlContent.html || mjmlContent

  return mjmlContent.replace(translatorRegex, (match, p1) => {
    return translations[p1] || match
  })
}

const replaceEnvs = (mjmlContent, envs) => {
  const translatorRegex = /\{\{\s?\$ENV\(([^)]+)\)\s?\}\}/g
  mjmlContent = mjmlContent.html || mjmlContent

  return mjmlContent.replace(translatorRegex, (match, p1) => {
    return envs[p1] || match
  })
}

fsExtra.emptyDirSync('./dist/')
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist', { recursive: true })
}

fs.cpSync('./public/', './dist/public', { recursive: true })

const layoutTranslationsObject = loadLayoutTranslations()

glob.sync('./**/*{.mjml,.txt}', { ignore: ['**/node_modules/**', '**/src/_layout/**', '**/src/**/_layout/**'] }).forEach((mjmlFile) => {
  const mjmlFileParse = path.parse(mjmlFile)
  const fileExt = mjmlFileParse.ext

  const filePath = mjmlFileParse.dir.split('src/')[1]
  if (filePath) {
    const [fileDir, fileName, fileVersion] = filePath.split('/')
    const isMjml = fileExt === '.mjml'

    const distFileName = isMjml ? 'content' : 'subject'
    const distFileExt = isMjml ? 'html' : 'txt'

    if (!fs.existsSync(`./dist/${fileDir}/${fileName}/${fileVersion}`)) {
      fs.mkdirSync(`./dist/${fileDir}/${fileName}/${fileVersion}`, { recursive: true })
    }

    let htmlOutput = null

    const fileTranslationsObject = loadFileTranslations(filePath)
    const translationsObject = simpleMerge(layoutTranslationsObject, fileTranslationsObject)

    Object.keys(fileTranslationsObject).forEach(async (lang) => {
      const fileContent = fs.readFileSync(mjmlFile, 'utf8')

      isMjml
        ? htmlOutput = await mjml2html(fileContent, { validationLevel: 'strict' })
        : htmlOutput = fileContent

      htmlOutput = replaceTranslations(htmlOutput, translationsObject[lang])
      htmlOutput = replaceAuth0Message(htmlOutput, translationsObject)
      htmlOutput = replaceEnvs(htmlOutput, process.env)

      const distFilePath = `${fileDir}/${fileName}/${fileVersion}/${distFileName}.${lang}.${distFileExt}`

      fs.writeFileSync(`./dist/${distFilePath}`, htmlOutput, 'utf8')
    })

    console.info(`Successfully compiled ${fileName} ${distFileName}`)
  }
})

console.timeEnd('built in')
