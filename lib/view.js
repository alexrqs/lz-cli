const figlet = require('figlet')
const chalk = require('chalk')
const clear = require('clear')

function homeScreen(argument) {
  clear()
  console.log(
    chalk.cyan(
      figlet.textSync('lz', { horizontalLayout: 'full' }),
    ),
    '\nScaffold for the lazy masses\n',
  )
}

module.exports = {
  homeScreen,
}
