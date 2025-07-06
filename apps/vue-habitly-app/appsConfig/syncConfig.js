import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

const copyFile = (src, dest) => {
  fs.copyFileSync(src, dest)
  console.info(`Copied ${src} to ${dest}`)
}

const iosConfigPath = path.join(projectRoot, 'appsConfig', 'ios')
const androidConfigPath = path.join(projectRoot, 'appsConfig', 'android')

const iosDestRootPath = path.join(projectRoot, 'ios', 'App')
const iosDestPath = path.join(iosDestRootPath, 'App')
const androidDestRootPath = path.join(projectRoot, 'android')
const androidDestPath = path.join(androidDestRootPath, 'app', 'src', 'main')

// iOS files
copyFile(
  path.join(iosConfigPath, 'Info.plist'),
  path.join(iosDestPath, 'Info.plist'),
)

if (!fs.existsSync(path.join(iosDestRootPath, 'fastlane'))) {
  fs.mkdirSync(path.join(iosDestRootPath, 'fastlane'), { recursive: true })
}

copyFile(
  path.join(iosConfigPath, 'fastlane', 'Fastfile'),
  path.join(iosDestRootPath, 'fastlane', 'Fastfile'),
)
copyFile(
  path.join(iosConfigPath, 'fastlane', '.env.local'),
  path.join(iosDestRootPath, 'fastlane', '.env.local'),
)

// Android files
copyFile(
  path.join(androidConfigPath, 'AndroidManifest.xml'),
  path.join(androidDestPath, 'AndroidManifest.xml'),
)
copyFile(
  path.join(androidConfigPath, 'res/xml/network_security_config.xml'),
  path.join(androidDestPath, 'res/xml/network_security_config.xml'),
)

if (!fs.existsSync(path.join(androidDestRootPath, 'fastlane'))) {
  fs.mkdirSync(path.join(androidDestRootPath, 'fastlane'), { recursive: true })
}

copyFile(
  path.join(androidConfigPath, 'fastlane', 'Fastfile'),
  path.join(androidDestRootPath, 'fastlane', 'Fastfile'),
)
copyFile(
  path.join(androidConfigPath, 'fastlane', '.env.local'),
  path.join(androidDestRootPath, 'fastlane', '.env.local'),
)
