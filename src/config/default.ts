
const DEFAULTS = {
  "app": {
    "port": 8000
  },
  "secret": null,
  "web3": {
    "defaultAccount": null,
    "accounts": [],
    "options": {
      "gas": 500000,
      "gasPrice": "20000000000"
    }
  },
  "convert": {
    "btc": 0.01,
    "eth": 0.01,
    "usd": 1
  },
  "stripe": {
    "secret": null,
    "key": null
  },
  "sparkpost": {
    "sparkpost": {
      "endpoint": "https://api.sparkpost.com",
      "from": "root@localhost",
      "key": null
    }
  }
};

export default DEFAULTS;
