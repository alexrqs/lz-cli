const figlet = require('figlet')
const chalk = require('chalk')
const clear = require('clear')
const updateNotifier = require('update-notifier')

const pkg = require('../package.json')

function updateCheck() {
  const notifier = updateNotifier({ pkg });
  const message = [];

  if (notifier.update) {
    message.push('Update available: ' + chalk.green.bold(notifier.update.latest) + chalk.gray(' (current: ' + notifier.update.current + ')'));
    message.push('Run ' + chalk.magenta('npm install -g ' + pkg.name) + ' to update.');
    console.log(yosay(message.join(' '), {maxLength: stringLength(message[0])}));
  }
}

function homeScreen(argument) {
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
