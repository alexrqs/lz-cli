const figlet = require('figlet')
const chalk = require('chalk')
const clear = require('clear')
const updateNotifier = require('update-notifier')

const pkg = require('../package.json')

function updateCheck() {
  const notifier = updateNotifier({ pkg })

  notifier.notify()
}

function homeScreen() {
  clear()
  console.log(
    chalk.cyan(figlet.textSync('lz', { horizontalLayout: 'full' })),
    '\nScaffold for the lazy masses\n',
  )

  updateCheck()
}

module.exports = {
  homeScreen,
}
