// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the AuditLog contract
  const AuditLog = await hre.ethers.getContractFactory("AuditLog");
  const auditLog = await AuditLog.deploy();
  await auditLog.deployed();

  console.log("AuditLog deployed to:", auditLog.address);

  // Optionally, print the deployer's balance for confirmation
  const balance = await deployer.getBalance();
  console.log("Deployer balance:", hre.ethers.utils.formatEther(balance));
}

// Run the deployment and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});