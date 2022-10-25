

/* allow us to use our .env variables */

//require("dotenv").config();

import {
  Wallet,
  LocalProvider,
  Client,
  TokenMintTransaction,
  PrivateKey,
  AccountId,
  PublicKey,
  TransactionId,
  Timestamp,
} from "@hashgraph/sdk";
import * as hex from "./hex.js";


import dotenv from "dotenv";

dotenv.config();

/* import the Hedera JavaScript SDK */

//const { Client, CryptoTransferTransaction } = require("@hashgraph/sdk");



/* create a new asynchronous function */

async function main() {

  try {

    //mainnet
    var account_id = AccountId.fromString("0.0.1126201")
    var public_key = PublicKey.fromString("3a16c869ec6e4c4d96a78a04cfdddda79ccd5c464c21619f21076d462f643d7a")
    var private_key = PrivateKey.fromString("302e020100300506032b65700422042086ee233f7278fb32e9a51e1a1e9daa4555db51f29abcceb5f4d4acbb334a54ef");



    /* configure our testnet client */

    const client = Client.forMainnet();

    client.setOperator(account_id, private_key);


    const wallet = new Wallet(
      account_id,
      private_key,
      new LocalProvider()
    );


    const now = Date.now();
    const seconds = Math.floor(now / 1000); // + 15mins

    const validStart = new Timestamp(seconds, 0);
    const transactionId = new TransactionId(
      account_id,
      validStart,
      false
    );
    console.log('txid');
    console.log(transactionId.toString());




    var tokenMintTransaction = await new TokenMintTransaction()
      .setTransactionId(transactionId)
      .setTokenId("???")
      .setAmount(10000)
      .freezeWith(client)


    // how to decode
    // transaction = Transaction.fromBytes(transaction.toBytes());

    const txbyte = tokenMintTransaction.toBytes();
    console.log("txbytes");
    console.log(txbyte);
    var txbyte_str = hex.encode(txbyte.toString());
    //console.log({ "transaction": txbyte_str });


    tokenMintTransaction = await tokenMintTransaction.signWithSigner(wallet);
    var resp = await tokenMintTransaction.executeWithSigner(wallet);
    const receipt = await resp.getReceiptWithSigner(wallet);
    console.log(resp);
    console.log(receipt)

    // link dragon mainnet

  } catch (err) {
    console.log(err);
  }
}



/* call our async function */

void main();
