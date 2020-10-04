import Koa from "koa";
import CSRF from "koa-csrf";

export const configureCSRF = async (app: Koa) => {
  const env = app.env;
  if (env === "production") {
    app.use(
      new CSRF({
        invalidTokenMessage: "Invalid CSRF token",
        invalidTokenStatusCode: 403,
        excludedMethods: ["GET", "HEAD", "OPTIONS"],
        disableQuery: false
      })
    );
  }
};
