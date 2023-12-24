const BorrowerContract = artifacts.require("BorrowerContract");
 
module.exports = async function(deployer) {
    await deployer.deploy(BorrowerContract);
    const instance = await BorrowerContract.deployed();
 
    console.log(`BorrowerContract has been deployed to: ${instance.address}`);
};
