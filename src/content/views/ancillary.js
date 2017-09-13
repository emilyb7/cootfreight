const { fileToHtml, } = require('../../utils.js')

module.exports = {
  view: 'ancillary',
  pageTitle: 'Advice and ancillary services | Coot Freight Ltd',
  headline: 'Advice / Ancillary Services',
  body: fileToHtml('ancillary.md'),
}
