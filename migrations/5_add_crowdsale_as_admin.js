var HolidayCoinCrowdSale = artifacts.require("./HolidayCoinCrowdSale.sol");
var VoteManager = artifacts.require("./VoteManager.sol");

module.exports = function (deployer) {
  let c = web3.eth.contract(VoteManager.abi).at(VoteManager.address);
  return c.addAdmin(HolidayCoinCrowdSale.address, { from: web3.eth.accounts[0] });
};
