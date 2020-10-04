import fs from "fs";
import path from "path";

if (
  fs.existsSync(
    path.resolve(__dirname, "../../../src/server/config/local.env.js")
  )
) {
  const globalConfig = require(path.resolve(
    __dirname,
    "../../../src/server/config/local.env.js"
  ));
  const keys = Object.keys(globalConfig);
  for (let key of keys) {
    console.log(key);
    process.env[key] = globalConfig[key];
  }
}

const allEnv = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 9443,

  redis: { host: "redis", port: 6379 }
};

// Read redis configs
if (process.env.REDIS_CONFIG) {
  allEnv.redis = JSON.parse(process.env.REDIS_CONFIG);
}

export default allEnv;
