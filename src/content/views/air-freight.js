const { fileToHtml, } = require('../../utils.js')

module.exports = {
  view: 'air-freight',
  pageTitle: 'Air freight | Coot Freight Ltd',
  headline: 'Air freight',
  body: fileToHtml('air-freight.md'),
  cta: 'Get a quote!',
}
