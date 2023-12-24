const TransactionContract = artifacts.require("TransactionContract");
 
module.exports = async function(deployer) {
    await deployer.deploy(TransactionContract);
    const instance = await TransactionContract.deployed();
 
    console.log(`Transaction Contract has been deployed to: ${instance.address}`);
};
