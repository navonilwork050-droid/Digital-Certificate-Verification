const fs = require("fs");
const path = require("path");

async function main() {
    console.log("Deploying CertificateRegistry...");

    // Read the contract artifact
    const contractPath = path.join(__dirname, "../artifacts/contracts/CertificateRegistry.sol/CertificateRegistry.json");
    if (!fs.existsSync(contractPath)) {
        throw new Error("Contract artifact not found. Run: npx hardhat compile");
    }

    const contractArtifact = JSON.parse(fs.readFileSync(contractPath, "utf8"));

    // Get signers from ethers global (injected by Hardhat)
    const signers = await ethers.getSigners();
    if (signers.length === 0) {
        throw new Error("No signers available. Make sure Hardhat node is running!");
    }

    const deployer = signers[0];
    console.log("Deploying from account:", deployer.address);

    // Deploy contract
    const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry", deployer);
    const contract = await CertificateRegistry.deploy();

    await contract.waitForDeployment();
    const contractAddress = contract.target || contract.address;

    console.log("CertificateRegistry deployed to:", contractAddress);

    // Save contract address and ABI to files for backend use
    const contractInfo = {
        address: contractAddress,
        abi: contractArtifact.abi
    };

    const libDir = path.join(__dirname, "../lib");
    if (!fs.existsSync(libDir)) {
        fs.mkdirSync(libDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(libDir, "contractInfo.json"),
        JSON.stringify(contractInfo, null, 2)
    );

    console.log("Contract info saved to backend/lib/contractInfo.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
