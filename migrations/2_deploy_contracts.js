var HolidayCoin = artifacts.require("./HolidayCoin.sol");
var HolidayCoinCrowdSale = artifacts.require("./HolidayCoinCrowdSale.sol");
var VoteManager = artifacts.require("./VoteManager.sol");

module.exports = function (deployer) {
  return deployer.deploy(HolidayCoin).then(function() {
    return deployer.deploy(VoteManager, HolidayCoin.address);
  });
};
