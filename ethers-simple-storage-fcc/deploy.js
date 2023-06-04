const ethers = require("ethers")
const fs = require("fs-extra")

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
    const wallet = new ethers.Wallet("0x66db414d0f982b47a5c56f4921154abd8c29ce74b75eba4b452fbc5caf636fa2", provider);
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying the contract, please wait...");
    const contract = await contractFactory.deploy();
    console.log(contract);
    const transactionReceipt = await contract.deployTransaction.wait(1);
    console.log("Here is the deployment transacation (transaction response): ")
    console.log(contract.deployTransaction)
    console.log("Here is the transaction receipt")
    console.log(transactionReceipt)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
