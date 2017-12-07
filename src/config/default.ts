
const DEFAULTS = {
  "app": {
    "port": 8000
  },
  "secret": null,
  "eth": {
    "privateKey": null,
    "address": null
  },
  "web3": {
    "defaultAccount": null,
    "accounts": []
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
