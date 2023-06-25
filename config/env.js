// initialize environment variables and set defaults if not set
// take environment variable from .env file if it exists
import path from "path";
const env_path = path.join(cwd(), ".env");
import dotenv from "dotenv";
import { cwd, env } from "process";
dotenv.config({ path: env_path });

export default () => {
  env.NODE_ENV = env.NODE_ENV ? env.NODE_ENV : "development";

  env.JWT_PRIVATE_KEY = env.JWT_PRIVATE_KEY
    ? env.JWT_PRIVATE_KEY
    : "ExampleKey";
  env.DB = env.DB ? env.DB : "testDB";

  if (env.NODE_ENV === "development") {
    console.log("\n🚧 Node running as Development Environment 🚧\n");
    console.log(`Enviroment Variables Loaded: ${env_path}`);
    console.log(`🔑 JWT_PRIVATE_KEY: ${env.JWT_PRIVATE_KEY}`);
    console.log(`🔑 DB: ${env.DB}`);
    console.log();
  }
};
