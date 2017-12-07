module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    kovan:{
      from: '0x004a47EABdc8524Fe5A1cFB0e3D15C2c255479e3',
      network_id: 42,
      host: 'localhost',
      port: 8545,
      gas: 7000000,
      gasPrice: 25000000000
    }
  }
};