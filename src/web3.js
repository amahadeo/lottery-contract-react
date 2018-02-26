import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider); // taking provider from injected metamask outdated web3

export default web3;
