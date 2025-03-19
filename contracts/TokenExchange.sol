// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenExchange is Ownable {
    // The two tokens to be exchanged
    IERC20 public token1;
    IERC20 public token2;
    
    // Exchange rate represented as a ratio: token1Amount / token2Amount
    // For example, if 1 token1 = 2 token2, then numerator = 1, denominator = 2
    uint256 public rateNumerator;
    uint256 public rateDenominator;
    
    // Fixed-precision factor for calculations (18 decimals)
    uint256 constant PRECISION = 1e18;
    
    // Event emitted when a swap occurs
    event TokenSwap(
        address indexed user,
        address indexed fromToken,
        address indexed toToken,
        uint256 fromAmount,
        uint256 toAmount
    );
    
    // Event emitted when exchange rate is updated
    event RateUpdated(
        uint256 newNumerator,
        uint256 newDenominator
    );
    
    constructor(
        address _token1Address,
        address _token2Address,
        uint256 _rateNumerator,
        uint256 _rateDenominator
    ) Ownable(msg.sender) {
        require(_token1Address != address(0), "Token1 address cannot be zero");
        require(_token2Address != address(0), "Token2 address cannot be zero");
        require(_rateNumerator > 0, "Rate numerator must be positive");
        require(_rateDenominator > 0, "Rate denominator must be positive");
        
        token1 = IERC20(_token1Address);
        token2 = IERC20(_token2Address);
        rateNumerator = _rateNumerator;
        rateDenominator = _rateDenominator;
    }
    
    // Function to update the exchange rate (only owner)
    function updateExchangeRate(uint256 _newNumerator, uint256 _newDenominator) external onlyOwner {
        require(_newNumerator > 0, "New numerator must be positive");
        require(_newDenominator > 0, "New denominator must be positive");
        
        rateNumerator = _newNumerator;
        rateDenominator = _newDenominator;
        
        emit RateUpdated(_newNumerator, _newDenominator);
    }
    
    // Exchange token1 for token2
    function exchangeToken1ForToken2(uint256 token1Amount) public returns (uint256) {
        require(token1Amount > 0, "Amount must be positive");
        
        // Calculate the amount of token2 to be received
        // Using fixed-precision arithmetic to avoid loss of precision
        uint256 token2Amount;
        
        unchecked {
            // Safe because we're dividing afterward to prevent overflow
            uint256 scaledAmount = token1Amount * rateDenominator;
            token2Amount = scaledAmount / rateNumerator;
        }
        
        // Transfer token1 from sender to this contract
        require(token1.transferFrom(msg.sender, address(this), token1Amount), "Token1 transfer failed");
        
        // Transfer token2 from this contract to sender
        require(token2.transfer(msg.sender, token2Amount), "Token2 transfer failed");
        
        emit TokenSwap(msg.sender, address(token1), address(token2), token1Amount, token2Amount);
        
        return token2Amount;
    }
    
    // Exchange token2 for token1
    function exchangeToken2ForToken1(uint256 token2Amount) public returns (uint256) {
        require(token2Amount > 0, "Amount must be positive");
        
        // Calculate the amount of token1 to be received
        // Using fixed-precision arithmetic to avoid loss of precision
        uint256 token1Amount;
        
        unchecked {
            // Safe because we're dividing afterward to prevent overflow
            uint256 scaledAmount = token2Amount * rateNumerator;
            token1Amount = scaledAmount / rateDenominator;
        }
        
        // Transfer token2 from sender to this contract
        require(token2.transferFrom(msg.sender, address(this), token2Amount), "Token2 transfer failed");
        
        // Transfer token1 from this contract to sender
        require(token1.transfer(msg.sender, token1Amount), "Token1 transfer failed");
        
        emit TokenSwap(msg.sender, address(token2), address(token1), token2Amount, token1Amount);
        
        return token1Amount;
    }
    
    // Function to implement the required exchange function signature
    function exchange(uint256 asset1) external returns (uint256) {
        // This is just a wrapper for exchangeToken1ForToken2
        return exchangeToken1ForToken2(asset1);
    }
    
    // Allow the owner to withdraw tokens in case of emergency
    function withdrawToken(address tokenAddress, uint256 amount) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        require(token.transfer(owner(), amount), "Transfer failed");
    }
}
