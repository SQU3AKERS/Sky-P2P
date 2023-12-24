const CreditScoreContract = artifacts.require("CreditScoreContract");
 
module.exports = async function(deployer) {
    await deployer.deploy(CreditScoreContract);
    const instance = await CreditScoreContract.deployed();
 
    console.log(`Credit Score Contract has been deployed to: ${instance.address}`);
};
