import Koa from "koa";
const forceHTTPS = require("koa-force-https");

export const forceHttps = async (app: Koa) => {
  const env = app.env;
  if (env === "production") {
    app.use(forceHTTPS());
  }
};
