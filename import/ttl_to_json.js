const N3 = require('n3')
const fs = require('fs')


function ttlFileToQuadStore(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  const parser = N3.Parser()
  const quads = parser.parse(content)
  const store = N3.Store()
  store.addQuads(quads)
  return store
}


function getIdiomLabels(store) {
  return store.getSubjects('http://lexinfo.net/ontologies/2.0/lexinfo.owl#termType', 'http://lexinfo.net/ontologies/2.0/lexinfo.owl#idiom').
    map(subject => {
      const senseNode = store.getObjects(subject, 'http://www.w3.org/ns/lemon/ontolex#sense')[0]
      const defNode = senseNode && store.getObjects(senseNode, 'http://www.w3.org/ns/lemon/ontolex#reference')[0]
      const definition = defNode && store.getObjects(defNode, 'http://www.w3.org/2004/02/skos/core#definition')[0]
      return {
        definition: definition && definition.value,
        label: store.getObjects(subject, 'http://www.w3.org/2000/01/rdf-schema#label')[0].value,
      }
    })
}


console.log(JSON.stringify(getIdiomLabels(ttlFileToQuadStore(process.argv[2])), undefined, 2))
