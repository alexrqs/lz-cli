const path = require('path')
const isWindows = require('is-windows')

function dynamicPath(filePath, answers, templateDir, rootDestination) {
  let fileName = path.basename(filePath)
  const folderSlash = isWindows() ? '\\' : '/'
  const dirname = path.dirname(filePath.replace(templateDir + folderSlash, ''))
  let destination = rootDestination ? rootDestination + '/' + dirname : dirname

  if (!answers) {
    return {
      fileName,
      destination,
    }
  }

  Object.keys(answers).forEach(key => {
    fileName = fileName.replace(`_${key}_`, answers[key])
    destination = destination.replace(`_${key}_`, answers[key])
  })

  return {
    destination,
    fileName,
  }
}

module.exports = dynamicPath
