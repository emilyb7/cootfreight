const { fileToHtml, } = require('../../utils.js')

module.exports = {
  view: 'hazardous',
  pageTitle: 'Hazardous Goods Classifications | Coot Freight Ltd',
  headline: 'Hazardous Goods Classifications',
  body: fileToHtml('hazardous.md'),
  cta: 'Make an enquiry',
}
