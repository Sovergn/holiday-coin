#!/bin/sh
docker rm ccprocess
docker run --name ccprocess --network holidaycoin_default --env-file ~/holiday-coin/scripts/prod.env -v ~/.holiday-coin:/tmp/holiday-coin holidaycoin_node node -r ts-node/register src/cli cc process