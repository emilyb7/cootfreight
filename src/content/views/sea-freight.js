const { fileToHtml, } = require('../../utils.js')

module.exports = {
  view: 'sea-freight',
  pageTitle: 'Sea Freight | Coot Freight Ltd',
  body: fileToHtml('sea-freight.md'),
  cta: 'Get a quote!',
}
