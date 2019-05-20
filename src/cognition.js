require("dotenv").config();
const axios = require("axios");
const Parser = require("rss-parser");
const parser = new Parser();

const url = process.env.URL;

module.exports = {
  identifyCommand: async (msg, bot) => {
    const fetchPrice = await axios.get(url);
    const price = fetchPrice.data.bpi.USD.rate_float.toFixed(2);
    const feedCondition =
      msg.text
        .toString()
        .toLowerCase()
        .indexOf("feed-test") === 0;
    const helpCondition =
      msg.text
        .toString()
        .toLowerCase()
        .indexOf("help") === 0;
    const startCondition =
      msg.text
        .toString()
        .toLowerCase()
        .indexOf("/start") === 0;
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
        .indexOf("price btc") === 0 ||
      msg.text
        .toString()
        .toLowerCase()
        .indexOf("price") === 0 ||
      msg.text
        .toString()
        .toLowerCase()
        .indexOf("precio") === 0 ||
      msg.text
        .toString()
        .toLowerCase()
        .indexOf("precio del bitcoin") === 0;
    if (condition) {
      bot.sendMessage(
        msg.chat.id,
        `Hello ${msg.chat.first_name}, the bitcoin price is $${price} USD`
      );
    } else if (helpCondition) {
      bot.sendMessage(
        msg.chat.id,
        `Hello ${
          msg.chat.first_name
        }, the current supported commands are "Btc price, bitcoin price"`
      );
    } else if (startCondition) {
      bot.sendMessage(
        msg.chat.id,
        `Hello ${
          msg.chat.first_name
        }, I am bitbot, I will help you to be updated about bitcoin price`
      );
    } else if (feedCondition) {
      let feed = await parser.parseURL(process.env.C_T_NEWS);

      feed.items.slice(0, 10).forEach(item => {
        bot.sendMessage(
          msg.chat.id,
          `Hello ${msg.chat.first_name}, your btc feed:`
        );
        bot.sendMessage(msg.chat.id, `${item.title} - ${item.link} "`);
      });
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
