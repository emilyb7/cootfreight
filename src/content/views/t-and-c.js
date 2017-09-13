const { fileToHtml, } = require('../../utils.js')

module.exports = {
  pageTitle: 'Terms and conditions | Coot Freight Ltd',
  view: 't-and-c',
  headline: 'Our Ts & Cs',
  body: fileToHtml('t-and-c.md'),
}
