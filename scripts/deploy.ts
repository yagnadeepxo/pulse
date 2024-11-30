// deploy.ts
import { ethers } from "hardhat";

async function main() {
  const usdeTokenAddress = "0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE";

  // Get the PaymentHandler contract factory
  const PaymentHandler = await ethers.getContractFactory("PaymentHandler");

  // Deploy the contract, passing the usdeTokenAddress to the constructor
  const paymentHandler = await PaymentHandler.deploy(usdeTokenAddress);

  await paymentHandler.deployed();

  console.log("PaymentHandler deployed to:", paymentHandler.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});