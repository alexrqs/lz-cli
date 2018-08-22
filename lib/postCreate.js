const fs = require('fs')
const path = require('path')
const mkd = require('mkdirp')
const spawn = require('cross-spawn')

function postCreate(command) {
  const fileContent = `#!/usr/bin/env bash\n${command}`
  const scriptsPath = path.join(process.cwd(), 'scripts')

  mkd.sync(scriptsPath)

  fs.writeFileSync(path.join(scriptsPath, 'postcreate.sh'), fileContent, {
    mode: 0755,
  })

  const postcreate = spawn(path.join(scriptsPath, 'postcreate.sh'))

  postcreate.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })

  postcreate.stderr.on('data', data => {
    console.log(`stderr: ${data}`)
  })

  postcreate.on('close', code => {
    console.log(`child process exited with code ${code}`)
  })
}

module.exports = postCreate
