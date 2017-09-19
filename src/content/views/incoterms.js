const { fileToHtml, } = require('../../utils.js')

module.exports = {
  view: 'incoterms',
  pageTitle: 'International Commercial Terms | Coot Freight Ltd',
  headline: 'International Commercial Terms',
  body: fileToHtml('incoterms.md'),
  table: require('../incoterms_duties.json'),
  tableHeading: 'Duties of buyer / seller (Incoterms 2010)',
  cta: 'Make an enquiry',
}
