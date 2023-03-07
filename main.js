const strftime = require('strftime')
const yargs = require('yargs')
const providers = require('./providers.js')

yargs.command({
  command: 'flight-conversion',
  describe: 'Conversion Import',
  builder:{
    provider: {
      describe: 'Provider name',
      demandOption: true,
      type: 'string'
    },
    startDate: {
      describe: 'Start Date Conversion <yyyy/mm/dd>',
      demandOption: true,
      type: 'string'
    },
    endDate: {
      describe: 'End Date Conversion <yyyy/mm/dd>',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    const conversion = {
      provider: argv.provider,
      startDate: Date.parse(argv.startDate),
      endDate: Date.parse(argv.endDate)
    }
    console.log(conversion)
    console.log(providers[argv.provider])

    let conversionObj = new providers[argv.provider](conversion)
    conversionObj.import()



  }
})


yargs.parse()