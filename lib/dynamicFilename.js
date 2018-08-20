const path = require('path')

function dynamicFilename(filePath, interpolation) {
  const basename = path.basename(filePath)

  if (!interpolation) {
    return basename
  }

  let currentName = basename
  Object.keys(interpolation).forEach(key => {
    currentName = basename.replace(`_${key}_`, interpolation[key])
  })

  return currentName
}

module.exports = dynamicFilename
