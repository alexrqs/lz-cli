#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')
const { homeScreen } = require('./view')

const github = require('./github')
const folder = require('./folder')
const generator = require('./generator')

homeScreen()

program.version(pkg.version, '-v, --version')

program
  .command('github <user/repo>')
  .alias('gh')
  .description('Generate scaffold from github user/repo')
  .option('-f, --file <file>', 'Only one file')
  .action(github)

program
  .command('folder <path>')
  .alias('f')
  .description('Generate scaffold from folder path')
  .action(folder)

program
  .command('generate <key>')
  .alias('g')
  .description('Generate scaffold from config file key')
  .action(generator)

program.parse(process.argv)
