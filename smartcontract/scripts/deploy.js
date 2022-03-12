const hre = require("hardhat");

async function main() {

  const IDXExchange = await hre.ethers.getContractFactory("IDXExchange");
  const idxExchange = await IDXExchange.deploy();

  await idxExchange.deployed();

  console.log("Greeter deployed to:", idxExchange.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
