require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    ganache: {
      url: "http://localhost:7545",
      accounts: [process.env.GANACHE_ACCOUNT],
    },
    alchemy: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/3xdcHkHL1ihm5IMzOxlDS30q452i29qb",
      accounts: [process.env.RINKEBY_ACCOUNT],
    }
  }
};
