const { fileToHtml, } = require('../../utils.js')

module.exports = {
  view: 'contact',
  pageTitle: 'Contact us | Coot Freight Ltd',
  headline: 'Contact Coot Freight',
  phoneEmail: fileToHtml('contact_phone-email.md'),
  officeHours: fileToHtml('contact_office-hours.md'),
  legalDetails: fileToHtml('contact_legal-details.md'),
  address: fileToHtml('contact_address.md'),
  mapLinkText: 'See Coot Freight Ltd on Google Maps',
}
