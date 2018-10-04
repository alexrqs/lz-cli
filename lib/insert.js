const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const _ = require('lodash')

function insert(collection, answers) {
  if (!collection || !(collection instanceof Array)) {
    return
  }

  collection.forEach(insertion => {
    const replace = `// ${insertion.pattern}\n${insertion.echo}`
    let file = fs.readFileSync(insertion.path, 'utf-8')
    const ext = path.extname(insertion.path)

    if (ext === '.json') {
      const json = JSON.parse(file)
      let keysToInsert = insertion.echo

      if (answers) {
        const compileWith = _.template(JSON.stringify(keysToInsert))
        keysToInsert = JSON.parse(compileWith(answers))
      }

      json[insertion.pattern] = Object.assign(json[insertion.pattern], keysToInsert)
      file = JSON.stringify(json, null, 2)
    } else {
      file = file.replace(`// ${insertion.pattern}`, replace)

      if (answers) {
        const compileWith = _.template(file)
        file = compileWith(answers)
      }
    }

    fs.writeFileSync(insertion.path, file, 'utf-8')

    console.log(chalk.green(insertion.path), chalk.magenta('modified!'))
  })
}

module.exports = insert
