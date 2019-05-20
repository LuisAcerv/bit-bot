const cognition = require("./cognition");

module.exports = {
  processMessage: (msg, bot) => {
    cognition.identifyCommand(msg, bot);
  }
};
