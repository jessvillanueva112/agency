const { ethers } = require("ethers");
const contractABI = require("../artifacts/contracts/AuditLog.sol/AuditLog.json").abi;
const contractAddress = "0x..."; // Use your deployed address

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const signer = provider.getSigner(0);

const auditLog = new ethers.Contract(contractAddress, contractABI, signer);

async function logAudit(action, details) {
  const tx = await auditLog.log(action, details);
  await tx.wait();
  console.log("Audit event logged:", action, details);
}

module.exports = logAudit;