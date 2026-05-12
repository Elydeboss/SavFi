// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// We need an interface for the ERC-20 token (USX) to call its transfer functions.
interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract SavingsContract {
    // Stores the address of the USX stablecoin (ERC-20 token)
    address public usxTokenAddress;

    // Mapping to track the balance (deposits) of each user in USX
    mapping(address => uint256) public balances;

    // Events for transparency
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);

    /**
     * @notice The constructor sets the address of the USX stablecoin.
     * @param _usxTokenAddress The address of the USX ERC-20 token on Scroll.
     */
    constructor(address _usxTokenAddress) {
        require(_usxTokenAddress != address(0), "Invalid USX address");
        usxTokenAddress = _usxTokenAddress;
    }

    /**
     * @notice Allows a user to deposit USX into the contract.
     * @param _amount The amount of USX to deposit.
     */
    function deposit(uint256 _amount) external {
        require(_amount > 0, "Deposit amount must be greater than zero");

        // 1. The user must first approve this SavingsContract to spend their USX.
        // 2. We use transferFrom to pull the tokens from the user's wallet to this contract.
        bool success = IERC20(usxTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        require(success, "Token transfer failed (check allowance)");

        // Update the user's balance
        balances[msg.sender] += _amount;

        emit Deposit(msg.sender, _amount);
    }

    /**
     * @notice Allows a user to withdraw their deposited USX.
     * @param _amount The amount of USX to withdraw.
     */
    function withdraw(uint256 _amount) external {
        // Check if the user has enough balance
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        // Decrement the user's balance first (A common security practice: Checks-Effects-Interactions)
        balances[msg.sender] -= _amount;

        // Transfer the USX tokens from the contract to the user
        bool success = IERC20(usxTokenAddress).transfer(
            msg.sender,
            _amount
        );
        require(success, "Token transfer failed");

        emit Withdrawal(msg.sender, _amount);
    }

    /**
     * @notice Simple view function to check a user's balance.
     */
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}