var HolidayCoin = artifacts.require("./HolidayCoin.sol");
var HolidayCoinCrowdSale = artifacts.require("./HolidayCoinCrowdSale.sol");
var VoteManager = artifacts.require("./VoteManager.sol");

module.exports = function (deployer) {
  let timestamp = Date.now();
  return deployer.deploy(HolidayCoin).then(function() {
    return deployer.deploy(VoteManager, HolidayCoin.address);
  }).then(function() {
    console.log(VoteManager.address);
    console.log(HolidayCoin.address);
    return deployer.deploy(HolidayCoinCrowdSale, timestamp, timestamp+24*60*60, 10**16, VoteManager.address, HolidayCoin.address);
  });
};
