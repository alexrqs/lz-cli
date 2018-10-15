import fs from 'fs'
import test from 'ava'
import maker from '../lib/maker'

const TMP_FOLDER = 'test/fixtures/.tmp'
const answers = {
  interpolation: 'fixture',
}

test('Maker scenario with file', t => {
  const scenario = 's1'
  const destination = `${TMP_FOLDER}/${scenario}`

  maker(`./test/fixtures/case-${scenario}`, answers, false, destination)

  const expected = fs.readFileSync(`test/fixtures/expected-${scenario}/file.js`).toString()
  const is = fs.readFileSync(`${destination}/file.js`).toString()

  t.is(is, expected, 'generates the file ok')
})

test('Maker scenario with folder', t => {
  const scenario = 's2'
  const destination = `${TMP_FOLDER}/${scenario}`

  maker(`./test/fixtures/case-${scenario}`, answers, false, destination)

  const expectedIndex = fs
    .readFileSync(`test/fixtures/expected-${scenario}/src/index.js`)
    .toString()
  const isIndex = fs.readFileSync(`${destination}/src/index.js`).toString()

  const expectedStyle = fs
    .readFileSync(`test/fixtures/expected-${scenario}/src/style.styl`)
    .toString()
  const isStyle = fs.readFileSync(`${destination}/src/style.styl`).toString()

  t.is(isIndex, expectedIndex, 'generates the indexjs ok and goes to the right directory')
  t.is(isStyle, expectedStyle, 'generates the stylefile ok and goes to the right directory')
})

test('Maker scenario with folder and gitignore', t => {
  const scenario = 's3'
  const destination = `${TMP_FOLDER}/${scenario}`

  maker(`./test/fixtures/case-${scenario}`, answers, false, destination)

  const expectedIndex = fs
    .readFileSync(`test/fixtures/expected-${scenario}/src/index.js`)
    .toString()
  const isIndex = fs.readFileSync(`${destination}/src/index.js`).toString()

  const expectedgitignore = fs
    .readFileSync(`test/fixtures/expected-${scenario}/.gitignore`)
    .toString()
  const isgitignore = fs.readFileSync(`${destination}/.gitignore`).toString()

  const error = t.throws(() => {
    fs.readFileSync(`test/fixtures/expected-${scenario}/src/style.styl`)
  }, Error)

  t.is(isgitignore, expectedgitignore, 'generates the gitignore ok on the right directory')
  t.is(isIndex, expectedIndex, 'generates the indexjs ok and goes to the right directory')
  t.regex(
    error.message,
    /no\ssuch\sfile\sor\sdirectory/g,
    'doesnt generates the stylefile because is inside gitignore',
  )
})
