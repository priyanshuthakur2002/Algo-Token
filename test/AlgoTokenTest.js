const AlgoToken = artifacts.require("AlgoToken");
let AlgoTokenInstance;
const { web3 } = AlgoToken;
let accounts;

beforeEach(async () => {
  AlgoTokenInstance = await AlgoToken.deployed();
  accounts = await web3.eth.getAccounts();
});

describe("Checking state variables...", () => {
  it("checking name...", async () => {
    const name = await AlgoTokenInstance.name();
    assert.equal(name, "AlgoToken", "Incorrect name");
  });

  it("checking symbol...", async () => {
    const symbol = await AlgoTokenInstance.symbol();
    assert.equal(symbol, "ABT", "Incorrect symbol");
  });

  it("checking decimals...", async () => {
    const decimals = await AlgoTokenInstance.decimals();
    assert.equal(decimals, 18, "Incorrect decimals");
  });

  it("checking totalSupply...", async () => {
    const totalSupply = await AlgoTokenInstance.totalSupply();
    assert.equal(
      totalSupply,
      web3.utils.toWei("70000000", "ether"),
      "Incorrect totalSupply"
    );
  });

  it("checking balanceOf...", async () => {
    const balanceOf = await AlgoTokenInstance.balanceOf(accounts[0]);
    assert.equal(
      balanceOf,
      web3.utils.toWei("70000000", "ether"),
      "Incorrect balanceOf"
    );
  });
  it("checking allowance...", async () => {
    const allowance = await AlgoTokenInstance.allowance(
      accounts[0],
      accounts[1]
    );
    assert.equal(
      allowance,
      web3.utils.toWei("0", "ether"),
      "Incorrect allowance"
    );
  });
});

describe("Checking Functions", () => {
  it("Checking transfer...", async () => {
    const success = await AlgoTokenInstance.transfer(
      accounts[1],
      web3.utils.toWei("1000000", "ether")
    );
    if (success.receipt.status) {
      const balance1 = await AlgoTokenInstance.balanceOf(accounts[1]);
      assert.equal(
        balance1,
        web3.utils.toWei("1000000", "ether"),
        "User1 didn't get..."
      );
      const balance0 = await AlgoTokenInstance.balanceOf(accounts[0]);
      assert.equal(
        balance0,
        web3.utils.toWei("69000000", "ether"),
        "Send didn't complete..."
      );
    }
  });

  it("Checking approve...", async () => {
    const success = await AlgoTokenInstance.approve(
      accounts[1],
      web3.utils.toWei("1000000", "ether")
    );
    if (success.receipt.status) {
      const balance1 = await AlgoTokenInstance.allowance(
        accounts[0],
        accounts[1]
      );
      assert.equal(
        balance1,
        web3.utils.toWei("1000000", "ether"),
        "Approval didn't happen..."
      );
    }
  });

  it("Checking transferFrom...", async () => {
    const success = await AlgoTokenInstance.transferFrom(
      accounts[0],
      accounts[2],
      web3.utils.toWei("1000000", "ether"),
      { from: accounts[1] }
    );
    if (success.receipt.status) {
      const balance2 = await AlgoTokenInstance.balanceOf(accounts[2]);
      assert.equal(
        balance2,
        web3.utils.toWei("1000000", "ether"),
        "User2 didn't get..."
      );
      const balance0 = await AlgoTokenInstance.balanceOf(accounts[0]);
      assert.equal(
        balance0,
        web3.utils.toWei("68000000", "ether"),
        "Send didn't complete..."
      );
    }
  });

  it("Checking mint...", async () => {
    const success = await AlgoTokenInstance.mint(
      accounts[1],
      web3.utils.toWei("3000000", "ether"),
      { from: accounts[0] }
    );
    if (success.receipt.status) {
      const totalSupply = await AlgoTokenInstance.totalSupply();
      assert.equal(
        totalSupply,
        web3.utils.toWei("73000000", "ether"),
        "Mint didn't happen..."
      );
    }
  });

  it("Checking burn...", async () => {
    const success = await AlgoTokenInstance.burn(
      web3.utils.toWei("3000000", "ether"),
      { from: accounts[0] }
    );
    if (success.receipt.status) {
      const totalSupply = await AlgoTokenInstance.totalSupply();
      assert.equal(
        totalSupply,
        web3.utils.toWei("70000000", "ether"),
        "Mint didn't happen..."
      );

      const balance0 = await AlgoTokenInstance.balanceOf(accounts[0]);
      assert.equal(
        balance0,
        web3.utils.toWei("65000000", "ether"),
        "Send didn't complete..."
      );
    }
  });

  it("Checking transferOwnership...", async () => {
    const success = await AlgoTokenInstance.transferOwnership(accounts[1], {
      from: accounts[0],
    });
    if (success.receipt.status) {
      const owner = await AlgoTokenInstance.owner();
      assert.equal(owner, accounts[1], "Transfer ownership didn't happen...");
    }
  });
});
