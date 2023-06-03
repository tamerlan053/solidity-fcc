const etherss = require("ethers")
const fs = require("fs-extra")

async function main() {
    const provider = new ethers.providers.JsonRpcProviders("http://127.0.0.1:7545")
    const wallet = new ethers.Wallet("0xfc692474151fb5d5034d84a1cef267204cd04778b972b1a2ccfd9235e1e23c95", provider)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
