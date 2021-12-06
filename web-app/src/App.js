import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import nfts from './nfts.json';
import NFTCard from './components/NFTCard';
import Seller2 from './artifacts/Seller2.json';
import Web3 from 'web3';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      account: '',
      price: '1'
    }
    this.buy = this.buy.bind(this);
    this.loadContract = this.loadContract.bind(this);
  }

  componentDidMount() { }

  async buy() {
    const { price } = this.state;
    if (!window.ethereum) {
      this.setState({
        error: 'Please install/update Metamask'
      });
      return;
    }
    this.web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    if (accounts.length === 0) {
      alert('Please connect to Metamask');
      return;
    }
    const account = accounts[0];
    const networkId = await this.web3.eth.net.getId();
    if (!this.loadContract(networkId)) {
      alert('Please connect to the correct network');
      return;
    }
    if (!await this.contract.methods.active().call()) {
      alert('Sorry!!! Sold Out');
      return;
    }
    await this.contract.methods.buy().send({ from: account, value: this.web3.utils.toWei(price, 'ether') });
  }

  loadContract(networkId) {
    const { abi, networks } = Seller2;
    const network = networks[networkId];
    if (network) {
      this.contract = new this.web3.eth.Contract(abi, network.address);
      return true;
    }
    return false;
  }

  render() {
    const { error, account, price } = this.state;

    return (
      <div className="App">
        <Navbar account={account} connectWithMetamask={this.connectWithMetamask} />
        <HeroSection buy={this.buy} price={price} />
        <div className="text-3xl shadow-xl border-light-blue-500 border-l-5 p-5" id="bundle">The Bundle NFTs</div>
        <div className="flex flex-wrap">
          {nfts.map((nft, index) => <NFTCard nft={nft} />)}
        </div>
      </div>
    );
  }
}
