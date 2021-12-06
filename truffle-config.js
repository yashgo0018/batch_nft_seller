require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY_RPC_URL),
      network_id: 4
    },
    development: {
       host: "127.0.0.1",     // Localhost (default: none)
       port: 8545,            // Standard Ethereum port (default: none)
       network_id: "*",       // Any network (default: none)
      },
  },
  mocha: {},
  contracts_build_directory: "./web-app/src/artifacts",
  compilers: {
    solc: {
      version: "0.8.9",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        }
      }
    }
  },
};
