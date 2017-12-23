#!/bin/sh
mkdir /tmp/holiday-coin || echo "/tmp/holiday-coin exists!"
cp config.json /tmp/holiday-coin/
docker run -d --name holiday-coin -v /tmp/holiday-coin:/tmp/holiday-coin -e CONFIG_FILE=/tmp/holiday-coin/config.json -p 8080:8080 holiday-coin:latest