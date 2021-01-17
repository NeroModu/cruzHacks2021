const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('./Measure24.json');
const config = require('./config.js');
const address = config.address;
const privateKey = config.privateKey;
const infuraUrl = config.infuraUrl;

const provider = new Provider(privateKey, infuraUrl); 
  const web3 = new Web3(provider);
 // const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    MyContract.abi,
    //MyContract.networks[networkId].address
    '0x32078e498CE709B708230311c5f0Dc5DA89BAcde'
  );

async function castVote(userHash, choice){
    try{
        await myContract.methods.castVote(userHash, choice).send({ from: address});
    } catch (e){
        console.error(e);
    }
}
async function userHasVoted(userHash){
    let ballot = await myContract.methods.votesById(userHash).call();
    if(ballot.isValue){
        console.log(true);
        return true;
    }else{
        console.log(false);
        return false;
    }
}
const retrieveAllVotes = async () => {
  let voteCount = await myContract.methods.voteCount().call();
  let voteJSON = {};

  for(let i = 1; i<voteCount+1; i++){
      let ballot = await myContract.methods.votesByOrder(i).call();
      if(ballot.isValue){
          voteJSON[ballot.uid] = ballot.choice;
      }
  }
  console.log(voteJSON);
  return voteJSON;
}

async function getStandings(){
    let voteJSON = await retrieveAllVotes();
    let results = {};

    results["no"] = 0;
    results["yes"] = 0;

    for (let value of Object.values(voteJSON)) {
        if (`${value}` == "no"){
            results["no"] ++;
        }else if(`${value}` == "yes"){
            results["yes"] ++;
        }
    }
    
    return results;

}

//castVote("myTestVote3", 1);
retrieveAllVotes();
//userHasVoted("myTestVote0");
//getStandings();


module.exports = {
    castVote,
    retrieveAllVotes,
    userHasVoted,
    getStandings,
}