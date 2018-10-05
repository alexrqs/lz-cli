const path = require('path')
const inquirer = require('inquirer')

const maker = require('./maker')

function folder(folderPath) {
  const scaffoldPath = path.resolve(process.cwd(), folderPath)
  const { prompt } = require(`${scaffoldPath}/lz.config.js`)

  console.log(log.yellow('Cloning'), log.gray(folderPath))

  inquirer.prompt(prompt).then(answers => {
    maker(`${folderPath}/template`, answers)
  })
}

module.exports = folder
