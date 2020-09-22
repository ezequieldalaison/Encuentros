if (process.env.REACT_APP_NODE_ENV === "production") {
  module.exports = require("./ConfigureStore.prod");
} else if (process.env.REACT_APP_NODE_ENV === "development") {
  module.exports = require("./ConfigureStore.dev");
} else {
  throw new Error(
    "Configure store is missing - Enviroment: " + process.env.REACT_APP_NODE_ENV
  );
}
