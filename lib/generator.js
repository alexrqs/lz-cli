const inquirer = require('inquirer')

const maker = require('./maker')
const insert = require('./insert')
const parseConfig = require('./parseConfig')

function config(scaffoldKey) {
  const json = parseConfig(scaffoldKey)

  inquirer.prompt(json.prompt).then(answers => {
    maker(json.template, answers)
    insert(json.inserts, answers)
  })
}

module.exports = config
