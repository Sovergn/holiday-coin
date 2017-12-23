var HolidayCoin = artifacts.require("./HolidayCoin.sol");
var HolidayCoinCrowdSale = artifacts.require("./HolidayCoinCrowdSale.sol");
var VoteManager = artifacts.require("./VoteManager.sol");

module.exports = function (deployer) {
  let start = Math.floor(Date.now() / 1000) + 120;
  let end = start + 24*60*60;
  return deployer.deploy(HolidayCoinCrowdSale, start, end, 10**16, VoteManager.address, HolidayCoin.address);
};
