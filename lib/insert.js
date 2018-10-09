const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const _ = require('lodash')

function insert(collection, answers) {
  if (!collection || !(collection instanceof Array)) {
    return
  }

  collection.forEach(function(insert) {
    const replace = `// ${insert.pattern}\n${insert.echo}`
    let file = fs.readFileSync(insert.path, 'utf-8')
    const ext = path.extname(insert.path)

    if (ext === '.json') {
      const json = JSON.parse(file)
      let keysToInsert = insert.echo

      if (answers) {
        const compileWith = _.template(JSON.stringify(keysToInsert))
        keysToInsert = JSON.parse(compileWith(answers))
      }

      json[insert.pattern] = Object.assign(json[insert.pattern], keysToInsert)
      file = JSON.stringify(json, null, 2)
    } else {
      file = file.replace(`// ${insert.pattern}`, replace)

      if (answers) {
        const compileWith = _.template(file)
        file = compileWith(answers)
      }
    }

    fs.writeFileSync(insert.path, file, 'utf-8')

    console.log(chalk.green(insert.path), chalk.magenta('modified!'))
  })
}

module.exports = insert
