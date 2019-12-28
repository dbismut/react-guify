const fs = require('fs-extra')
const pkg = require('./package.json')

function writeCjsEntryFile(name) {
  const baseLine = `module.exports = require('./${name}`
  const contents = `'use strict'
if (process.env.NODE_ENV === 'production') {
  ${baseLine}.cjs.production.min.js')
} else {
  ${baseLine}.cjs.development.js')
}
`
  return fs.writeFile('./dist/index.js', contents)
}

writeCjsEntryFile(pkg.name)
