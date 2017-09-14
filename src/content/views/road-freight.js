const { fileToHtml, } = require('../../utils.js')

module.exports = {
  view: 'road-freight',
  pageTitle: 'Road Freight | Coot Freight Ltd',
  headline: 'Road freight',
  body: fileToHtml('road-freight.md'),
  cta: 'Get a quote!',
}
