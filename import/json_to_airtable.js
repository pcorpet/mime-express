const Airtable = require('airtable')


new Airtable().base('apph1smatSuMk2735').
  table('Français').
  select({view: 'Cleanup'}).all().
  then(airTableRecords => {
    const records = airTableRecords.map(({fields: {score, title, vulgaire}}) =>
      ({score, title, vulgaire}))
    console.log(JSON.stringify(records, undefined, 2))
  })
