const path = require('path')
const inquirer = require('inquirer')

const generate = require('./generate')

function folder(folderPath) {
  const scaffoldPath = path.resolve(process.cwd(), folderPath)
  const { prompt, inserts } = require(scaffoldPath + '/lz.config.js')

  inquirer.prompt(prompt).then(answers => {
    generate(folderPath + '/template', answers)
  })
}

module.exports = folder
