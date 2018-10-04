const minimist = require('minimist')
const inquirer = require('inquirer')

const maker = require('./maker')
const insert = require('./insert')
const parseConfig = require('./parseConfig')
const postCreate = require('./postCreate')

function config(scaffoldKey) {
  const rawOptions = process.argv.slice(2)
  const parsedOptions = minimist(rawOptions)
  const json = parseConfig(scaffoldKey)

  inquirer.prompt(json.prompt).then(answers => {
    maker(json.template, answers)
    insert(json.inserts, answers)
    postCreate(json.postcreate)
  })
}

module.exports = config
