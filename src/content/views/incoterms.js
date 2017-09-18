const { fileToHtml, } = require('../../utils.js')

module.exports = {
  view: 'incoterms',
  pageTitle: 'International Commercial Terms | Coot Freight Ltd',
  headline: 'International Commercial Terms',
  body: fileToHtml('incoterms.md'),
  cta: 'Make an enquiry',
}
