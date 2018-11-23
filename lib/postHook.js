const { spawn } = require('child_process')
const chalk = require('chalk')

function postHook(postScripts) {
  if (!postScripts || !(postScripts instanceof Array)) {
    return
  }

  postScripts.forEach(script => {
    console.log('\nRunning', chalk.yellow(script))
    const [command, ...arguments] = script.split(' ')
    spawn(command, arguments, { stdio: 'inherit' })
  })
}

module.exports = postHook
