FROM ubuntu:latest

USER root

RUN apt-get update --fix-missing
RUN apt-get install -y software-properties-common

RUN add-apt-repository -y ppa:ethereum/ethereum
RUN apt-get update
RUN apt-get install -y ethereum

ADD holiday-coin-testnet-genesis-block.json /tmp/holiday-coin-testnet-genesis-block.json
RUN cat /tmp/holiday-coin-testnet-genesis-block.json

RUN geth \
  --identity "holiday-coin-test-network" \
  --datadir "/tmp/chain" \
  --verbosity 3 \
  init /tmp/holiday-coin-testnet-genesis-block.json

# Expose ports
EXPOSE 8545

CMD geth \
  --identity "holiday-coin-test-network" \
  --rpc \
  --rpcaddr "0.0.0.0" \
  --rpcport "8545" \
  --rpccorsdomain "*" \
  --rpcapi "db,eth,net,web3" \
  --datadir "/tmp/chain" \
  --port "30303" \
  --nodiscover \
  --nat "any" \
  --networkid 1900
