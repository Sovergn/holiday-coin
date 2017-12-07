import * as program from "commander";
import * as request from "request-promise-native";
import config from "../config";
import { web3, Contracts } from "../eth";
import BitcoinProcessor from "../processors/BitcoinProcessor";
import CreditCardProcessor from "../processors/CreditCardProcessor";
import BitcoinToHolidayCoinConverter from "../converters/BitcoinToHolidayCoinConverter";
import USDToHolidayCoinConverter from "../converters/USDToHolidayCoinConverter";

function help(message: string) {
  console.log(message);
}

function viewTransaction(hash) {
  web3.eth.getTransaction(hash, function(err, tx) {
    console.log(tx);
  });
}

function getERC20Balance(token, address) {
  let c = Contracts.HolidayCoin.clone();
  c.options.address = token;
  c.methods.balanceOf(address).call(function(err, balance) {
    console.log(balance)
  });
}

function assignTokens(address, amount) {
  Contracts.HolidayCoinCrowdSale.methods.assignTokens(address, amount).send({
    from: config.get("web3:defaultAccount")
  }, function(err, txhash) {
    console.log(err);
    viewTransaction(txhash);
  });
}

program
.command('cc <subaction>')
.action(function(subaction, command) {
  switch(subaction) {
    case "process":
    CreditCardProcessor();
    break;
  }
});

program
.command('bitcoin <subaction>')
.option('--address <string>', 'Bitcoin address w/ UTXOs.')
.action(function(subaction, command) {
  switch(subaction) {
    case "process":
    BitcoinProcessor(command.address);
    break;
  }
});

program
.command('convert')
.action(function(subaction, command) {
  BitcoinToHolidayCoinConverter();
  USDToHolidayCoinConverter();
});

program
.command('eth')
.option('--hash <string>', 'Transaction hash')
.action(function(subaction, command) {
  switch (subaction) {
    case "tx":
    case "transaction":
    viewTransaction(command.hash);
    break;
  }
});

program
.command('ethereum')
.option('--hash <string>', 'Transaction hash')
.action(function(subaction, command) {
  switch (subaction) {
    case "tx":
    case "transaction":
    viewTransaction(command.hash);
    break;
  }
});

program
.command('crowdsale')
.option('--contract <string>', 'Address of contract')
.option('--address <string>', 'Address of user')
.option('--amount <number>', 'Amount of tokens')
.action(function(subaction, command) {
  switch (subaction) {
    case "assign":
    assignTokens(command.address, command.amount);
    break;

    case "erc20balance":
    getERC20Balance(command.contract || Contracts.HolidayCoin.options.address, command.address);
    break;
  }
});

program.version('0.1.0').parse(process.argv);
