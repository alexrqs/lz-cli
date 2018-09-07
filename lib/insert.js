const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const _ = require('lodash')

function insert(json, interpolation) {
  if (!json || !(json instanceof Array)) { return }

  json.forEach(function(insert) {
    const replace = `// ${insert.pattern}\n${insert.echo}`
    let file = fs.readFileSync(insert.path, 'utf-8')
    file = file.replace(`// ${insert.pattern}`, replace)

    if (interpolation) {
      const compiled = _.template(file)
      file = compiled(interpolation)
    }

    fs.writeFileSync(insert.path, file, 'utf-8')

    console.log(chalk.green(insert.path), chalk.magenta('modified!'))
  })
}

module.exports = insert
