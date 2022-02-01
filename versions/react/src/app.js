import React, {Component} from 'react';
import Web3 from 'web3'
import Loading from './Loading'
import Navbar from './Navbar'
//import Main from './Main'
import './App.css';


class App extends Component {
    async componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockChainData()
    }
    async loadBlockChainData(){
        const web3 = window.web3
        const networkId = await web3.eth.net.getID()

        if (networkId !==4){
            window.alert('Please switch network to Rinkeby and refresh the page')

        }
        contract_abi = [{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Received","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "id","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "bet","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "randomSeed","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "address","name": "player","type": "address"},{"indexed": false,"internalType": "uint256","name": "winAmount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "randomResult","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "time","type": "uint256"}],"name": "Result","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "admin","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Withdraw","type": "event"},{"inputs": [{"internalType": "uint256","name": "bet","type": "uint256"},{"internalType": "uint256","name": "seed","type": "uint256"}],"name": "game","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "bytes32","name": "requestId","type": "bytes32"},{"internalType": "uint256","name": "randomness","type": "uint256"}],"name": "rawFulfillRandomness","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes32","name": "_keyHash","type": "bytes32"},{"internalType": "uint256","name": "_fee","type": "uint256"},{"internalType": "uint256","name": "_seed","type": "uint256"}],"name": "requestRandomness","outputs": [{"internalType": "bytes32","name": "requestId","type": "bytes32"}],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"},{"inputs": [{"internalType": "uint256","name": "random","type": "uint256"}],"name": "verdict","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "withdrawEther","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "withdrawLink","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "ethInUsd","outputs": [{"internalType": "int256","name": "","type": "int256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "gameId","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "games","outputs": [{"internalType": "uint256","name": "id","type": "uint256"},{"internalType": "uint256","name": "bet","type": "uint256"},{"internalType": "uint256","name": "seed","type": "uint256"},{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "address payable","name": "player","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "lastGameId","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "bytes32","name": "","type": "bytes32"}],"name": "nonces","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "randomResult","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "weiInUsd","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"}]}]
        contract_address = '0x68b50434118e7839c6ce0f8054a50f9ad9b9d134' //rinkeby
        contract = new Web3.eth.Contract(contract_abi, contract_address);
        accounts = await Web3.eth.getAccounts()
        //ticketPrice = await this.contract.methods.weiInUsd().call()
        //Update the data when user initially connect
        if (typeof accounts[0]!=='undefined' && accounts[0]!==null) {
          //balance = await Web3.eth.getBalance(accounts[0])
          // = await Web3.eth.getBalance(contract_address)
          ticketPrice = await contract.methods.ticketPrice().call()
          this.setState({account: accounts[0], ticketPrice: ticketPrice})
        }
  
        this.setState({
          contract: contract,
          contractAddress: contract_address
        })
  
        //Update account&balance when user change the account
        window.ethereum.on('accountsChanged', async (accounts) => {
          if(typeof accounts[0] !== 'undefined'  && accounts[0]!==null){
           // balance = await Web3.eth.getBalance(accounts[0])
           // maxBet = await Web3.eth.getBalance(contract_address)
            ticketPrice = await contract.methods.ticketPrice().call()
            
            this.setState({account: accounts[0], ticketPrice: ticketPrice})
          } else {
            this.setState({account: null, balance: 0})
          }
        });
  
        //Update data when user switch the network
        window.ethereum.on('chainChanged', async (chainId) => {
          network = parseInt(chainId, 16)
          if(network!==4){
            this.setState({wrongNetwork: true})
          } else {
            if(this.state.account){
             // balance = await this.state.web3.eth.getBalance(this.state.account)
              //maxBet = await this.state.web3.eth.getBalance(this.state.contractAddress)
              ticketPrice = await this.state.contract.methods.ticketPrice().call()
              
              this.setState({ ticketPrice: ticketPrice })
            }
            this.setState({ network: network, loading: false, onlyNetwork: false, wrongNetwork: false})
          }
        });
      }
    }
        async buyTicket() {
          
          const networkId = await this.state.web3.eth.net.getId() 
          if(networkId!==4) {
            this.setState({wrongNetwork: true})
          } else if(typeof this.state.account !=='undefined' && this.state.account !==null){
            ticketPrice = await this.contract.methods.ticketPrice().call()
      
            //Send bet to the contract and wait for the verdict
            
            this.state.contract.methods.buyTicket().send({from: this.state.account, value: ticketPrice}).on('transactionHash', (hash) => {
              this.setState({ loading: true })
              this.state.contract.events.ResultArrived({}, async (error, event) => {
                const winner = event.returnValues.lastWinner
                if(winner === this.state.account) {
                  window.alert('WINNER!')
                } else {
                  window.alert('rolled :(')
                }
      
                //Prevent error when user logout, while waiting for the verdict
                if(this.state.account!==null && typeof this.state.account!=='undefined'){
                  //const balance = await this.state.web3.eth.getBalance(this.state.account)
                  //const maxBet = await this.state.web3.eth.getBalance(this.state.contractAddress)
                  //this.setState({ balance: balance, maxBet: maxBet })
                }
                this.setState({ loading: false })
              })
            }).on('error', (error) => {
              window.alert('Error, Please do not jump off the train')
            })
          } else {
            window.alert('Problem with account or network')
          }
        }
      
        //onChange(value) {
         // this.setState({'amount': value});
        //}
      
        constructor(props) {
          super(props)
          this.state = {
            account: null,
            //amount: null,
            //balance: null,
            contract: null,
            event: null,
            loading: false,
            network: null,
            //maxBet: 0,
            ticketPrice: 0,
            web3: null,
            wrongNetwork: false,
            contractAddress: null
          }
      
          this.buyTicket = this.buyTicket.bind(this)
          this.setState = this.setState.bind(this)
          //this.onChange = this.onChange.bind(this)
        }
      
        render() {
          return (
            <div>
              <Navbar account={this.state.account}/>&nbsp;
              {this.state.wrongNetwork
                ? <div className="container-fluid mt-5 text-monospace text-center mr-auto ml-auto">
                    <div className="content mr-auto ml-auto">
                      <h1>Please Enter Rinkeby Network</h1>
                    </div>
                  </div>
                : this.state.loading 
                    ? <Loading
                        //balance={this.state.balance}
                        //maxBet={this.state.maxBet}
                        ticketPrice={this.state.ticketPrice}
                        web3={this.state.web3}
                      />
                     //: <Main
                        //amount={this.state.amount}
                        //balance={this.state.balance}
                        //buyTicket={this.buyTicket}
                        //onChange={this.onChange}
                        //maxBet={this.state.maxBet}
                        //ticketPrice={this.state.ticketPrice}
                        //loading={this.state.loading}
                        //web3={this.state.web3}
                      ///>
              }
            </div>
          );
        }
      }
      
      export default App;