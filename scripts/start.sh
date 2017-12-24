#!/bin/sh
mkdir ~/.holiday-coin || echo "/tmp/holiday-coin exists!"
cp config.json ~/.holiday-coin/
docker run -d --name holiday-coin-full -v ~/.holiday-coin:/tmp/holiday-coin -e CONFIG_FILE=/tmp/holiday-coin/config.json -p 8080:8080 holiday-coin-full:latest