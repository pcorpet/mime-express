FROM node:current

WORKDIR /work
RUN yarn init -y && yarn add n3 airtable
RUN curl https://datahub.ckan.io/dataset/5094f1ad-8034-4ae1-bcf9-74f62b68efc6/resource/9483cf3b-2ed9-4a7f-8d36-6b123f53fb46/download/latestlidioms.tar.gz -o lidioms.tar.gz && tar -xzf lidioms.tar.gz
