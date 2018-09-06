const { execSync } = require('child_process')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const rm = require('rimraf')

const generate = require('./generate')

const TEMP_DIR = '.tmp'

function github(userRepo) {
  const repositoryURL = `git@github.com:${userRepo}.git`
  const cloneRepoCommand = `git clone --depth=1 ${repositoryURL} ${TEMP_DIR}`

  execSync(cloneRepoCommand)
  const { prompt } = require(path.join(process.cwd(), TEMP_DIR, 'lz.config.js'))

  inquirer.prompt(prompt).then(answers => {
    execSync(`cd ${TEMP_DIR} && git filter-branch --prune-empty --subdirectory-filter template`)

    generate(TEMP_DIR, answers, 'scaffold')

    rm(TEMP_DIR, function rimrafCB(argument) {
      console.log(TEMP_DIR, 'dir', chalk.red('deleted!'))
    })
  })
}

module.exports = github
