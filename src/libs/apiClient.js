const axios = require("axios");

module.exports = {
  createInstance: ({ baseURL }) => {
    const instance = axios.create({ timeout: 10000, baseURL });
    return instance;
  },
};
