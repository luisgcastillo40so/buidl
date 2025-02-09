// Deploy the parent smart contract and also explicitly index it into the smart contract search engine
childAbi = [{
        "constant": false,
        "inputs": [],
        "name": "incrementChildContractData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "incrementParentContractData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getChildContractData",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getParentContractData",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "decrementChildContractData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "decrementParentContractData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

parentAbi = [{
        "constant": false,
        "inputs": [],
        "name": "incrementParentContractData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getParentContractData",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "decrementParentContractData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

parentBytecode = "6080604052600160005534801561001557600080fd5b5060f9806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633f794d46146058578063883cba2c14606c578063c4102607146094575b600080fd5b348015606357600080fd5b50606a60a8565b005b348015607757600080fd5b50607e60b6565b6040518082815260200191505060405180910390f35b348015609f57600080fd5b5060a660bf565b005b600160005401600081905550565b60008054905090565b6001600054036000819055505600a165627a7a72305820a779afd88933e906455973801c0af6cf9dfc3856fbe7dcf71eef41a8c376d64c0029";
childBytecode = "608060405260016000556001805534801561001957600080fd5b506101a4806100296000396000f300608060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631da1d5041461007d5780633f794d461461009457806382a7282c146100ab578063883cba2c146100d6578063a20fab9314610101578063c410260714610118575b600080fd5b34801561008957600080fd5b5061009261012f565b005b3480156100a057600080fd5b506100a961013c565b005b3480156100b757600080fd5b506100c061014a565b6040518082815260200191505060405180910390f35b3480156100e257600080fd5b506100eb610154565b6040518082815260200191505060405180910390f35b34801561010d57600080fd5b5061011661015d565b005b34801561012457600080fd5b5061012d61016a565b005b6001805401600181905550565b600160005401600081905550565b6000600154905090565b60008054905090565b6001805403600181905550565b6001600054036000819055505600a165627a7a72305820b1d962ff37313a0aa5a31b4118f46264b9740565e1b684aa1ee31ded89617cd50029";

esss.getMostRecentIndexedBlockNumber().then((theResult) => {
    var blockNumber = JSON.parse(theResult);
    console.log(blockNumber);
})
// Address of contract 1 post deployment
var c1dAddress = "";
// Address of contract 2 post deployment
var c2dAddress = "";
// Address of contract 3 post deployment
var c3dAddress = "";
// Address of contract 4 post deployment
var c4dAddress = "";

// Contract instance 1
var instance1;
// Contract instance 2
var instance2;
// Contract instance 3
var instance3;
// Contract instance 4
var instance4;

document.querySelector("#c1d").addEventListener("click", function() {
    $("#c1d_deployParentAndIndexExpectation1").empty();
    $("#c1d_deployParentAndIndexResults1").empty();

    var contract1 = web3.ss.contract(parentAbi);
    var data1 = '0x' + parentBytecode;
    contract1.new({
        data: data1,
    }, function(ee, i) {
        if (!ee && i.address != null) {
            console.log("Created item");
            console.log("Transaction Hash:" + i.transactionHash);
            console.log("Address:" + i.address);
            c1dAddress = i.address;
            instance1 = contract1.at(c1dAddress);

            esss.shaAbi(JSON.stringify(parentAbi)).then((shaResult1) => {
                var parentSha = JSON.parse(shaResult1).abiSha3;
                $("#c1d_deployParentAndIndexExpectation1").append(parentSha);
            });
            setTimeout(function() {
                console.log("Indexing ABI and TxHash into search engine");
                var abiSubmission = esss.submitAbi(JSON.stringify(parentAbi), i.transactionHash);
                abiSubmission.then(function(error, result) {
                        if (!error) {
                            console.log("Item indexed");
                        } else {
                            console.log(error);
                        }
                    })
                    .catch(function() {
                        console.log("Error");
                    });
            }, 2 * 1000);
            setTimeout(function() {
                console.log("Fetching results from search engine");
                console.log("Using Tx: " + i.transactionHash);
                esss.searchUsingAddress(c1dAddress).then((txResult) => {
                    var resultToDisplay = JSON.stringify(JSON.parse(txResult).abiShaList[0]);
                    $("#c1d_deployParentAndIndexResults1").text(resultToDisplay.replace(/['"]+/g, ''));
                });
            }, 8 * 1000);
        }
    });
});

document.querySelector("#c1r0").addEventListener("click", function() {
    $("#c1d_deployParentAndIndexResults1").empty();
    esss.searchUsingAddress(c1dAddress).then((txResult) => {
        var resultToDisplay = JSON.stringify(JSON.parse(txResult).abiShaList[0]);
        $("#c1d_deployParentAndIndexResults1").text(resultToDisplay.replace(/['"]+/g, ''));
    });
});

document.querySelector("#c1i1").addEventListener("click", function() {
    $("#c1i1_interactionExpectation1").empty();
    $("#c1i1_interactionResult1").empty();
    $("#c1i1_interactionExpectation1").append("1");
    console.log("Querying index using address: " + c1dAddress);
    esss.searchUsingAddress(c1dAddress).then((c1i1) => {
        var data = JSON.parse(c1i1);
        resultToDisplay = JSON.stringify(data.functionData.getParentContractData);
        $("#c1i1_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
    });
});

document.querySelector("#c1r1").addEventListener("click", function() {
    $("#c1i1_interactionResult1").empty();
    esss.searchUsingAddress(c1dAddress).then((c1i1) => {
        var data = JSON.parse(c1i1);
        resultToDisplay = JSON.stringify(data.functionData.getParentContractData);
        $("#c1i1_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
    });
});

document.querySelector("#c1i2").addEventListener("click", function() {
    // Calculate expected output
    $("#c1i2_interactionExpectation1").empty();
    $("#c1i2_interactionResult1").empty();
    esss.searchUsingAddress(c1dAddress).then((c1i) => {
        var data = JSON.parse(c1i);
        resultToDisplay = JSON.stringify(data.functionData.getParentContractData);
        $("#c1i2_interactionExpectation1").text(parseInt(resultToDisplay.replace(/['"]+/g, '')) + 1);
    });

    // Update blockchain data/state
    instance1.incrementParentContractData();

    // Update search engine index
    console.log("Updating index using address: " + c1dAddress);
    setTimeout(function() {
        esss.updateStateOfContractAddress(JSON.stringify(parentAbi), c1dAddress).then((c2i) => {
            var data = JSON.parse(c2i);
            console.log(JSON.stringify(data))
            setTimeout(function() {
                esss.searchUsingAddress(c1dAddress).then((c1i) => {
                    var data = JSON.parse(c1i);
                    resultToDisplay = JSON.stringify(data.functionData.getParentContractData);
                    $("#c1i2_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
                });
            }, 1 * 1000);

        });
    }, 1 * 1000);
});

document.querySelector("#c1r2").addEventListener("click", function() {
    $("#c1i2_interactionResult1").empty();
    esss.searchUsingAddress(c1dAddress).then((c1i) => {
        var data = JSON.parse(c1i);
        resultToDisplay = JSON.stringify(data.functionData.getParentContractData);
        $("#c1i2_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
    });
});

document.querySelector("#c1i3").addEventListener("click", function() {
    // Calculate expected output
    $("#c1i3_interactionExpectation1").empty();
    $("#c1i3_interactionResult1").empty();
    esss.searchUsingAddress(c1dAddress).then((c1i3) => {
        var data = JSON.parse(c1i3);
        resultToDisplay = JSON.stringify(data.functionData.getParentContractData);
        $("#c1i3_interactionExpectation1").text(parseInt(resultToDisplay.replace(/['"]+/g, '')) - 1);
    });

    // Update blockchain data/state
    instance1.decrementParentContractData();

    // Update search engine index
    console.log("Updating index using address: " + c1dAddress);
    setTimeout(function() {
        esss.updateStateOfContractAddress(JSON.stringify(parentAbi), c1dAddress).then((c2i3) => {
            var data = JSON.parse(c2i3);
            console.log(JSON.stringify(data))
            setTimeout(function() {
                esss.searchUsingAddress(c1dAddress).then((c1i3) => {
                    var data = JSON.parse(c1i3);
                    resultToDisplay = JSON.stringify(data.functionData.getParentContractData);
                    $("#c1i3_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
                });
            }, 1 * 1000);

        });
    }, 1 * 1000);
});

document.querySelector("#c1r3").addEventListener("click", function() {
    $("#c1i3_interactionResult1").empty();
    esss.searchUsingAddress(c1dAddress).then((c1i) => {
        var data = JSON.parse(c1i);
        resultToDisplay = JSON.stringify(data.functionData.getParentContractData);
        $("#c1i3_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
    });
});

document.querySelector("#c2d").addEventListener("click", function() {
    $("#c2d_deployChildAndIndexExpectation1").empty();
    $("#c2d_deployParentAndIndexExpectation2").empty();
    $("#c2d_deployChildAndIndexResults1").empty();

    var contract2 = web3.ss.contract(childAbi);
    var data1 = '0x' + childBytecode;
    contract2.new({
        data: data1,
    }, function(ee, i) {
        if (!ee && i.address != null) {
            console.log("Created item");
            console.log("Transaction Hash:" + i.transactionHash);
            console.log("Address:" + i.address);
            c2dAddress = i.address;
            instance2 = contract2.at(c2dAddress);
            esss.shaAbi(JSON.stringify(parentAbi)).then((shaResult1) => {
                var parentSha = JSON.parse(shaResult1).abiSha3;
                $("#c2d_deployChildAndIndexExpectation1").append(parentSha);
            });

            esss.shaAbi(JSON.stringify(childAbi)).then((shaResult2) => {
                var childSha = JSON.parse(shaResult2).abiSha3;
                $("#c2d_deployChildAndIndexExpectation2").append(childSha);
            });
            setTimeout(function() {
                console.log("Indexing ABI and TxHash into search engine")
                var abiSubmission = esss.submitAbi(JSON.stringify(childAbi), i.transactionHash);
                abiSubmission.then(function(error, result) {
                        if (!error) {
                            console.log("Item indexed");
                        } else {
                            console.log(error);
                        }
                    })
                    .catch(function() {
                        console.log("Error");
                    });
            }, 2 * 1000);
            setTimeout(function() {
                console.log("Fetching results from search engine")
                esss.describeUsingTx(i.transactionHash).then((txResult) => {
                    var resultToDisplay = JSON.parse(txResult).abiShaList;
                    for (var i = 0; i < resultToDisplay.length; i++) {
                        $("#c2d_deployChildAndIndexResults1").append(resultToDisplay[i]);
                        $("#c2d_deployChildAndIndexResults1").append("<br />");
                    }
                });
            }, 10 * 1000);
        }
    });

});

document.querySelector("#c2r0").addEventListener("click", function() {
    $("#c2d_deployChildAndIndexResults1").empty();
    esss.searchUsingAddress(c2dAddress).then((txResult) => {
        var resultToDisplay = JSON.parse(txResult).abiShaList;
        for (var i = 0; i < resultToDisplay.length; i++) {
            $("#c2d_deployChildAndIndexResults1").append(resultToDisplay[i]);
            $("#c2d_deployChildAndIndexResults1").append("<br />");
        }
    });
});

document.querySelector("#c2i1").addEventListener("click", function() {
    $("#c2i1_interactionExpectation1").empty();
    $("#c2i1_interactionResult1").empty();
    $("#c2i1_interactionExpectation1").append("1");
    console.log("Querying index using address: " + c2dAddress)
    esss.searchUsingAddress(c2dAddress).then((c2i1) => {
        var data = JSON.parse(c2i1);
        resultToDisplay = JSON.stringify(data.functionData.getChildContractData);
        $("#c2i1_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
    });

});

document.querySelector("#c2r1").addEventListener("click", function() {
    $("#c2i1_interactionResult1").empty();
    esss.searchUsingAddress(c2dAddress).then((c2i1) => {
        var data = JSON.parse(c2i1);
        resultToDisplay = JSON.stringify(data.functionData.getChildContractData);
        $("#c2i1_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
    });
});

document.querySelector("#c2i2").addEventListener("click", function() {
    // Calculate expected output
    $("#c2i2_interactionExpectation1").empty();
    $("#c2i2_interactionResult1").empty();
    esss.searchUsingAddress(c2dAddress).then((c2i) => {
        var data = JSON.parse(c2i);
        resultToDisplay = JSON.stringify(data.functionData.getChildContractData);
        $("#c2i2_interactionExpectation1").text(parseInt(resultToDisplay.replace(/['"]+/g, '')) + 1);
    });

    // Update blockchain data/state
    instance2.incrementChildContractData();

    // Update search engine index
    console.log("Updating index using address: " + c2dAddress);
    setTimeout(function() {
        esss.updateStateOfContractAddress(JSON.stringify(childAbi), c2dAddress).then((c2i) => {
            var data = JSON.parse(c2i);
            console.log(JSON.stringify(data))
            setTimeout(function() {
                esss.searchUsingAddress(c2dAddress).then((c2i2) => {
                    var data = JSON.parse(c2i2);
                    resultToDisplay = JSON.stringify(data.functionData.getChildContractData);
                    $("#c2i2_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
                });
            }, 1 * 1000);

        });
    }, 1 * 1000);
});

document.querySelector("#c2r2").addEventListener("click", function() {
    $("#c2i2_interactionResult1").empty();
    esss.searchUsingAddress(c2dAddress).then((c2i) => {
        var data = JSON.parse(c2i);
        resultToDisplay = JSON.stringify(data.functionData.getChildContractData);
        $("#c2i2_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
    });
});

document.querySelector("#c2i3").addEventListener("click", function() {
    // Calculate expected output
    $("#c2i3_interactionExpectation1").empty();
    $("#c2i3_interactionResult1").empty();
    esss.searchUsingAddress(c2dAddress).then((c2i) => {
        var data = JSON.parse(c2i);
        resultToDisplay = JSON.stringify(data.functionData.getChildContractData);
        $("#c2i3_interactionExpectation1").text(parseInt(resultToDisplay.replace(/['"]+/g, '')) - 1);
    });

    // Update blockchain data/state
    instance2.decrementChildContractData();

    // Update search engine index
    console.log("Updating index using address: " + c2dAddress);
    setTimeout(function() {
        esss.updateStateOfContractAddress(JSON.stringify(childAbi), c2dAddress).then((c2i) => {
            var data = JSON.parse(c2i);
            console.log(JSON.stringify(data))
            setTimeout(function() {
                esss.searchUsingAddress(c2dAddress).then((c2i2) => {
                    var data = JSON.parse(c2i2);
                    resultToDisplay = JSON.stringify(data.functionData.getChildContractData);
                    $("#c2i3_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
                });
            }, 1 * 1000);

        });
    }, 1 * 1000);
});

document.querySelector("#c2r3").addEventListener("click", function() {
    $("#c2i3_interactionResult1").empty();
    esss.searchUsingAddress(c2dAddress).then((c2i) => {
        var data = JSON.parse(c2i);
        resultToDisplay = JSON.stringify(data.functionData.getChildContractData);
        $("#c2i3_interactionResult1").text(resultToDisplay.replace(/['"]+/g, ''));
    });
});

document.querySelector("#c3d").addEventListener("click", function() {
    $("#c3d_deployParentNOIndexExpectation1").empty();
    $("#c3d_deployParentNOIndexResults1").empty();

    var contract3 = web3.ss.contract(parentAbi);
    var data3 = '0x' + parentBytecode;
    contract3.new({
        data: data3,
    }, function(ee, i) {
        if (!ee && i.address != null) {
            console.log("Created item");
            console.log("Transaction Hash:" + i.transactionHash);
            console.log("Address:" + i.address);
            c3dAddress = i.address;
            instance3 = contract3.at(c3dAddress);

            esss.shaAbi(JSON.stringify(parentAbi)).then((shaResult1) => {
                var parentSha = JSON.parse(shaResult1).abiSha3;
                $("#c3d_deployParentNOIndexExpectation1").append(parentSha);
            });

            setTimeout(function() {
                console.log("Fetching results from search engine");
                console.log("Using Tx: " + i.transactionHash);
                esss.describeUsingTx(i.transactionHash).then((txResult) => {
                    var resultToDisplay = JSON.stringify(JSON.parse(txResult).abiShaList[0]);
                    $("#c3d_deployParentNOIndexResults1").text(resultToDisplay.replace(/['"]+/g, ''));
                });
            }, 9 * 1000);
        }
    });
});

document.querySelector("#c3r0").addEventListener("click", function() {
    $("#c3d_deployParentNOIndexResults1").empty();
    esss.searchUsingAddress(c3dAddress).then((txResult) => {
        var resultToDisplay = JSON.stringify(JSON.parse(txResult).abiShaList[0]);
        $("#c3d_deployParentNOIndexResults1").text(resultToDisplay.replace(/['"]+/g, ''));
    });
});

document.querySelector("#c4d").addEventListener("click", function() {
    $("#c4d_deployParentNOIndexExpectation1").empty();
    $("#c4d_deployParentNOIndexResults1").empty();

    var contract4 = web3.ss.contract(childAbi);
    var data4 = '0x' + childBytecode;
    contract4.new({
        data: data4,
    }, function(ee, i) {
        if (!ee && i.address != null) {
            console.log("Created item");
            console.log("Transaction Hash:" + i.transactionHash);
            console.log("Address:" + i.address);
            c4dAddress = i.address;
            instance4 = contract4.at(c4dAddress);
            esss.shaAbi(JSON.stringify(parentAbi)).then((shaResult1) => {
                var parentSha = JSON.parse(shaResult1).abiSha3;
                $("#c4d_deployParentNOIndexExpectation1").append(parentSha);
            });

            esss.shaAbi(JSON.stringify(childAbi)).then((shaResult2) => {
                var childSha = JSON.parse(shaResult2).abiSha3;
                $("#c4d_deployParentNOIndexExpectation2").append(childSha);
            });

            setTimeout(function() {
                console.log("Fetching results from search engine");
                console.log("Using Tx: " + i.transactionHash);
                esss.describeUsingTx(i.transactionHash).then((txResult) => {
                    var resultToDisplay = JSON.parse(txResult).abiShaList;
                    for (var i = 0; i < resultToDisplay.length; i++) {
                        $("#c4d_deployParentNOIndexResults1").append(resultToDisplay[i]);
                        $("#c4d_deployParentNOIndexResults1").append("<br />");
                    }
                });
            }, 9 * 1000);
        }
    });
});

document.querySelector("#c4r0").addEventListener("click", function() {
    $("#c4d_deployParentNOIndexResults1").empty();
    esss.searchUsingAddress(c4dAddress).then((c1i4) => {
        var resultToDisplay = JSON.parse(c1i4).abiShaList;
        for (var i = 0; i < resultToDisplay.length; i++) {
            $("#c4d_deployParentNOIndexResults1").append(resultToDisplay[i]);
            $("#c4d_deployParentNOIndexResults1").append("<br />");
        }
    });
});
