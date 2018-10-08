const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const _ = require('lodash')

function insert(collection, interpolation) {
  if (!collection || !(collection instanceof Array)) {
    return
  }

  collection.forEach(function(insert) {
    const replace = `// ${insert.pattern}\n${insert.echo}`
    let file = fs.readFileSync(insert.path, 'utf-8')
    const ext = path.extname(insert.path)

    if (ext === '.json') {
      const json = JSON.parse(file)
      json[insert.pattern] = Object.assign(json[insert.pattern], insert.echo)

      file = JSON.stringify(json, null, 2)
    } else {
      file = file.replace(`// ${insert.pattern}`, replace)

      if (interpolation) {
        const compiled = _.template(file)
        file = compiled(interpolation)
      }
    }

    fs.writeFileSync(insert.path, file, 'utf-8')

    console.log(chalk.green(insert.path), chalk.magenta('modified!'))
  })
}

module.exports = insert
