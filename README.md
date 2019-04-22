# Deploy

First create an Firebase auth token:

```sh
docker-compose run --rm frontend node_modules/.bin/firebase login:ci --no-localhost
```

Then use the generated token to deploy:

```sh
docker-compose run --rm -e FIREBASE_TOKEN=<your token> frontend node_modules/.bin/firebase deploy --project mime-express
```
