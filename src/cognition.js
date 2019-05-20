const axios = require("axios");

const url = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";

module.exports = {
  identifyCommand: async (msg, bot) => {
    const fetchPrice = await axios.get(url);
    const price = fetchPrice.data.bpi.USD.rate_float.toFixed(2);
    const condition =
      msg.text
        .toString()
        .toLowerCase()
        .indexOf("bitcoin price") === 0 ||
      msg.text
        .toString()
        .toLowerCase()
        .indexOf("btc price") === 0 ||
      msg.text
        .toString()
        .toLowerCase()
        .indexOf("precio del bitcoin") === 0;
    if (condition) {
      bot.sendMessage(
        msg.chat.id,
        `Hello ${msg.chat.first_name}, the bitcoin price is $${price} USD`
      );
    } else {
      bot.sendMessage(
        msg.chat.id,
        `I'm sorry ${
          msg.chat.first_name
        }, I cannot understand what are you saying, try something like "Btc price"`
      );
    }
  }
};