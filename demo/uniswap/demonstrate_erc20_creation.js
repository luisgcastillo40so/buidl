// New Token Contract
erc20Abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
erc20Bytecode = "0x6080604052610f7c806100136000396000f3fe608060405260043610610088576000357c010000000000000000000000000000000000000000000000000000000090048063095ea7b31461008d57806318160ddd1461010057806323b872dd1461012b57806339509351146101be57806370a0823114610231578063a457c2d714610296578063a9059cbb14610309578063dd62ed3e1461037c575b600080fd5b34801561009957600080fd5b506100e6600480360360408110156100b057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610401565b604051808215151515815260200191505060405180910390f35b34801561010c57600080fd5b5061011561041f565b6040518082815260200191505060405180910390f35b34801561013757600080fd5b506101a46004803603606081101561014e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610429565b604051808215151515815260200191505060405180910390f35b3480156101ca57600080fd5b50610217600480360360408110156101e157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610546565b604051808215151515815260200191505060405180910390f35b34801561023d57600080fd5b506102806004803603602081101561025457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105f9565b6040518082815260200191505060405180910390f35b3480156102a257600080fd5b506102ef600480360360408110156102b957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610641565b604051808215151515815260200191505060405180910390f35b34801561031557600080fd5b506103626004803603604081101561032c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610752565b604051808215151515815260200191505060405180910390f35b34801561038857600080fd5b506103eb6004803603604081101561039f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610770565b6040518082815260200191505060405180910390f35b600061041561040e6107f7565b84846107ff565b6001905092915050565b6000600254905090565b6000610436848484610a80565b61053b846104426107f7565b61053685606060405190810160405280602881526020017f45524332303a207472616e7366657220616d6f756e742065786365656473206181526020017f6c6c6f77616e6365000000000000000000000000000000000000000000000000815250600160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006104ec6107f7565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e049092919063ffffffff16565b6107ff565b600190509392505050565b60006105ef6105536107f7565b846105ea85600160006105646107f7565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610ec690919063ffffffff16565b6107ff565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600061074861064e6107f7565b8461074385606060405190810160405280602581526020017f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7781526020017f207a65726f000000000000000000000000000000000000000000000000000000815250600160006106bc6107f7565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e049092919063ffffffff16565b6107ff565b6001905092915050565b600061076661075f6107f7565b8484610a80565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156108ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001807f45524332303a20617070726f76652066726f6d20746865207a65726f2061646481526020017f726573730000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515610995576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001807f45524332303a20617070726f766520746f20746865207a65726f20616464726581526020017f737300000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610b4b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001807f45524332303a207472616e736665722066726f6d20746865207a65726f20616481526020017f647265737300000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515610c16576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f45524332303a207472616e7366657220746f20746865207a65726f206164647281526020017f657373000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b610cc581606060405190810160405280602681526020017f45524332303a207472616e7366657220616d6f756e742065786365656473206281526020017f616c616e636500000000000000000000000000000000000000000000000000008152506000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e049092919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610d58816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610ec690919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b60008383111582901515610eb3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610e78578082015181840152602081019050610e5d565b50505050905090810190601f168015610ea55780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b6000808284019050838110151515610f46576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b809150509291505056fea165627a7a72305820fd7504e2a53e98594b8afb9ba4b2f89d95965f2320e43304e72d2b0c21702f2f0029"
class UniswapEnv {

    constructor() {
        var tokenAddress;
        var tokenInstance;
        var currentGasPrice;
        }
    // Token Address
    getTokenAddress() {
        return this.tokenAddress;
    }
    setTokenAddress(_tokenAddress) {
        this.tokenAddress = _tokenAddress
    }
    
    // Token Instance
    getTokenInstance() {
        return this.tokenInstance;
    }
    setTokenInstance(_tokenInstance) {
        this.tokenInstance = _tokenInstance;
    }
    
    // Gas details
    getCurrentGasPrice() {
        return this.currentGasPrice;
    }
    setCurrentGasPrice(_currentGasPrice) {
        this.currentGasPrice = _currentGasPrice
    }
    
}
    
// Instantiate Uniswap environment variable
var env = new UniswapEnv();
    
document.querySelector("#c4").addEventListener("click", function() {
    $("#token_result").empty();
    // Create new ERC20 token
    var contract3 = web3.ss.contract(erc20Abi)
    // GAS //
    env.setCurrentGasPrice(web3.ss.gasPrice);
    console.log("Gas price raw: " + env.getCurrentGasPrice());
    console.log("Gas price in gwei: " + web3.fromWei(env.getCurrentGasPrice(), 'gwei'));
    console.log("Estimating gas ...");
    var erc20Estimate = web3.ss.estimateGas({
        data: erc20Bytecode,
    });
    console.log("Gas estimate: " + erc20Estimate);
    contract3.new("The TEST Token", "TEST", "18", {
        data: erc20Bytecode,
        // Need to provide a higher gas value here
        // Was getting "Error: The contract code couldn't be stored, please check your gas amount."
        gas: erc20Estimate * 2,
        gasPrice: env.getCurrentGasPrice(),
    }, function(tokenError, tokenResult) {
        if (!tokenError && tokenResult.address != null) {
            env.setTokenAddress(tokenResult.address);
            console.log("Created item");
            console.log("Transaction Hash:" + tokenResult.transactionHash);
            console.log("Address:" + env.getTokenAddress());
            $("#token_result").text("ERC20 Token Contract - Deployed at " + env.getTokenAddress());
            env.setTokenInstance(contract3.at(env.getTokenAddress()))
            console.log(env.getTokenInstance());
        } else {
            console.log(tokenError);
            $("#token_result").text(tokenError);
        }
    })
})
