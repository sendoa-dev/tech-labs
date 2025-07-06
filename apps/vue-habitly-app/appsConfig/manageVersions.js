import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import plist from 'plist'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// Argument parsing with flags for platform selection
const argv = yargs(hideBin(process.argv))
  .option('debug', { type: 'boolean', default: false })
  .option('release', { type: 'boolean', default: false })
  .option('major', { type: 'boolean', default: false })
  .option('minor', { type: 'boolean', default: false })
  .option('patch', { type: 'boolean', default: false })
  .option('ios', { type: 'boolean', describe: 'Only update iOS' })
  .option('android', { type: 'boolean', describe: 'Only update Android' })
  .check(argv => {
    if (!argv.debug && !argv.release) {
      throw new Error('Please specify --debug or --release')
    }

    // If neither --ios nor --android is specified, set both to true by default
    if (!argv.ios && !argv.android) {
      argv.ios = true
      argv.android = true
    }

    return true
  })
  .argv

const isDebug = argv.debug
const isRelease = argv.release
const isMajor = argv.major
const isMinor = argv.minor
const isPatch = argv.patch
const updateIOS = argv.ios
const updateAndroid = argv.android

// Set up paths and project root
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

// Load versions from JSON file
const versionsFile = path.join(__dirname, 'versions.json')
const versions = JSON.parse(fs.readFileSync(versionsFile, 'utf-8'))

// Core function for iOS versioning
async function handleiOSVersioning (isDebug) {
  const iosVersion = versions.ios.version
  const iosBuild = versions.ios.build

  const upgradeAmount = isDebug ? 0 : 1

  const newIosVersion = incrementVersionName(iosVersion)
  const newIosBuild = iosBuild + upgradeAmount

  updatePlistFile(newIosVersion, newIosBuild)

  highlightMessage(`iOS Version: ${newIosVersion} | iOS Build: ${newIosBuild.toString()}`)

  versions.ios.version = newIosVersion
  versions.ios.build = newIosBuild
}

// Core function for Android versioning
async function handleAndroidVersioning (isDebug) {
  const androidVersionName = versions.android.versionName
  const androidVersionCode = versions.android.versionCode

  const upgradeAmount = isDebug ? 0 : 1

  const newAndroidVersionName = incrementVersionName(androidVersionName)
  const newAndroidVersionCode = androidVersionCode + upgradeAmount

  updateGradleFile(newAndroidVersionCode, newAndroidVersionName)

  highlightMessage(`Android Version: ${newAndroidVersionName} | Android Build: ${newAndroidVersionCode.toString()}`)

  versions.android.versionName = newAndroidVersionName
  versions.android.versionCode = newAndroidVersionCode
}

// Main function
async function main () {
  try {
    if (isDebug || isRelease) {
      if (updateIOS) {
        await safeExecute(() => handleiOSVersioning(isDebug), 'iOS Versioning')
      }
      if (updateAndroid) {
        await safeExecute(() => handleAndroidVersioning(isDebug), 'Android Versioning')
      }
    }

    fs.writeFileSync(versionsFile, JSON.stringify(versions, null, 2), 'utf-8')
  } catch (error) {
    console.error('Critical Error:', error)
    process.exit(1)
  }
}

main()

// Helper functions
async function safeExecute (action, description) {
  try {
    await action()
  } catch (error) {
    console.error(`Error during ${description}:`, error)
  }
}

function highlightMessage (message) {
  console.info('\n')
  console.info('===========================================')
  console.info(`${message}`)
  console.info('===========================================')
}

function determineVersionPosition (isMajor, isMinor, isPatch) {
  if (isMajor) return 0
  if (isMinor) return 1
  if (isPatch) return 2
  return null
}

function incrementVersionName (version) {
  const position = determineVersionPosition(isMajor, isMinor, isPatch)

  if (position === null) { return version }

  const versionParts = version.split('.').map(Number)

  versionParts[position] += 1

  for (let i = position + 1; i < versionParts.length; i++) {
    versionParts[i] = 0
  }

  return versionParts.join('.')
}

function updateGradleFile (versionCode, versionName) {
  const gradleFilePath = path.join(projectRoot, 'android/app/build.gradle')
  let gradleFileContent = fs.readFileSync(gradleFilePath, 'utf-8')

  gradleFileContent = gradleFileContent
    .replace(/versionCode\s+\d+/, `versionCode ${versionCode}`)
    .replace(/versionName\s+["'][^"']+["']/, `versionName "${versionName}"`)

  fs.writeFileSync(gradleFilePath, gradleFileContent, 'utf-8')
}

function updatePlistFile (version, build) {
  const plistFilePath = path.join(projectRoot, 'ios/App/App/Info.plist')

  const plistFileContent = fs.readFileSync(plistFilePath, 'utf-8')
  const plistData = plist.parse(plistFileContent)

  plistData.CFBundleShortVersionString = version
  plistData.CFBundleVersion = build.toString()

  const updatedPlistContent = plist.build(plistData)
  fs.writeFileSync(plistFilePath, updatedPlistContent, 'utf-8')
}
