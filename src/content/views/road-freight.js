const { fileToHtml, } = require('../../utils.js')

module.exports = {
  view: 'road-freight',
  pageTitle: 'Road Freight | Coot Freight Ltd',
  headline: 'Road freight',
  body1: fileToHtml('road-freight_1.md'),
  body2: fileToHtml('road-freight_2.md'),
  table: require('../trailer_dimensions.json'),
  tableHeading: 'Trailer dimensions',
  cta: 'Get a quote!',
}
