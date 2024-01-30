const AlgoToken = artifacts.require("AlgoToken");

module.exports = (deployer) => {
  deployer.deploy(AlgoToken);
};
