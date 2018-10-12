const fs = require('fs')
const path = require('path')
const mkd = require('mkdirp')
const chalk = require('chalk')
const _ = require('lodash')

// help to pluralize
_.mixin(require('lodash-inflection'))

const gitignore = require('./gitignore')
const dynamicPath = require('./dynamicPath')

function generate(templatePath, answers, skip, rootDestination) {
  const templateDir = path.join(process.cwd(), templatePath)
  const shouldIgnore = gitignore(templateDir)

  function createFileIn(filePath) {
    // in charge of replacing the answer keys in the filepath
    // for the case where file is named _key_
    const { fileName, destination } = dynamicPath(filePath, answers, templateDir, rootDestination)
    const skipPattern = new RegExp(skip, 'g')
    const isScaffoldDir = skip && skipPattern.test(filePath)
    const isConfigFile = fileName === 'lz.config.js'

    let file = fs.readFileSync(path.resolve(filePath)).toString()

    if (answers && !isScaffoldDir && !isConfigFile) {
      const compiled = _.template(file)
      file = compiled(answers)
    }

    // Create destination folder if doesn't exist
    mkd.sync(destination)

    const writingPath = path.resolve(destination, fileName)
    fs.writeFileSync(writingPath, file)

    console.log(chalk.green(`${destination}/${fileName}`), chalk.yellowBright('created!'))
  }

  function readFolder(folderPath) {
    fs.readdirSync(path.resolve(folderPath)).forEach(fileDir => {
      const shouldSkip = shouldIgnore(fileDir)

      if (shouldSkip) {
        return
      }

      const stats = fs.lstatSync(path.join(folderPath, fileDir))

      if (stats.isFile()) {
        const filePath = path.join(folderPath, fileDir)
        createFileIn(filePath)
      }

      if (stats.isDirectory()) {
        const innerFolder = path.join(folderPath, fileDir)
        readFolder(innerFolder)
      }
    })
  }

  readFolder(templateDir)
}

module.exports = generate
