import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import dotenv from "dotenv";
dotenv.config(); 

const privateKey = process.env.PRIVATE_KEY as string;
if (!privateKey) {
  throw new Error("PRIVATE_KEY environment variable is not set");
}

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    "ble-testnet": {
      url: "https://rpc-ethena-testnet-0.t.conduit.xyz/hH3foDCfczibiAunwWyhs5gCBRDRyn5f",
      accounts: [privateKey],
    },
  },
};

export default config;
