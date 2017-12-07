var HolidayCoin = artifacts.require("./HolidayCoin.sol");
var HolidayCoinCrowdSale = artifacts.require("./HolidayCoinCrowdSale.sol");

module.exports = function (deployer) {
  let c = web3.eth.contract(HolidayCoin.abi).at(HolidayCoin.address);
  c.transferOwnership(HolidayCoinCrowdSale.address, { from: web3.eth.accounts[0] });
};
