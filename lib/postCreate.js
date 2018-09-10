const chalk = require('chalk')
const { spawn } = require('child_process')
const CLI = require('clui')

const Spinner = CLI.Spinner
const countdown = new Spinner()

function bufferOutput(data) {
  countdown.stop()
  console.log(data.toString())
}

function execCommand(command) {
  const [base, ...args] = command.split(' ')
  const postCommand = spawn(base, args)

  countdown.message(`Running ${command} ... `)
  countdown.start()

  postCommand.stdout.on('data', bufferOutput)
  postCommand.stderr.on('data', bufferOutput)
  postCommand.on('close', bufferOutput)
}

function postCreate(postcreate) {
  if (typeof postcreate === 'string') {
    execCommand(postcreate)
  }

  if (typeof postcreate === 'array') {
    postcreate.forEach(execCommand)
  }
}

module.exports = postCreate
