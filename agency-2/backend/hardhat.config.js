require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20", // or "0.8.28" if you want, but pick one
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545" // Ganache default
    }
  }
};