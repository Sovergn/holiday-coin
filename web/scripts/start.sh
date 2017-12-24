#!/bin/sh
docker run -d --name holiday-coin-static -p 80:80 -p 443:443 -v ~/Desktop/etc/letsencrypt:/etc/letsencrypt holiday-coin-static:latest