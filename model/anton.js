const strftime = require('strftime')
const axios = require('axios')
const Yml = require('yml')
const puppeteer = require('puppeteer')
const pry = require('pry')

module.exports = class Anton {
  FORMATDATE = '%m/%d/%Y'
  //constructor
  constructor(conversion) {
    this.provider = 'anton';
    this.startDate = strftime('%m/%d/%Y', new Date(conversion.startDate))
    this.endDate = strftime('%m/%d/%Y', new Date(conversion.endDate))
    this.config = ""//require('yml').load(`./config/${conversion.provider}.yml`)
    // this.age = age;
    // this.weight = weight;
  }

  // // getter
  // get providerName() {
  //   return this.provider
  // }


  //method
  requestBody = () => {
    return `{
      "Auth_Header": {
        "UserId": "${this.config.data.user}",
        "Password": "${this.config.data.password}",
        "Request_Id": "${this.config.data.request_id}",
        "IP_Address": "${this.config.data.ip_address}"
      },
      "FromDate": "${this.startDate}",
      "ToDate": "${this.endDate}"
    }`

  }

  // const browser =  puppeteer.launch({headless: false})

  import = async () =>  {
    const browser = await puppeteer.launch({
        // Headless option allows us to disable visible GUI, so the browser runs in the "background"
        // for development lets keep this to true so we can see what's going on but in
        // on a server we must set this to true
        headless: false,
        // This setting allows us to scrape non-https websites easier
        ignoreHTTPSErrors: true,
    })

    // then we need to start a browser tab
    let page = await browser.newPage();
    // and tell it to go to some URL
    await page.goto('http://www.wego.com', {
        waitUntil: 'domcontentloaded',
    });
    // print html content of the website
    console.log(await page.content());
    // close everything
    await page.close();
    await browser.close();
  }

}

























