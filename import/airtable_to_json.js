const Airtable = require('airtable')
const fs = require('fs')

const lang = process.argv[2]
const jsonFile = process.argv[3]

const table = new Airtable().base('apph1smatSuMk2735').table(lang)

fs.readFile(jsonFile, 'utf8', (err, jsonString) => {
  JSON.parse(jsonString).forEach(fields => table.create(fields))
  console.log(`Uploaded to Airtable ${lang}`)
})
