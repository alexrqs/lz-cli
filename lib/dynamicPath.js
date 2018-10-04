const path = require('path')

function dynamicPath(filePath, answers, templateDir) {
  let fileName = path.basename(filePath)
  let destination = path.dirname(filePath.replace(templateDir + '/', ''))

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
