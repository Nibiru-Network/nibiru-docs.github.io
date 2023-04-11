---
sidebar_position: 1
---
# Getting Started
---

Proof of Stake (PoS) blockchains like the Nibiru Network rely on the service of validator nodes to perform the important role of verifying and processing transactions, and generating new blocks on the blockchain.  As validator nodes are crucial to the performance and security of the network, liquidity is staked into the nodes in the form of NBN, which can be slashed in the event that the node does not perform its intended function.  validator node nodes that perform properly are compensated for their service in NBN.

## Modified Proof of Stake
The Nibiru Network employs a Modified Proof of Stake (MPoS) consensus mechanism that improves upon the the original
design of PoS in many blockchain networks today.  MPoS is a layer one consensus used in Nibiru Network that is based on the original Proof of Stake (PoS) consensus algorithm, but with modifications to address certain issues or limitations.

It presets two pools of candidate nodes with different proportions of candidates (upper and lower house system). In each round of witness node election, a corresponding number of nodes are selected according to the equity algorithm to give the right to produce blocks (that is, verification node), and at the same time combined with the benefit algorithm to ensure that each participant can get the opportunity to produce a block.

For further information on MPoS and its benefits, see the [whitepaper](https://nibirunet.io/wp-content/uploads/2023/04/Nibiru_Whitepaper_V2.1.pdf).

:::warning warning

Running a validator node on the Nibiru Network runs the risk of your stake being slashed in the event that the computer acting as a validator node is unavailable.  This could be due to poor internet connectivity, a system crash or power failure.  It's recommended that you only run a validator node if you have a highly-available system.

:::

## Next Steps

Have the hardware and infrastructure to deploy a validator node on the Nibiru Network and want to get started?  Continue on to the [**Next Step**](validator-set-up.md) to configure and deploy your validator node.