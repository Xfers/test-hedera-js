/* allow us to use our .env variables */

//require("dotenv").config();

import {
  Wallet,
  LocalProvider,
  Client,
  TokenCreateTransaction,
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

    // testnet
    // var account_id = AccountId.fromString("0.0.45949322")
    // var public_key = PublicKey.fromString("302a300506032b657003210009fc854d1005984c386206cc68382900a0f9647d7a0ddd164d27f9dcd767f1f6")
    // var private_key = PrivateKey.fromString("302e020100300506032b657004220420c26e9b65de501380d105634579077492fd59b8614b0aedb55410b20a47469f28");


    //mainnet
    var account_id = AccountId.fromString("0.0.1126201")
    var public_key = PublicKey.fromString("3a16c869ec6e4c4d96a78a04cfdddda79ccd5c464c21619f21076d462f643d7a")
    var private_key = PrivateKey.fromString("302e020100300506032b65700422042086ee233f7278fb32e9a51e1a1e9daa4555db51f29abcceb5f4d4acbb334a54ef");

    var ian_public_key = PublicKey.fromString("8ad0b83774cbb3f417df7972965b3fad1b2a686bf43f0222db10f090c31b343f")

    /* configure our testnet client */

    //const client = Client.forTestnet();
    const client = Client.forMainnet();

    client.setOperator(account_id, private_key);


    const wallet = new Wallet(
      account_id,
      private_key,
      new LocalProvider()
    );


    const now = Date.now();
    const seconds = Math.floor(now / 1000) + (60 * 15); // + 15mins

    const validStart = new Timestamp(seconds, 0);
    const transactionId = new TransactionId(
      account_id,
      validStart,
      false
    );
    console.log('txid');
    console.log(transactionId.toString());



    var tokenCreateTransaction = await new TokenCreateTransaction()
      .setTransactionId(transactionId)
      .setTokenName("nammainjs")
      .setTokenSymbol("nammainjs")
      .setDecimals(3)
      .setInitialSupply(0)
      .setTreasuryAccountId(account_id)
      .setAdminKey(ian_public_key)
      //.setFreezeKey(ian_public_key)
      .setSupplyKey(ian_public_key)
      .freezeWith(client)



    // how to decode
    // transaction = Transaction.fromBytes(transaction.toBytes());

    const txbyte = tokenCreateTransaction.toBytes();
    console.log("txbytes");
    console.log(txbyte)

    var txbyte_str = hex.encode(txbyte);
    //console.log(txbyte_str)
    console.log({ "transaction": txbyte_str });



    //tokenCreateTransaction = await tokenCreateTransaction.signWithSigner(wallet);
    //
    //
    //var resp = await tokenCreateTransaction.executeWithSigner(wallet);
    //const receipt = await resp.getReceiptWithSigner(wallet);
    //console.log(resp);
    //console.log(receipt);

    // link dragon mainnet

  } catch (err) {
    console.log(err);
  }
}



/* call our async function */

void main();
