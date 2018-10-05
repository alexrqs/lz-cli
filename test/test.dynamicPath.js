import test from 'ava'
import dy from '../lib/dynamicPath.js'

test('dynamicPath fileName', t => {
  const filePath = 'fixtures/case-template/file.js'
  const answers = null
  const templateDir = 'fixtures/expected-template/'
  const rootDestination = 'test/fixtures'
  const { fileName } = dy(filePath, answers, templateDir, rootDestination)

  t.is(fileName, 'file.js')
})

test('dynamicPath destination with root', t => {
  const filePath = 'fixtures/case-template/file.js'
  const answers = null
  const templateDir = 'fixtures/expected-template/'
  const rootDestination = 'test'
  const { destination } = dy(filePath, answers, templateDir, rootDestination)

  t.is(destination, 'test/fixtures/case-template')
})

test('dynamicPath destination clean', t => {
  const filePath = 'fixtures/case-template/file.js'
  const answers = null
  const templateDir = 'fixtures/expected-template/'
  const { destination } = dy(filePath, answers, templateDir)

  t.is(destination, 'fixtures/case-template')
})
