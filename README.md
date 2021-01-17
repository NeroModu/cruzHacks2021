# Voting-as-a-Service

How can we ensure trust, transparency and auditability within elections?
How does an individual verify that their vote was counted in the way intended while upholding voter privacy?
How can we prevent double voting and voter fraud?


Using smart contracts on the Ethereum blockchain, we have created a highly secure and transparent inter-organization voting system all while keeping the identity of those who voted private.
 
Perhaps the biggest issue when it comes to voting on the blockchain is identity management.  Since identity verification is a complicated process that requires personal documentation such as IDs/SSN/Passports/birth certificates and more, we decided to leverage existing identity management infrastructure such as Google Authentication at launch with more planned to follow

This way, organizations now have a way to facilitate fair and transparent elections within organizations that already use existing identity management authentication services. 

Take UCSC for example. Every individual within the organization is assigned an @ucsc.edu email address that one uses to authenticate themselves. Every individual at UCSC is assigned one email address/uid and no more. Using this authentication method, VaaS is able to verify the voter legitimacy and record the vote on the public contract for all to see.

For this MVP,  we made one poll available to all UCSC affiliated personnel. Login with your UCSC email address, cast your vote in the poll, and see the results straight from the blockchain. The poll’s contract has been deployed on the Kovan testnet of the Ethereum blockchain.

VaaS does not store any information whatsoever and every vote cast is individually verifiable immediately. 

---
This is how VaaS works:

1. User logs in with Google on the VaaS web application which sends an identity token to the VaaS backend

2. VaaS verifies the validity of the identity token via Google Auth Services

3. VaaS validates the user’s organization and displays all the current polls available to the user

4. User selects and submits their vote to the VaaS backend

5. VaaS hashes the received identity token using a secret key 

6. Vaas writes the user’s vote to the smart contract along with the hashed identity token in order to preserve privacy

7. VaaS then provides a receipt of the vote to the user containing hashID that the user can use to verify their vote if they please
