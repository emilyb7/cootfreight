const { markdown, } = require('markdown')
const fs = require('fs')
const path = require('path')

const toHtml = md => markdown.toHTML(md)

exports.fileToHtml = file => {
  const filePath = path.join(__dirname, 'content', 'markdown', file)
  const fileContents = fs.readFileSync(filePath).toString()
  return toHtml(fileContents)
}
