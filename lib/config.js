const minimist = require('minimist')
const inquirer = require('inquirer')

const parseConfig = require('./parseConfig')
const generate = require('./generate')
const insert = require('./insert')

function config(scaffoldKey) {
  const rawOptions = process.argv.slice(2)
  const parsedOptions = minimist(rawOptions)
  const json = parseConfig(scaffoldKey)

  inquirer
    .prompt(json.prompt)
    .then(answers => {
      generate(json.template, answers)
      insert(json.inserts, answers)

      if (json.postcreate) {
        const shouldPostcreate = !(parsedOptions.postcreate === false)

        if (shouldPostcreate) {
          postcreate(json.postcreate)
        } else {
          console.log('postcreate skipped!')
        }
      }
    })
}


module.exports = config
