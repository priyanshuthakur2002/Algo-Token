// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AlgoToken {
    string public name = "AlgoToken";
    string public symbol = "ABT";
    uint256 public decimals = 18;
    uint256 public totalSupply = 70000000 * (10 ** decimals);
    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    address public owner;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner has the right");
        _;
    }

    constructor() {
        owner = msg.sender;
        balanceOf[msg.sender] = totalSupply;
    }


    function transfer(address _to, uint256 _value) public returns (bool success){        
        success = _transfer(msg.sender, _to, _value);
    }

    function _transfer(address _from, address _to, uint256 _value) internal returns(bool _transferSuccess){
        require(_to != address(0), "Invalid address");
        require(balanceOf[_from] >= _value, "Insufficient balance");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        _transferSuccess = true;

        emit Transfer(_from, _to, _value);

    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(allowance[_from][msg.sender] >= _value, "Not enough allowance");
        allowance[_from][msg.sender] -= _value;
        success = _transfer(_from, _to, _value);
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        allowance[msg.sender][_spender] = _value;
        success = true;

        emit Approval(msg.sender, _spender, _value);
    }

    function mint(address _account, uint256 _amount) external onlyOwner {
        require(_account != address(0), "Invalid addresss");
        totalSupply += _amount;
        balanceOf[_account] += _amount;

        emit Transfer(address(0), _account, _amount);
    }

    function burn(uint256 _amount) external onlyOwner{
        require(balanceOf[msg.sender] >= _amount, "Insufficient amount");
        balanceOf[msg.sender] -= _amount;
        totalSupply -= _amount;

        emit Transfer(msg.sender, address(0), _amount);
    }

    function transferOwnership(address _newOwner) external onlyOwner{
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }

    
}