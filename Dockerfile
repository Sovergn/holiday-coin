FROM node:8.1.2-alpine

USER root
ENV NODE_ENV development

RUN apk add --no-cache --virtual .persistent-deps curl openssl make gcc g++ python py-pip git
RUN npm install --silent --save-dev -g gulp-cli typescript node-gyp

WORKDIR /var/www/holiday-coin/
COPY ./package*.json ./
RUN npm install
COPY . ./
RUN npm install

# Expose ports
EXPOSE 8080

# Set the default command to execute
# when creating a new container
CMD npm start
