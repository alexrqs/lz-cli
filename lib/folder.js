const path = require('path')
const inquirer = require('inquirer')

const generate = require('./generate')
const postCreate = require('./postCreate')

function folder(folderPath) {
  const scaffoldPath = path.resolve(process.cwd(), folderPath)
  const { prompt, inserts, postcreate } = require(scaffoldPath + '/lz.config.js')

  inquirer.prompt(prompt).then(answers => {
    generate(folderPath + '/template', answers)
    postCreate(postcreate)
  })
}

module.exports = folder
