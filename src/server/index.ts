// @ts-ignore
import session from "koa-generic-session";
// @ts-ignore
import redisStore from "koa-redis";
import Koa from "koa";
import Router from "koa-router";
import Log4js from "koa-log4";
import koaBody from "koa-body";
import send from "koa-send";
import serveStatic from "koa-static";

import path from "path";

import environment from "./config/environment";
import { forceHttps } from "./config/force-https";
import { configureCSRF } from "./config/csrf";

const app = new Koa();
const router = new Router();

app.keys = ["key", "miku"];

app.use(
  session({
    key: "SESSIONID",
    // @ts-ignore
    store: redisStore(environment.redis),
    cookie: {
      secure: app.env == "production"
    }
  })
);

// logger
app.use(Log4js.koaLogger(Log4js.getLogger("http"), { level: "auto" }));

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// force https
forceHttps(app);
// add the CSRF middleware
configureCSRF(app);

// Body parser
app.use(koaBody());

// serve static file
app.use(serveStatic(path.resolve(__dirname, "../public")));

router.get("/", async (ctx) => {
  // @ts-ignore
  ctx.session = {
    viewed: true
  };
  await send(ctx, "index.html", { root: path.resolve(__dirname, "../public") });
});

app.use(router.routes());

app.use(async function pageNotFound(ctx) {
  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  ctx.status = 404;

  switch (ctx.accepts("html", "json")) {
    case "html":
      ctx.type = "html";
      ctx.body = "<p>Page Not Found!</p>";
      break;
    case "json":
      ctx.body = {
        message: "Page Not Found"
      };
      break;
    default:
      ctx.type = "text";
      ctx.body = "Page Not Found";
  }
});

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

app.listen(environment.port);

console.log(`Server running on port http://localhost:${environment.port}`);
