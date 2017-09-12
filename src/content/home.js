const { markdown, } = require('markdown')
const fs = require('fs')
const path = require('path')

const toHtml = md => markdown.toHTML(md)

const fileToHtml = file => {
  const filePath = path.join(__dirname, file)
  const fileContents = fs.readFileSync(filePath).toString()
  return toHtml(fileContents)
}

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
  aboutHeader: 'Swift and efficient service, with a personal touch.',
  aboutDescription: fileToHtml('markdown/home.md'),
}
