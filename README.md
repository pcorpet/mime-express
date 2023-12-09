# Build

```sh
docker-compose run --rm frontend npm run dist
```

# Deploy

First create an Firebase auth token:

```sh
docker-compose run --rm frontend node_modules/.bin/firebase login:ci --no-localhost
```

Then use the generated token to deploy:

```sh
docker-compose run --rm -e FIREBASE_TOKEN=<your token> frontend node_modules/.bin/firebase deploy --project mime-express
```

# Import Data

First you should build the `import` container (to avoid any output of the build to spill in a data
file):

```sh
docker-compose build import
```

## French

You must have access to the corresponding Airtable and get an Airtable API key. Then you can run:

```sh
docker-compose run --rm -e AIRTABLE_API_KEY=<your key> import node airtable_to_json.js > src/expressions.json
```

## Other Languages

Pulling from https://github.com/dice-group/LIdioms.

```sh
docker-compose run --rm import node ttl_to_json.js latestDump/english.ttl > data/english.json
```