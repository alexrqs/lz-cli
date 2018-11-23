const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')

const postHook = require('./postHook')
const maker = require('./maker')
const { SKIPPED_FOLDER } = require('./constants')

function folder(folderPath) {
  const scaffoldPath = path.resolve(process.cwd(), folderPath)
  const { prompt, postScripts } = require(`${scaffoldPath}/lz.config.js`)

  console.log(chalk.yellow('Cloning'), chalk.gray(folderPath))

  inquirer.prompt(prompt).then(answers => {
    maker(`${folderPath}/template`, answers, SKIPPED_FOLDER)
    postHook(postScripts)
  })
}

module.exports = folder
