const { fileToHtml, } = require('../../utils.js')

module.exports = {
  view: 'sea-freight',
  pageTitle: 'Sea Freight | Coot Freight Ltd',
  headline: 'Sea freight',
  body1: fileToHtml('sea-freight_1.md'),
  body2: fileToHtml('sea-freight_2.md'),
  cta: 'Get a quote!',
}
