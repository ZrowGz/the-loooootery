// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

/**
 * @notice A Chainlink VRF consumer which uses randomness to mimic the rolling
 * of a 20 sided die
 * @dev This is only an example implementation and not necessarily suitable for mainnet.
 */

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */
 
contract DevilTrainLottery is VRFConsumerBase { // removed , ConfirmedOwner(msg.sender)
    //uint256 private constant ROLL_IN_PROGRESS = 42;

    bytes32 private s_keyHash;
    uint256 private s_fee;
    //mapping(bytes32 => address) private s_rollers;
    //mapping(address => uint256) private s_results;

    event TrainLeaving(bytes32 indexed requestId, address payable[] indexed riders);
    event MeetDestiny(bytes32 indexed requestId, uint256 indexed result);
    event StillBoarding(address indexed rider, string indexed message);

    // our variables
    address payable owner = payable(owner);
    //ddress payable public house;
    uint public ticketPrice;
    uint public price; ///// probably don't need this
    uint public rideId; //////**** Reverted!
    uint8 public maxRiders;
    address payable rider;
    address payable[] public riders;
    //uint public playerValue; /////// what is this
    uint public prizePool;
    bool acceptingRiders;

    mapping (uint => address payable) public rideHistory; ///// Returned 0 address

    /**
     * @notice Constructor inherits VRFConsumerBase
     *
     * @dev NETWORK: RINKEBY
     * @dev   Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
     * @dev   LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * @dev   Key Hash:   0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     * @dev   Fee:        0.1 LINK (100000000000000000)
     *
     * @param vrfCoordinator address of the VRF Coordinator
     * @param link address of the LINK token
     * @param keyHash bytes32 representing the hash of the VRF job
     * @param fee uint256 fee to pay the VRF oracle
     */
    constructor(address vrfCoordinator, address link, bytes32 keyHash, uint256 fee, uint8 _maxRiders, uint _ticketPrice)
        VRFConsumerBase(vrfCoordinator, link)
    {
        s_keyHash = keyHash;
        s_fee = fee;

        address owner = msg.sender;
        //address payable house = _house;
        rideId = 1; /// get rid of dis
        maxRiders = _maxRiders;
        acceptingRiders = true;
        ticketPrice = _ticketPrice; // 0.2 (200000000000000000)
    }


    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }


    // User buys ticket
    function buyTicket() public payable {
        require(msg.value == ticketPrice, "Incorrect ticket price." );
        require(acceptingRiders == true, "Only 5 riders per trip!");

        // Pay house for fuel & track maintenance
        payable(owner).transfer(price / 20);

        // add balance to jackpot
        prizePool += (price / 20 * 19);

        // add passenger to riders
        riders.push(payable(msg.sender));


        // request random number if train is full
        if(riders.length == maxRiders) {
            acceptingRiders = false;            
            //emit TrainLeaving(payable(msg.sender), "Train full! Let's take that ride!");
            getRandomNumber();
        } else{
            emit StillBoarding(msg.sender, "New Passenger! Awaiting moar riders...");
        }
    }

    /**
     * @notice Requests randomness
     * @dev Warning: if the VRF response is delayed, avoid calling requestRandomness repeatedly
     * as that would give miners/VRF operators latitude about which VRF response arrives first.
     * @dev You must review your implementation details with extreme care.
     *
     *
     */

    // change to takeRide
    function getRandomNumber() public returns (bytes32 requestId) { // removed onlyOwner
        require(LINK.balanceOf(address(this)) >= s_fee, "Not enough LINK to pay fee");
        require(acceptingRiders == false, "Train already left fren, catch the next choo choo!");
        //rider = msg.sender;

        owner.transfer(prizePool / 20);
        prizePool -= prizePool / 20;

        requestId = requestRandomness(s_keyHash, s_fee);
        //s_rider[requestId] = rider;
        //s_results[rider] = ROLL_IN_PROGRESS;
        emit TrainLeaving(requestId, riders);
    }

    /**
     * @notice Callback function used by VRF Coordinator to return the random number
     * to this contract.
     * @dev Some action on the contract state should be taken here, like storing the result.
     * @dev WARNING: take care to avoid having multiple VRF requests in flight if their order of arrival would result
     * in contract states with different outcomes. Otherwise miners or the VRF operator would could take advantage
     * by controlling the order.
     * @dev The VRF Coordinator will only send this function verified responses, and the parent VRFConsumerBase
     * contract ensures that this method only receives randomness from the designated VRFCoordinator.
     *
     * @param requestId bytes32
     * @param randomness The random result returned by the oracle
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        // Assign winner and payout funds
        uint index = randomness % riders.length;
        //rideHistory[riders[requestId]] = riders[index];
        //s_results[s_rollers[requestId]] = d20Value;

        // Pay winner

        riders[index].transfer(prizePool);
        prizePool = 0;

        // Record ride
        //rideHistory[rideId] = riders[index];
        //rideId++;

        // Reset the state of the contract
        riders = new address payable[](0);
        acceptingRiders = true;
        emit MeetDestiny(requestId, index);
    }

    /**
     * @notice Set the key hash for the oracle
     *
     * @param keyHash bytes32
     */
    function setKeyHash(bytes32 keyHash) public onlyOwner {
        s_keyHash = keyHash;
    }

    /**
     * @notice Get the current key hash
     *
     * @return bytes32
     */
    function keyHash() public view returns (bytes32) {
        return s_keyHash;
    }

    /**
     * @notice Set the oracle fee for requesting randomness
     *
     * @param fee uint256
     */
    function setFee(uint256 fee) public onlyOwner {
        s_fee = fee;
    }

    /**
     * @notice Get the current fee
     *
     * @return uint256
     */
    function fee() public view returns (uint256) {
        return s_fee;
    }

    // Set & check the maxRiders
    function setMaxRiders(uint8 _maxRiders) public onlyOwner {
        maxRiders = _maxRiders;
    }

   function setTicketPrice(uint _ticketPrice) public onlyOwner {
        ticketPrice = _ticketPrice;
    }

    //fallback() external payable {}

    function withdrawLINK(address to, uint256 value) public onlyOwner {
        require(LINK.transfer(to, value), "Not enough LINK");
    }


    function withdrawAllMoney() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
