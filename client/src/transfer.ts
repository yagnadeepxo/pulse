import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk";
import { KERNEL_V3_1, getEntryPoint } from "@zerodev/sdk/constants";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { http, createPublicClient, PublicClient, Hash, Account } from "viem";
import { sepolia } from "viem/chains";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";


// Type definitions
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface SignMessageParams {
  message: Uint8Array | string;
}

// Configuration
const PROJECT_ID = '98fd43a8-fb2f-4948-a7ae-069f53969f73';
const BUNDLER_RPC = `https://rpc.zerodev.app/api/v2/bundler/${PROJECT_ID}`;
const PAYMASTER_RPC = `https://rpc.zerodev.app/api/v2/paymaster/${PROJECT_ID}`;
const USDe_CONTRACT_ADDRESS = "0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE";
const RPC_URL = "https://rpc.zerodev.app";

const chain = sepolia;
const entryPoint = getEntryPoint("0.7");
const kernelVersion = KERNEL_V3_1;

const main = async () => {
  // Ensure MetaMask is installed
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed. Please install it and try again.");
  }

  // Initialize MetaMask Provider
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  await provider.send("eth_requestAccounts", []); // Request accounts
  const signer = provider.getSigner();

  // Construct a public client
  const publicClient = createPublicClient({
    transport: http(RPC_URL),
    chain,
  });

  // Custom signer implementation
  const customSigner = {
    address: await signer.getAddress() as `0x${string}`,
    signMessage: async ({ message }: SignMessageParams) => {
      const messageToSign = message instanceof Uint8Array 
        ? ethers.utils.hexlify(message)
        : message;
      const signedMessage = await signer.signMessage(messageToSign);
      return signedMessage as `0x${string}`;
    },
  };

  // Construct a validator
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: customSigner as any, 
    entryPoint,
    kernelVersion,
  });

  // Construct a Kernel account
  const account = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint,
    kernelVersion,
  });

  const zerodevPaymaster = createZeroDevPaymasterClient({
    chain,
    transport: http(PAYMASTER_RPC),
  });

  // Construct a Kernel account client
  const kernelClient = createKernelAccountClient({
    account,
    chain,
    bundlerTransport: http(BUNDLER_RPC),
    paymaster: {
      getPaymasterData: async (userOperation: any) => {
        return zerodevPaymaster.sponsorUserOperation({ userOperation });
      },
    },
  });

  const accountAddress = kernelClient.account.address;
  console.log("My account:", accountAddress);

  // Prepare the USDe transfer call
  const recipient = "0xRecipientAddress"; // Replace with actual recipient address
  const amountToSend = ethers.utils.parseUnits("100", 18); // Amount in USDe (e.g., 100 USDe)

  const usdeAbi = [
    "function transfer(address to, uint256 amount) public returns (bool)",
  ];

  const usdeContract = new ethers.Contract(USDe_CONTRACT_ADDRESS, usdeAbi, signer);
  const transferData = await usdeContract.populateTransaction.transfer(recipient, amountToSend);

  if (!transferData.data) {
    throw new Error("Failed to encode transfer data");
  }

  // Send a UserOp with the transfer call
  const userOpHash = await kernelClient.sendUserOperation({
    callData: await kernelClient.account.encodeCalls([
      {
        to: USDe_CONTRACT_ADDRESS,
        value: BigInt(0),
        data: transferData.data as `0x${string}`,
      },
    ]),
  });

  console.log("UserOp hash:", userOpHash);
  console.log("Waiting for UserOp to complete...");

  await kernelClient.waitForUserOperationReceipt({
    hash: userOpHash,
    timeout: 1000 * 15,
  });

  console.log(
    "View completed UserOp here: https://jiffyscan.xyz/userOpHash/" + userOpHash
  );
};

// Error handling
main().catch((error) => {
  console.error("Error:", error);
}); 