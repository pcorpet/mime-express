FROM node:current

WORKDIR /work
RUN yarn init -y && yarn add n3 airtable
RUN mkdir latestDump && \
    curl https://raw.githubusercontent.com/dice-group/LIdioms/master/de/german.ttl -o latestDump/german.ttl && \
    curl https://raw.githubusercontent.com/dice-group/LIdioms/master/en/english.ttl -o latestDump/english.ttl && \
    curl https://raw.githubusercontent.com/dice-group/LIdioms/master/it/italian.ttl -o latestDump/italian.ttl && \
    curl https://raw.githubusercontent.com/dice-group/LIdioms/master/pt/portuguese.ttl -o latestDump/portuguese.ttl && \
    curl https://raw.githubusercontent.com/dice-group/LIdioms/master/rus/russian.ttl -o latestDump/russian.ttl && \
    curl https://raw.githubusercontent.com/dice-group/LIdioms/master/tr/tr.ttl -o latestDump/tr.ttl
