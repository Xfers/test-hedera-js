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
    var account_id = AccountId.fromString("0.0.45949322")
    var public_key = PublicKey.fromString("302a300506032b657003210009fc854d1005984c386206cc68382900a0f9647d7a0ddd164d27f9dcd767f1f6")
    var private_key = PrivateKey.fromString("302e020100300506032b657004220420c26e9b65de501380d105634579077492fd59b8614b0aedb55410b20a47469f28");



    /* configure our testnet client */

    const client = Client.forTestnet();

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



    var tokenCreateTransaction = await new TokenCreateTransaction()
      .setTransactionId(transactionId)
      .setTokenName("namtestjs")
      .setTokenSymbol("namtestjs")
      .setDecimals(3)
      .setInitialSupply(0)
      .setTreasuryAccountId(account_id)
      .setAdminKey(public_key)
      .setFreezeKey(public_key)
      .setSupplyKey(public_key)
      .freezeWith(client)



    // how to decode
    // transaction = Transaction.fromBytes(transaction.toBytes());

    const txbyte = tokenCreateTransaction.toBytes();
    console.log("txbytes");
    console.log(txbyte);
    var txbyte_str = hex.encode(txbyte.toString());
    //console.log({ "transaction": txbyte_str });




    tokenCreateTransaction = await tokenCreateTransaction.signWithSigner(wallet);


    var resp = await tokenCreateTransaction.executeWithSigner(wallet);
    const receipt = await resp.getReceiptWithSigner(wallet);
    console.log(resp);
    console.log(receipt)

    // https://testnet.dragonglass.me/hedera/tokens/0.0.48704913

  } catch (err) {
    console.log(err);
  }
}



/* call our async function */

void main();
