pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/token/MintableToken.sol";

contract VoteManager is Ownable {
  event AdminAdded(address who);
  event CharityAdded(string who);
  event Winner(address first/*, address second, address third*/);

  struct Charity {
    string name;
    address to;
  }

  address token;
  // address[] public admins;
  Charity[] public charities;
  address[] voters;
  mapping(address => bool) votersLookup;
  mapping(address => uint8) votes;
  uint8 public winningCharity;
  bool electedWinner = false;

  //// Modifiers -- Start

  // modifier onlyAdmin() {
  //   bool isAdmin = false;
  //   for (uint8 i = 0; i < admins.length && !isAdmin; i++) {
  //     isAdmin = msg.sender == owner;
  //   }
  //   require(isAdmin);
  //   _;
  // }

  modifier onlyTokenHolder() {
    require(MintableToken(token).balanceOf(msg.sender) > 0);
    _;
  }

  //// Modifiers -- End
  //// Administration -- Start

  // function addAdmin(address admin) public onlyOwner {
  //   admins.push(admin);
  //   AdminAdded(admin);
  // }

  function addCharity(string name, address payto) public onlyOwner {
    charities.push(Charity(name, payto));
    CharityAdded(name);
  }

  //// Administration -- Stop

  function VoteManager(address _mintableToken) public {
    require(_mintableToken != address(0));
    token = _mintableToken;
    charities.push(Charity("Abstain Charity", address(0)));
  }

  function vote(uint8 charity) public onlyTokenHolder {
    require(charity <= charities.length);
    require(charity > 0);
    if (!votersLookup[msg.sender]) {
      votersLookup[msg.sender] = true;
      voters.push(msg.sender);
    }
    votes[msg.sender] = charity;
  }

  function tallyVotes() public onlyOwner {
    require(!electedWinner);

    uint256[] memory charityVotes;
    uint8 charityIndex;
    address voterAddress;
    uint256 winningVoteCount;
    uint8 voterIndex;

    // Accumulate votes per charity.
    for (voterIndex = 0; voterIndex < voters.length; voterIndex++) {
      voterAddress = voters[voterIndex];
      charityIndex = votes[voterAddress];
      charityVotes[charityIndex]++;
    }

    // Find winning charity in map.
    for (charityIndex = 0; charityIndex < charities.length; charityIndex++) {
      if (charityVotes[charityIndex] > winningVoteCount) {
        winningCharity = charityIndex;
      }
    }

    electedWinner = true;
    Winner(winningCharity);
  }
}
