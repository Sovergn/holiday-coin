import * as _ from "lodash";
import * as request from "request-promise-native";
import { BitcoinTransaction, BitcoinClaim, getConnection } from "../entity";
import config from "../config";

export default async function BitcoinProcessor(address: string): Promise<void> {
  await getConnection();

  let json = await request(`https://blockchain.info/unspent?active=${address}`);
  let data: UnspentOutputResponse = JSON.parse(json);
  let txIds = data.unspent_outputs.map(utxo => utxo.tx_hash_big_endian);
  let btcTxEntities = await Promise.all(txIds.map(txId => BitcoinTransaction.findOne({ where: { txid: txId } })));
  let txToBtcEntity = _.zipObject(txIds, btcTxEntities);
  let newTxIDs = txIds.filter(txId => !Boolean(txToBtcEntity[txId]));
  for (let txId of newTxIDs) {
    await processTransaction(address, txId);
  }
  let newBtcTxEntities = _.flatten(await Promise.all(newTxIDs.map(txId => BitcoinTransaction.find({ where: { txid: txId } }))));
  for (let btcTxEntity of newBtcTxEntities) {
    await claimBitcoinTransaction(btcTxEntity);
  }
}

async function processTransaction(address: string, txId: string): Promise<void> {
  let json = await request(`https://blockchain.info/rawtx/${txId}`);
  let data: RawTransactionResponse = JSON.parse(json);
  let output = _.find(data.out, { addr: address });
  let inputTotal = _.sum(data.inputs.map(input => input.prev_out.value));
  for (let input of data.inputs) {
    let btcTxEntity = new BitcoinTransaction();
    btcTxEntity.txid = txId;
    btcTxEntity.address = input.prev_out.addr;
    btcTxEntity.amount = output.value * input.prev_out.value / inputTotal;
    await btcTxEntity.save();
  }
}

async function claimBitcoinTransaction(btcTx: BitcoinTransaction) {
  let { address } = btcTx;
  let claim = await BitcoinClaim.findOne({ where: { address } });
  if (!claim) {
    claim = new BitcoinClaim();
    claim.source = address;
    await claim.save();
  }
}