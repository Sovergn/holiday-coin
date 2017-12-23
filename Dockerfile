FROM node:8.1.2-alpine

USER root
ENV NODE_ENV development

RUN apk add --no-cache --virtual .persistent-deps curl openssl make gcc g++ python py-pip git
RUN npm install --silent --save-dev -g gulp-cli typescript node-gyp

RUN mkdir -p /var/www/holiday-coin/
RUN chown node:node /var/www/holiday-coin/

USER node
WORKDIR /var/www/holiday-coin/

COPY ./package*.json ./
RUN npm install -ddd

USER root
COPY . ./
RUN npm run build

# Expose ports
EXPOSE 8080

ENV NODE_ENV production
CMD node -r ts-node/register src/server
