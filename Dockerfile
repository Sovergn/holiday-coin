FROM node:8.1.2-alpine

USER root
ENV NODE_ENV production

RUN apk add --no-cache --virtual .persistent-deps curl openssl make gcc g++ python py-pip git
RUN npm install --silent -g gulp-cli typescript node-gyp

RUN mkdir -p /opt/holiday-coin/
RUN chown node:node /opt/holiday-coin/

USER node
WORKDIR /opt/holiday-coin/

COPY ./package*.json ./
RUN npm install -ddd
RUN npm install --no-save typescript ts-node @types/node web3-typescript-typings

USER root

COPY . ./

# Expose ports
EXPOSE 8080

CMD node -r ts-node/register src/server
