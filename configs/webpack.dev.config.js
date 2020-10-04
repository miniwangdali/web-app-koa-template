const base = require("./webpack.config");
module.exports = {
  ...base,
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000
  }
};
