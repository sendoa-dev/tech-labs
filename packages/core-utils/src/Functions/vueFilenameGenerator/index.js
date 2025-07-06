function pathToPascalCase (str) {
  return str
    .replace(/(^\w|\/\w)/g, s => s.replace('/', '').toUpperCase())
    .replace(/-/g, '')
}

export default function vueFilenameGenerator (fileUrl) {
  const srcPath = '/src/'
  const filePath = new URL(fileUrl).pathname

  const relativePath = filePath.includes(srcPath)
    ? filePath.split(srcPath)[1]
    : filePath

  const fileName = relativePath
    .split('/')
    .map(part => pathToPascalCase(part))
    .join('')
    .replace('.vue', '')

  return fileName
}
