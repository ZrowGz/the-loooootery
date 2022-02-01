// SPDX-License-Identifier: MIT
// version 0.2
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */
 
contract DevilTrainLottery is VRFConsumerBase, ConfirmedOwner(msg.sender) { 

    // Initialize Chainlink variables
    bytes32 private s_keyHash;
    uint256 private s_fee;

    // Define events
    event NewRider(address indexed rider);
    event AwaitingRiders(uint indexed current, uint8 indexed maxriders);
    event TrainFull(address payable[] indexed riders, bytes32 indexed requestId);
    event ResultArrived(uint16 indexed round, address payable indexed winner); //added payable changed riders to winner, added round

    // Initialize contract variables
    address payable house;
    uint public ticketPrice;
    uint8 public maxRiders;
    bool public acceptingRiders;
    address payable[] public riders;

    // Historic Records
    uint16 public tripsTaken;
    uint public ticketSales;
    address payable lastWinner; 


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
    constructor(address vrfCoordinator, address link, bytes32 keyHash, uint256 fee, uint8 _maxRiders, uint _ticketPrice, address payable _house)
        VRFConsumerBase(vrfCoordinator, link)
    {
        s_keyHash = keyHash;
        s_fee = fee;

        house = _house;
        maxRiders = _maxRiders;
        ticketPrice = _ticketPrice; // for example: 0.2 (200000000000000000)
        acceptingRiders = true;
    }


    // User buys ticket
    function buyTicket() public payable {
        require(msg.value == ticketPrice, "Incorrect ticket price" );
        require(acceptingRiders == true, "Wait for next round");

        // Add rider, log ticket sale
        riders.push(payable(msg.sender));
        ticketSales += msg.value;

        emit NewRider(msg.sender);

        // If full, add house, block new riders, log trip, get randomness
        if(riders.length == maxRiders) {
            riders.push(payable(house));
            acceptingRiders = false;     
            tripsTaken += 1;       
            getRandomNumber();
        } else{
            emit AwaitingRiders(riders.length, maxRiders);
        }
    }

    /**
     * @notice Requests randomness
     * @dev Warning: if the VRF response is delayed, avoid calling requestRandomness repeatedly
     * as that would give miners/VRF operators latitude about which VRF response arrives first.
     * @dev You must review your implementation details with extreme care.
     */
    function getRandomNumber() internal returns (bytes32 requestId) { // removed onlyOwner
        require(LINK.balanceOf(address(this)) >= s_fee, "Out of LINK");
        require(acceptingRiders == false, "Awaiting current winner");

        requestId = requestRandomness(s_keyHash, s_fee);
        emit TrainFull(riders, requestId);
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
        // Assign winner
        uint index = randomness % riders.length;
        lastWinner = riders[index];

        // Reset contract
        riders = new address payable[](0);

        // Pay winner
        (bool success, ) = lastWinner.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
        emit ResultArrived(tripsTaken, lastWinner);

        // Allow riders
        acceptingRiders = true;
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
        require(_maxRiders <= 25, "Max must be <= 25");
        maxRiders = _maxRiders;
    }

   function setTicketPrice(uint _ticketPrice) public onlyOwner {
        ticketPrice = _ticketPrice;
    }

    function getRiderCount() public view returns (uint) {
        return riders.length;
    }

    function getRiders() public view returns (address payable[] memory) {
        return riders;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getHouse() public view returns (address payable) {
        return house;
    }

    function setHouse(address payable _newHouse) public onlyOwner {
        house = _newHouse;
    }

    function getWinner() public view returns (address payable) {
        return lastWinner;
    }

    receive() external payable {}

    fallback() external payable {}

    function withdrawLINK(address _to, uint256 _value) public onlyOwner {
        require(LINK.transfer(_to, _value), "Not enough LINK");
    }

    function withdrawAllMoney() public payable onlyOwner {
        (bool success, ) = house.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }


    // Pause Contract
    function setAcceptingRiders(bool _acceptingRiders) public onlyOwner {
        acceptingRiders = _acceptingRiders;
    }

    /*
    * @notice 
    * Emergency return funds to users and reset state. 
    * If this fails, use emergencyReboot.
    */
    function emergencyRefund() public payable onlyOwner { //added payable to these three sends

        // Remove house
        riders.pop;

        // Decrement the counters for failed tripsTaken
        tripsTaken -= 1;
        ticketSales -= ticketPrice * riders.length;

        // Set temporary variables
        uint balance = address(this).balance;
        uint userValue = balance / riders.length;

        // Send funds to all users
        for (uint8 i = 0; i < riders.length; i++) {
        (bool success, ) = riders[i].call{value: userValue}("");
        require(success, "Transfer Failed.");
        }

        // Reset the state of the contract
        riders = new address payable[](0);
        acceptingRiders = true;
    }

    /*
    * @notice
    * Emergency State Wipe! Used when fulfillRandomness fails to reset
    * or for when insufficient gas causes a halting error.
    */
    function emergencyReboot() public payable onlyOwner {

        // Zero contract balance to prevent build up
        (bool success, ) = house.call{value: address(this).balance}("");
        require(success, "Transfer failed.");

        // Decrement the counters for failed tripsTaken
        tripsTaken -= 1;
        ticketSales -= ticketPrice * riders.length;

        // Reset the state of the contract 
        riders = new address payable[](0);
        acceptingRiders = true;
    }
}