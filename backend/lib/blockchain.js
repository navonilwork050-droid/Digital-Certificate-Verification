import { ethers } from "ethers";
import fs from "fs";
import path from "path";

let contract = null;
let signer = null;

async function initializeContract() {
    if (contract) return contract;

    try {
        // Read contract info from deployed contract - use absolute path
        const contractInfoPath = path.join(process.cwd(), "lib", "contractInfo.json");
        if (!fs.existsSync(contractInfoPath)) {
            throw new Error("Contract not deployed. Run: npx hardhat run scripts/deploy.js --network localhost");
        }

        const contractInfo = JSON.parse(fs.readFileSync(contractInfoPath, "utf8"));
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

        // Get the first pre-funded account from Hardhat node
        // These accounts are automatically created with 10000 ETH when Hardhat node starts
        const accounts = await provider.listAccounts();
        if (!accounts || accounts.length === 0) {
            throw new Error("No accounts available. Make sure Hardhat node is running!");
        }

        // Use the first account (already has 10000 ETH pre-funded)
        signer = accounts[0];
        contract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer);

        console.log("Contract initialized at:", contractInfo.address);
        console.log("Signer address:", await signer.getAddress());
        return contract;
    } catch (error) {
        console.error("Failed to initialize contract:", error.message);
        throw error;
    }
}

async function mintCertificate(studentName, degree, certHash) {
    const cert = await initializeContract();
    const tx = await cert.issueCertificate(studentName, degree, certHash);
    const receipt = await tx.wait();

    return {
        blockNumber: receipt.blockNumber,
        transactionHash: receipt.hash,
        timestamp: Math.floor(Date.now() / 1000),
        certHash
    };
}

async function verifyCertificate(certHash) {
    const cert = await initializeContract();
    const [studentName, degree, issuer, issueDate, exists] = await cert.verifyCertificate(certHash);

    if (!exists) {
        return null;
    }

    return {
        studentName,
        degree,
        issuer,
        issueDate: issueDate.toString(),
        exists,
        certHash
    };
}

export {
    initializeContract,
    mintCertificate,
    verifyCertificate
};
