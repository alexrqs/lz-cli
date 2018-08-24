const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const CONFIG_FILE = 'lz.config.js'
function parseConfig(scaffold) {
  const configPath = path.join(process.cwd(), CONFIG_FILE)
  const configExist = fs.existsSync(configPath)

  if (!configExist) {
    console.log(chalk.red(`Make sure the config file exist or create a new one "${CONFIG_FILE}"`))
    process.exit('1')
  }

  const configFile = require(configPath)
  if (!configFile[scaffold]) {
    console.log(chalk.red(`Make sure ${scaffold} scaffold exist on the config file`))
    process.exit('1')
  }

  return configFile[scaffold]
}

module.exports = parseConfig
