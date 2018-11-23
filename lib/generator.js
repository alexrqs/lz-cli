const inquirer = require('inquirer')

const maker = require('./maker')
const insert = require('./insert')
const parseConfig = require('./parseConfig')
const postHook = require('./postHook')

function config(scaffoldKey) {
  const { prompt, postScripts } = parseConfig(scaffoldKey)

  inquirer.prompt(prompt).then(answers => {
    maker(json.template, answers)
    insert(json.inserts, answers)
    postHook(postScripts)
  })
}

module.exports = config
