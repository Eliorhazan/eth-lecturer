var Lecturer = artifacts.require("./lecturer.sol");

module.exports = function(deployer) {
  deployer.deploy(Lecturer);
};