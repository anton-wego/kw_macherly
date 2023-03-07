const strftime = require('strftime')
const axios = require('axios')
const Yml = require('yml')

module.exports = class HappyfaresIn {
  FORMATDATE = '%m/%d/%Y'
  //constructor
  constructor(conversion) {
    this.provider = 'happyfares.in';
    this.startDate = strftime('%m/%d/%Y', new Date(conversion.startDate))
    this.endDate = strftime('%m/%d/%Y', new Date(conversion.endDate))
    this.config = require('yml').load(`./config/${conversion.provider}.yml`)
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

  import = async () =>  {
    const result = await axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: this.config.data.request_url,
      data: this.requestBody()
    })
    .then(function (res) {
      return res.data
    })
    .catch(function (err) {
      return err
    });

    console.log(result)
  }

}


// def request_body(start_date, end_date)
//           {
//             "Auth_Header": {
//               "UserId": @config[:data][:user],
//               "Password": @config[:data][:password],
//               "Request_Id": @config[:data][:request_id],
//               "IP_Address": @config[:data][:ip_address]
//             },
//             "FromDate": start_date,
//             "ToDate": end_date
//           }.to_json
//         end

//         def request_data(start_date, end_date)
//           require 'uri'
//           require 'net/http'

//           uri = URI.parse(@config[:data][:request_url])
//           http = Net::HTTP.new(uri.host, uri.port)
//           http.read_timeout = 120
//           http.use_ssl = true if uri.scheme == 'https'
//           req = Net::HTTP::Post.new(uri.request_uri)
//           req['Content-Type'] = 'application/json'
//           req.body = request_body(start_date, end_date)
//           res = http.request(req)
//           sleep 5
// # binding.pry
//           # JSON.parse(res.body)
//           res
//         end