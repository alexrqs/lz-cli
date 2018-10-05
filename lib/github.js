const chalk = require('chalk')
const path = require('path')
const inquirer = require('inquirer')
const rm = require('rimraf')
const git = require('simple-git/promise')

const maker = require('./maker')
const { SKIPPED_FOLDER } = require('./constants')

function github(userRepo) {
  const TEMP_DIR = '.tmp'
  const repositoryURL = `git@github.com:${userRepo}.git`

  console.log(chalk.yellow('Cloning'), chalk.gray(repositoryURL), 'into', TEMP_DIR)

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
      maker(TEMP_DIR, answers, SKIPPED_FOLDER)

      rm(TEMP_DIR, () => {
        console.log(TEMP_DIR, 'folder', chalk.red('deleted!'))
      })
    })
}

module.exports = github
