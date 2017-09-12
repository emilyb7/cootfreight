const { fileToHtml, } = require('../utils.js')

module.exports = {
  title: 'Specialist freight forwarder - UK and Russia - Coot Freight Ltd',
  headline: 'Coot Freight',
  tagline: 'Specialist freight forwarder to/from Russia.',
  pageLinks: [
    {
      text: 'Sea',
      link: './sea-freight',
      image: 'ship',
    },
    {
      text: 'Air',
      link: './air-freight',
      image: 'airplane',
    },
    {
      text: 'Road',
      link: './road-freight',
      image: 'delivery-truck',
    },
    {
      text: 'Advice',
      link: './ancillary',
      image: 'operator',
    },
  ],
  // max 2 badges displayed on homepage
  badges: [
    {
      image: './images/bifa-white.png',
      alt: 'Badge of the British International Freight Association',
    },
    {
      image: './images/fiata-logo-white.png',
      alt: 'Badge of the Fiata organisation',
    },
  ],
  aboutHeader: 'Swift and efficient service, with a personal touch.',
  aboutDescription: fileToHtml('home.md'),
  buttonText: 'Get in touch!',
}
