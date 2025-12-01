  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// Interface for Aave V3 Pool (for yield generation)
interface IPool {
    function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
}

// Interface for Chainlink Price Feed (for USD conversion)
interface AggregatorV3Interface {
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
    function decimals() external view returns (uint8);
}

/**
 * @title SaveFi
 * @dev Advanced decentralized savings platform with multi-tier plans and revenue generation
 * @notice Features: 4 savings plans, automated yield farming, token swaps, fixed + percentage withdrawal fees
 */
contract SaveFi is ReentrancyGuard, Ownable {
    using SafeMath for uint256;

    // ============ ENUMS & STRUCTS ============

    /// @notice Available savings plan types
    enum SavingPlan { SwiftFi, FlexFi, GrowFi, VaultFi }

    /// @notice Configuration for each savings plan
    struct PlanConfig {
        uint256 duration;              // Lock period in seconds
        uint256 apy;                   // Annual Percentage Yield (basis points)
        uint256 earlyWithdrawalFee;    // Early withdrawal penalty (basis points)
        bool canWithdrawEarly;         // Whether early withdrawal is allowed
    }

    /// @notice Individual user deposit record
    struct Deposit {
        uint256 amount;          // Deposited amount
        uint256 depositTime;     // Timestamp of deposit
        uint256 unlockTime;      // When funds unlock
        SavingPlan plan;         // Savings plan type
        address token;           // Token address
        bool active;             // Active status
    }

    /// @notice Token swap pair configuration
    struct SwapConfig {
        address tokenA;          // First token
        address tokenB;          // Second token
        uint256 rateAtoB;        // Exchange rate A→B (scaled by 1e18)
        uint256 rateBtoA;        // Exchange rate B→A (scaled by 1e18)
        bool active;             // Active status
    }

    /// @notice Protocol revenue tracking metrics
    struct RevenueMetrics {
        uint256 totalSwapFees;              // Swap fees collected
        uint256 totalEarlyWithdrawalFees;   // Early withdrawal penalties
        uint256 totalWithdrawalFees;        // Percentage-based withdrawal fees
        uint256 totalFixedWithdrawalFees;   // Fixed $0.8 withdrawal fees
        uint256 totalYieldEarned;           // Yield from external protocols
        uint256 totalInterestPaid;          // Interest paid to users
        uint256 protocolRevenue;            // Total net revenue
    }

    // ============ STATE VARIABLES ============

    /// @notice Savings plan configurations
    mapping(SavingPlan => PlanConfig) public planConfigs;
    
    /// @notice User deposits: user => depositId => Deposit
    mapping(address => mapping(uint256 => Deposit)) public userDeposits;
    
    /// @notice Deposit count per user
    mapping(address => uint256) public depositCount;
    
    /// @notice Swap pair configurations
    mapping(bytes32 => SwapConfig) public swapPairs;
    
    /// @notice Chainlink price feeds: token => price feed
    mapping(address => AggregatorV3Interface) public priceFeeds;

    /// @notice Stablecoin addresses
    address public immutable USDT;
    address public immutable USDC;

    /// @notice VaultFi reserve tracking
    uint256 public vaultReserve;
    
    /// @notice Total value locked
    uint256 public totalValueLocked;
    
    /// @notice Revenue metrics
    RevenueMetrics public revenueMetrics;

    /// @notice Fee structure (in basis points, 10000 = 100%)
    uint256 public swapFee = 30;                    // 0.3% swap fee
    uint256 public performanceFee = 1000;           // 10% of yield
    uint256 public withdrawalFeeBP = 20;            // 0.20% withdrawal fee
    uint256 public fixedWithdrawalFeeUSD = 800000000000000000; // $0.8 in wei (18 decimals)

    /// @notice External DeFi protocol integration
    IPool public aavePool;
    bool public yieldEnabled;

    /// @notice Constants
    uint256 public constant BASIS_POINTS = 10000;
    uint256 public constant SECONDS_PER_YEAR = 365 days;

    // ============ EVENTS ============

    event DepositMade(
        address indexed user,
        uint256 indexed depositId,
        SavingPlan plan,
        uint256 amount,
        address token
    );

    event WithdrawalMade(
        address indexed user,
        uint256 indexed depositId,
        uint256 amount,
        uint256 interest,
        bool earlyWithdrawal,
        uint256 percentageFee,
        uint256 fixedFeeUSD
    );

    event SwapExecuted(
        address indexed user,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        uint256 fee
    );

    event VaultReserveWithdrawn(address indexed owner, uint256 amount);
    event YieldDeposited(address token, uint256 amount);
    event YieldWithdrawn(address token, uint256 amount, uint256 yield);
    event RevenueCollected(uint256 swapFees, uint256 withdrawalFees, uint256 performanceFees);
    event PriceFeedUpdated(address indexed token, address indexed priceFeed);
    event FixedWithdrawalFeeUpdated(uint256 oldFee, uint256 newFee);

    // ============ CONSTRUCTOR ============

    /**
     * @notice Initialize SaveFi contract
     * @param _usdt USDT token address
     * @param _usdc USDC token address
     * @param _aavePool Aave lending pool address
     */
    constructor(address _usdt, address _usdc, address _aavePool) Ownable(msg.sender) {
        require(_usdt != address(0) && _usdc != address(0), "SaveFi: Invalid token addresses");
        USDT = _usdt;
        USDC = _usdc;
        aavePool = IPool(_aavePool);

        // Initialize SwiftFi - Flexible, no lock, no interest
        planConfigs[SavingPlan.SwiftFi] = PlanConfig({
            duration: 0,
            apy: 0,
            earlyWithdrawalFee: 0,
            canWithdrawEarly: true
        });

        // Initialize FlexFi - 3 months, 2% APY, 5% early withdrawal penalty
        planConfigs[SavingPlan.FlexFi] = PlanConfig({
            duration: 90 days,
            apy: 200,
            earlyWithdrawalFee: 500,
            canWithdrawEarly: true
        });

        // Initialize GrowFi - 6 months, 4% APY, 10% early withdrawal penalty
        planConfigs[SavingPlan.GrowFi] = PlanConfig({
            duration: 180 days,
            apy: 400,
            earlyWithdrawalFee: 1000,
            canWithdrawEarly: true
        });

        // Initialize VaultFi - 1 year, 8% APY, no early withdrawal
        planConfigs[SavingPlan.VaultFi] = PlanConfig({
            duration: 365 days,
            apy: 800,
            earlyWithdrawalFee: 0,
            canWithdrawEarly: false
        });
    }

    // ============ DEPOSIT FUNCTIONS ============

    /**
     * @notice Deposit funds into a savings plan
     * @param _plan Savings plan type
     * @param _amount Amount to deposit
     * @param _token Token address
     */
    function deposit(
        SavingPlan _plan,
        uint256 _amount,
        address _token
    ) external nonReentrant {
        require(_amount > 0, "SaveFi: Amount must be greater than 0");

        // VaultFi only accepts stablecoins
        if (_plan == SavingPlan.VaultFi) {
            require(
                _token == USDT || _token == USDC,
                "SaveFi: VaultFi only accepts USDT or USDC"
            );
        }

        PlanConfig memory config = planConfigs[_plan];

        // Transfer tokens from user
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        // Create deposit record
        uint256 depositId = depositCount[msg.sender];
        userDeposits[msg.sender][depositId] = Deposit({
            amount: _amount,
            depositTime: block.timestamp,
            unlockTime: block.timestamp + config.duration,
            plan: _plan,
            token: _token,
            active: true
        });

        depositCount[msg.sender]++;
        totalValueLocked = totalValueLocked.add(_amount);

        // Handle VaultFi deposits
        if (_plan == SavingPlan.VaultFi) {
            vaultReserve = vaultReserve.add(_amount);

            // Deploy to Aave for yield if enabled
            if (yieldEnabled) {
                _deployToYieldProtocol(_token, _amount);
            }
        }

        emit DepositMade(msg.sender, depositId, _plan, _amount, _token);
    }

    // ============ WITHDRAWAL FUNCTIONS ============

    /**
     * @notice Withdraw funds with automatic fee deductions (percentage + fixed $0.8)
     * @dev Applies three types of fees: early withdrawal penalty, percentage fee, and fixed USD fee
     * @param _depositId ID of the deposit to withdraw
     */
    function withdraw(uint256 _depositId) external nonReentrant {
        Deposit storage userDeposit = userDeposits[msg.sender][_depositId];
        require(userDeposit.active, "SaveFi: Deposit not active");

        PlanConfig memory config = planConfigs[userDeposit.plan];
        bool isEarlyWithdrawal = block.timestamp < userDeposit.unlockTime;

        // Check early withdrawal eligibility
        if (isEarlyWithdrawal) {
            require(
                config.canWithdrawEarly,
                "SaveFi: Early withdrawal not allowed for this plan"
            );
        }

        // Calculate interest earned
        uint256 interest = calculateInterest(userDeposit);
        uint256 totalAmount = userDeposit.amount.add(interest);

        // ========== FEE CALCULATION STEP 1: Early Withdrawal Penalty ==========
        uint256 earlyFee = 0;
        if (isEarlyWithdrawal && config.earlyWithdrawalFee > 0) {
            earlyFee = totalAmount.mul(config.earlyWithdrawalFee).div(BASIS_POINTS);
            totalAmount = totalAmount.sub(earlyFee);

            // Track early withdrawal penalty revenue
            revenueMetrics.totalEarlyWithdrawalFees = revenueMetrics.totalEarlyWithdrawalFees.add(earlyFee);
            revenueMetrics.protocolRevenue = revenueMetrics.protocolRevenue.add(earlyFee);
        }

        // ========== FEE CALCULATION STEP 2: Percentage-Based Withdrawal Fee ==========
        uint256 percentageFee = 0;
        if (withdrawalFeeBP > 0) {
            percentageFee = totalAmount.mul(withdrawalFeeBP).div(BASIS_POINTS);
            totalAmount = totalAmount.sub(percentageFee);

            // Track percentage withdrawal fee revenue
            revenueMetrics.totalWithdrawalFees = revenueMetrics.totalWithdrawalFees.add(percentageFee);
            revenueMetrics.protocolRevenue = revenueMetrics.protocolRevenue.add(percentageFee);
        }

        // ========== FEE CALCULATION STEP 3: Fixed $0.8 USD Fee ==========
        uint256 fixedFeeInToken = _calculateFixedFeeInToken(userDeposit.token);
        require(
            totalAmount > fixedFeeInToken,
            "SaveFi: Insufficient amount to cover fixed withdrawal fee"
        );

        totalAmount = totalAmount.sub(fixedFeeInToken);

        // Track fixed withdrawal fee revenue
        revenueMetrics.totalFixedWithdrawalFees = revenueMetrics.totalFixedWithdrawalFees.add(fixedFeeInToken);
        revenueMetrics.protocolRevenue = revenueMetrics.protocolRevenue.add(fixedFeeInToken);

        // Track interest paid to user
        revenueMetrics.totalInterestPaid = revenueMetrics.totalInterestPaid.add(interest);

        // ========== Handle VaultFi Withdrawal ==========
        if (userDeposit.plan == SavingPlan.VaultFi) {
            vaultReserve = vaultReserve.sub(userDeposit.amount);

            if (yieldEnabled) {
                // Withdraw principal + interest from Aave (before fees)
                uint256 withdrawAmount = userDeposit.amount.add(interest);
                _withdrawFromYieldProtocol(userDeposit.token, withdrawAmount);
            }
        }

        // Update state
        totalValueLocked = totalValueLocked.sub(userDeposit.amount);
        userDeposit.active = false;

        // Transfer final amount to user (after all fees)
        IERC20(userDeposit.token).transfer(msg.sender, totalAmount);

        emit WithdrawalMade(
            msg.sender,
            _depositId,
            userDeposit.amount,
            interest,
            isEarlyWithdrawal,
            percentageFee,
            fixedFeeInToken
        );

        // Emit revenue collection summary
        emit RevenueCollected(
            revenueMetrics.totalSwapFees,
            revenueMetrics.totalEarlyWithdrawalFees.add(revenueMetrics.totalWithdrawalFees).add(revenueMetrics.totalFixedWithdrawalFees),
            0
        );
    }

    /**
     * @notice Calculate $0.8 fixed fee in token units using price feed
     * @dev Uses Chainlink oracle if available, otherwise assumes 1:1 for stablecoins
     * @param _token Token address
     * @return Fee amount in token units
     */
    function _calculateFixedFeeInToken(address _token) internal view returns (uint256) {
        // If no price feed set, assume 1:1 with USD (for stablecoins)
        if (address(priceFeeds[_token]) == address(0)) {
            // $0.8 with 18 decimals = 800000000000000000 wei
            return fixedWithdrawalFeeUSD;
        }

        // Get token price from Chainlink price feed
        (, int256 price, , , ) = priceFeeds[_token].latestRoundData();
        require(price > 0, "SaveFi: Invalid price from feed");

        uint8 feedDecimals = priceFeeds[_token].decimals();
        uint256 tokenPrice = uint256(price);

        // Calculate: $0.8 / tokenPrice = fee in tokens
        // fixedWithdrawalFeeUSD has 18 decimals
        // tokenPrice has feedDecimals (usually 8 for Chainlink)
        uint256 feeInToken = fixedWithdrawalFeeUSD.mul(10**feedDecimals).div(tokenPrice);

        return feeInToken;
    }

    // ============ INTEREST CALCULATION ============

    /**
     * @notice Calculate interest earned on a deposit
     * @param _deposit Deposit struct
     * @return Interest amount
     */
    function calculateInterest(Deposit memory _deposit) public view returns (uint256) {
        PlanConfig memory config = planConfigs[_deposit.plan];

        if (config.apy == 0) {
            return 0;
        }

        uint256 timeElapsed = block.timestamp > _deposit.unlockTime
            ? config.duration
            : block.timestamp.sub(_deposit.depositTime);

        // Interest = (principal × APY × time) / (BASIS_POINTS × SECONDS_PER_YEAR)
        uint256 interest = _deposit.amount
            .mul(config.apy)
            .mul(timeElapsed)
            .div(BASIS_POINTS)
            .div(SECONDS_PER_YEAR);

        return interest;
    }

    // ============ SWAP FUNCTIONS ============

    /**
     * @notice Execute token swap with fee
     * @param _tokenIn Input token
     * @param _tokenOut Output token
     * @param _amountIn Input amount
     */
    function swap(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn
    ) external nonReentrant {
        require(_amountIn > 0, "SaveFi: Amount must be greater than 0");

        bytes32 pairId = keccak256(abi.encodePacked(_tokenIn, _tokenOut));
        SwapConfig memory config = swapPairs[pairId];

        require(config.active, "SaveFi: Swap pair not active");
        require(config.tokenA == _tokenIn && config.tokenB == _tokenOut, "SaveFi: Invalid token pair");

        // Calculate swap fee
        uint256 fee = _amountIn.mul(swapFee).div(BASIS_POINTS);
        uint256 amountAfterFee = _amountIn.sub(fee);

        // Calculate output amount
        uint256 amountOut = amountAfterFee.mul(config.rateAtoB).div(1e18);

        // Track swap fee revenue
        revenueMetrics.totalSwapFees = revenueMetrics.totalSwapFees.add(fee);
        revenueMetrics.protocolRevenue = revenueMetrics.protocolRevenue.add(fee);

        // Execute transfer
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenOut).transfer(msg.sender, amountOut);

        emit SwapExecuted(msg.sender, _tokenIn, _tokenOut, _amountIn, amountOut, fee);
    }

    /**
     * @notice Convert tokens (alternative interface)
     * @param _tokenIn Input token
     * @param _tokenOut Output token
     * @param _amountIn Input amount
     */
    function convert(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn
    ) external nonReentrant {
        require(_amountIn > 0, "SaveFi: Amount must be greater than 0");

        bytes32 pairId = keccak256(abi.encodePacked(_tokenIn, _tokenOut));
        SwapConfig memory config = swapPairs[pairId];

        require(config.active, "SaveFi: Conversion pair not active");

        uint256 fee = _amountIn.mul(swapFee).div(BASIS_POINTS);
        uint256 amountAfterFee = _amountIn.sub(fee);
        uint256 amountOut = amountAfterFee.mul(config.rateAtoB).div(1e18);

        revenueMetrics.totalSwapFees = revenueMetrics.totalSwapFees.add(fee);
        revenueMetrics.protocolRevenue = revenueMetrics.protocolRevenue.add(fee);

        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenOut).transfer(msg.sender, amountOut);

        emit SwapExecuted(msg.sender, _tokenIn, _tokenOut, _amountIn, amountOut, fee);
    }

    // ============ YIELD FARMING FUNCTIONS ============

    /**
     * @notice Deploy funds to Aave for yield generation
     * @param _token Token address
     * @param _amount Amount to deploy
     */
    function _deployToYieldProtocol(address _token, uint256 _amount) internal {
        IERC20(_token).approve(address(aavePool), _amount);
        aavePool.supply(_token, _amount, address(this), 0);
        emit YieldDeposited(_token, _amount);
    }

    /**
     * @notice Withdraw funds from Aave
     * @param _token Token address
     * @param _amount Amount to withdraw
     */
    function _withdrawFromYieldProtocol(address _token, uint256 _amount) internal {
        uint256 withdrawn = aavePool.withdraw(_token, _amount, address(this));
        emit YieldWithdrawn(_token, _amount, withdrawn);
    }

    /**
     * @notice Harvest yield and collect performance fee
     * @param _token Token to harvest from
     */
    function harvestYield(address _token) external onlyOwner {
        uint256 currentBalance = IERC20(_token).balanceOf(address(this));
        uint256 yieldEarned = currentBalance > vaultReserve ? currentBalance.sub(vaultReserve) : 0;

        if (yieldEarned > 0) {
            uint256 protocolFee = yieldEarned.mul(performanceFee).div(BASIS_POINTS);

            revenueMetrics.totalYieldEarned = revenueMetrics.totalYieldEarned.add(yieldEarned);
            revenueMetrics.protocolRevenue = revenueMetrics.protocolRevenue.add(protocolFee);

            emit RevenueCollected(0, 0, protocolFee);
        }
    }

    // ============ OWNER FUNCTIONS ============

    /**
     * @notice Setup swap pair
     * @param _tokenA First token
     * @param _tokenB Second token
     * @param _rateAtoB Rate A to B
     * @param _rateBtoA Rate B to A
     */
    function setupSwapPair(
        address _tokenA,
        address _tokenB,
        uint256 _rateAtoB,
        uint256 _rateBtoA
    ) external onlyOwner {
        bytes32 pairId = keccak256(abi.encodePacked(_tokenA, _tokenB));

        swapPairs[pairId] = SwapConfig({
            tokenA: _tokenA,
            tokenB: _tokenB,
            rateAtoB: _rateAtoB,
            rateBtoA: _rateBtoA,
            active: true
        });
    }

    /**
     * @notice Set Chainlink price feed for token
     * @param _token Token address
     * @param _priceFeed Price feed address
     */
    function setPriceFeed(address _token, address _priceFeed) external onlyOwner {
        require(_token != address(0), "SaveFi: Invalid token");
        require(_priceFeed != address(0), "SaveFi: Invalid price feed");

        priceFeeds[_token] = AggregatorV3Interface(_priceFeed);
        emit PriceFeedUpdated(_token, _priceFeed);
    }

    /**
     * @notice Update fixed withdrawal fee in USD
     * @param _newFee New fee (18 decimals)
     */
    function setFixedWithdrawalFeeUSD(uint256 _newFee) external onlyOwner {
        require(_newFee <= 10 * 1e18, "SaveFi: Fee too high (max $10)");

        uint256 oldFee = fixedWithdrawalFeeUSD;
        fixedWithdrawalFeeUSD = _newFee;

        emit FixedWithdrawalFeeUpdated(oldFee, _newFee);
    }

    /**
     * @notice Set percentage-based withdrawal fee
     * @param _bp Basis points (max 500 = 5%)
     */
    function setWithdrawalFeeBP(uint256 _bp) external onlyOwner {
        require(_bp <= 500, "SaveFi: Fee too high");
        withdrawalFeeBP = _bp;
    }

    /**
     * @notice Withdraw protocol revenue
     * @param _amount Amount to withdraw
     */
    function withdrawVaultReserve(uint256 _amount) external onlyOwner {
        require(_amount <= revenueMetrics.protocolRevenue, "SaveFi: Cannot withdraw user funds");

        revenueMetrics.protocolRevenue = revenueMetrics.protocolRevenue.sub(_amount);
        IERC20(USDT).transfer(owner(), _amount);

        emit VaultReserveWithdrawn(owner(), _amount);
    }

    /**
     * @notice Toggle yield farming
     * @param _enabled Enable/disable
     */
    function setYieldEnabled(bool _enabled) external onlyOwner {
        yieldEnabled = _enabled;
    }

    /**
     * @notice Update swap fee
     * @param _newFee New fee in basis points
     */
    function setSwapFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 500, "SaveFi: Fee too high");
        swapFee = _newFee;
    }

    /**
     * @notice Update performance fee
     * @param _newFee New fee in basis points
     */
    function setPerformanceFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 2000, "SaveFi: Fee too high");
        performanceFee = _newFee;
    }

    /**
     * @notice Update plan configuration
     */
    function updatePlanConfig(
        SavingPlan _plan,
        uint256 _duration,
        uint256 _apy,
        uint256 _earlyWithdrawalFee,
        bool _canWithdrawEarly
    ) external onlyOwner {
        planConfigs[_plan] = PlanConfig({
            duration: _duration,
            apy: _apy,
            earlyWithdrawalFee: _earlyWithdrawalFee,
            canWithdrawEarly: _canWithdrawEarly
        });
    }

    /**
     * @notice Emergency withdraw
     * @param _token Token to withdraw
     * @param _amount Amount to withdraw
     */
    function emergencyWithdraw(address _token, uint256 _amount) external onlyOwner {
        IERC20(_token).transfer(owner(), _amount);
    }

    // ============ VIEW FUNCTIONS ============

    /**
     * @notice Get all user deposits
     * @param _user User address
     * @return Array of deposits
     */
    function getUserDeposits(address _user) external view returns (Deposit[] memory) {
        uint256 count = depositCount[_user];
        Deposit[] memory depositsArr = new Deposit[](count);

        for (uint256 i = 0; i < count; i++) {
            depositsArr[i] = userDeposits[_user][i];
        }

        return depositsArr;
    }

    /**
     * @notice Get plan configuration
     * @param _plan Plan type
     * @return Plan config
     */
    function getPlanConfig(SavingPlan _plan) external view returns (PlanConfig memory) {
        return planConfigs[_plan];
    }

    /**
     * @notice Get revenue metrics
     * @return Revenue metrics
     */
    function getRevenueMetrics() external view returns (RevenueMetrics memory) {
        return revenueMetrics;
    }

    /**
     * @notice Calculate withdrawal fee for token
     * @param _token Token address
     * @return Fee in token units
     */
    function getWithdrawalFeeInToken(address _token) external view returns (uint256) {
        return _calculateFixedFeeInToken(_token);
    }

    /**
     * @notice Get fixed withdrawal fee in USD
     * @return Fee amount (18 decimals)
     */
    function getFixedWithdrawalFeeUSD() external view returns (uint256) {
        return fixedWithdrawalFeeUSD;
    }

    // ============ FALLBACK FUNCTIONS ============

    /// @notice Reject direct ETH transfers
    receive() external payable {
        revert("SaveFi: ETH not supported");
    }

    /// @notice Reject invalid calls
    fallback() external payable {
        revert("SaveFi: Invalid call");
    }
}
