import { ethers } from 'ethers';

const sepoliaRPC = "https://sepolia.infura.io/v3/"; // Sepolia RPC
const bleTestnetRPC = "https://testnet.rpc.ethena.fi/"; // BLE Testnet RPC

const sepoliaProvider = new ethers.providers.JsonRpcProvider(sepoliaRPC);
const bleProvider = new ethers.providers.JsonRpcProvider(bleTestnetRPC);

const usdeSepolia = new ethers.Contract(
  "0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696", // Sepolia USDe Address
  ["function approve(address spender, uint256 amount) public returns (bool)"],
  sepoliaProvider
);

const usdeAdapterSepolia = new ethers.Contract(
  "0x162cc96D5E528F3E5Ce02EF3847216a917ba55bb", // Sepolia OFT Adapter
  ["function send(uint256 amount, address to, uint16 dstChainId, bytes calldata adapterParams) public"],
  sepoliaProvider
);


async function sendTokens(amount: string, destinationAddress: string) {
    const signer = sepoliaProvider.getSigner();
    const oftAdapterWithSigner = usdeAdapterSepolia.connect(signer);
  
    const dstChainId = 40330; // LayerZero Chain ID for BLE-Testnet
    const adapterParams = "0x"; 
  
    try {
      const tx = await oftAdapterWithSigner.send(
        ethers.utils.parseUnits(amount, 18),
        destinationAddress,
        dstChainId,
        adapterParams
      );
      console.log("Send TX:", tx);
      await tx.wait();
      console.log("Tokens Sent!");
    } catch (err) {
      console.error("Send Error:", err);
    }
  }

  