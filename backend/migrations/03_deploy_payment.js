const PaymentContract = artifacts.require("PaymentContract");
 
module.exports = async function(deployer) {
    await deployer.deploy(PaymentContract);
    const instance = await PaymentContract.deployed();
 
    console.log(`Payment Contract has been deployed to: ${instance.address}`);
};
