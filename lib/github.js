const { execSync } = require('child_process')
const log = require('chalk')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const rm = require('rimraf')
const git = require('simple-git/promise')

const maker = require('./maker')

function github(userRepo) {
  const TEMP_DIR = '.tmp'
  const repositoryURL = `git@github.com:${userRepo}.git`

  console.log(log.yellow('Cloning'), log.gray(repositoryURL), 'into', TEMP_DIR)

  git()
    .clone(repositoryURL, TEMP_DIR, '--depth=1')
    .then(() => {
      const { prompt } = require(path.join(process.cwd(), TEMP_DIR, 'lz.config.js'))
      // move the contents of the template directory to the root of the temp dir
      // to start generating the template
      const filterBranch = git(TEMP_DIR).raw([
        'filter-branch',
        '--prune-empty',
        '--subdirectory-filter',
        'template',
      ])

      return Promise.all([inquirer.prompt(prompt), filterBranch])
    })
    .then(([answers]) => {
      maker(TEMP_DIR, answers, 'scaffold')

      rm(TEMP_DIR, function rimrafCB(argument) {
        console.log(TEMP_DIR, 'folder', log.red('deleted!'))
      })
    })
}

module.exports = github
