const fs = require('fs')
const path = require('path')
const mkd = require('mkdirp')
const chalk = require('chalk')
const template = require('lodash.template')

const gitignore = require('./gitignore')
const dynamicFilename = require('./dynamicFilename')

function generate(templatePath, interpolation) {
  const templateDir = path.join(process.cwd(), templatePath)
  const shouldIgnore = gitignore(templateDir)

	function createFileIn(filePath) {
		const fileName = dynamicFilename(filePath, interpolation)
		const destination = path.dirname(filePath.replace(templateDir + '/', ''))

		let file = fs
			.readFileSync(path.resolve(filePath))
			.toString()

    if (interpolation) {
      const compiled = template(file)
      file = compiled(interpolation)
    }

		// Create destination folder if doesn't exist
		mkd.sync(destination)

		const writingPath = path.resolve(destination, fileName)
		fs.writeFileSync(writingPath, file)

		console.log(chalk.green(`${destination}/${fileName}`), chalk.yellowBright('created!'))
	}

	function readFolder(folderPath) {
		fs.readdirSync(path.resolve(folderPath))
			.forEach(function forEachFolder(fileDir) {
        const shouldSkip = shouldIgnore(fileDir)

				if (shouldSkip) { return }

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
