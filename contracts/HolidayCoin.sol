pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/token/MintableToken.sol";

contract HolidayCoin is MintableToken {
  string public constant name = "Holiday Coin";
  string public constant symbol = "SHC";
  uint256 public constant decimals = 18;
  uint256 public totalSupply = 10**27;
}
