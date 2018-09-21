const path = require('path')

function dynamicFileDestination(filePath, interpolation) {
  if (!interpolation) {
    return filePath
  }

  let currentName = filePath
  Object.keys(interpolation).forEach(key => {
    currentName = currentName.replace(`_${key}_`, interpolation[key])
  })

  return currentName
}

module.exports = dynamicFileDestination
