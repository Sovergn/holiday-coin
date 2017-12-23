pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "zeppelin-solidity/contracts/token/MintableToken.sol";
import "./VoteManager.sol";

contract HolidayCoinCrowdSale is Ownable, Crowdsale {
  /**
   * event for token assignment logging
   * @param beneficiary who got the tokens
   * @param amount amount of tokens assigned
   */
  event TokenAssign(address indexed beneficiary, uint256 amount);

  function HolidayCoinCrowdSale(
    uint256 _startTime,
    uint256 _endTime,
    uint256 _rate,
    address _voteManager,
    address _mintableToken
  ) Crowdsale(_startTime, _endTime, _rate, _voteManager) public {
    require(_mintableToken != address(0));
    token = MintableToken(_mintableToken);
  }

  function assignTokens(address beneficiary, uint256 tokens) public onlyOwner {
    require(beneficiary != address(0));
    require(tokens > 0);
    require(now >= startTime);
    require(now <= endTime);

    token.mint(beneficiary, tokens);
    TokenAssign(beneficiary, tokens);
  }

  function assignTokensAndVote(address beneficiary, uint256 tokens, uint8 charity) public onlyOwner {
    assignTokens(beneficiary, tokens);
    VoteManager(wallet).voteFor(beneficiary, charity);
  }

  function buyAndVote(address beneficiary, uint8 charity) public payable {
    buyTokens(beneficiary);
    VoteManager(wallet).vote(charity);
  }

  function reclaimTokenContract() public onlyOwner {
    token.transferOwnership(msg.sender);
  }
}
