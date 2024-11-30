import { ethers } from "ethers";
import QRCode from "qrcode";
import { SDKConfig } from "./config";

export class PaymentHandler {
    private provider: ethers.providers.JsonRpcProvider;
    private merchantId: string;

    constructor(merchantId: string) {
        this.provider = new ethers.providers.JsonRpcProvider(SDKConfig.rpcUrl);
        this.merchantId = merchantId;
    }

    async generateQRCode(amount: number, merchantAddress: string) {
        const tokenAddress = "0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE"; // USDe token contract address
        const chainId = 52085143;
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);

        // Create the EIP-681 formatted URL
        const url = `ethereum:${tokenAddress}/transfer?address=${merchantAddress}&uint256=${amountInWei.toString()}&chainId=${chainId}`;

        // Generate the QR code image as a data URL
        return await QRCode.toDataURL(url);
    }
}

