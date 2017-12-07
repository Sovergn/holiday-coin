declare interface UnspentOutput {
  tx_hash: string;
  tx_hash_big_endian: string;
  tx_index: number;
  tx_output_n: number;
  script: string;
  value: number;
  value_hex: string;
  confirmations: number;
}

declare interface UnspentOutputResponse {
  unspent_outputs: UnspentOutput[];
}

declare interface RawTransactionInput {
  sequence: number;
  witness: string;
  prev_out: {
    spent: boolean;
    tx_index: number;
    type: number;
    addr: string;
    value: number;
    n: number;
    script: string;
  };
  script: string;
}

declare interface RawTransactionOutput {
  spent: boolean;
  tx_index: number;
  type: number;
  addr: string;
  value: number;
  n: number;
  script: string;
}

declare interface RawTransactionResponse {
  ver: number;
  inputs: RawTransactionInput[],
  weight: number;
  block_height: number;
  relayed_by: string;
  out: RawTransactionOutput[];
  lock_time: number;
  size: number;
  double_spend: boolean;
  time: number;
  tx_index: number;
  vin_sz: number;
  hash: string;
  vout_sz: number;
}
