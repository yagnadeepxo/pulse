"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_1 = require("@zerodev/sdk");
var constants_1 = require("@zerodev/sdk/constants");
var ecdsa_validator_1 = require("@zerodev/ecdsa-validator");
var viem_1 = require("viem");
var chains_1 = require("viem/chains");
var ethers_1 = require("ethers");
// Configuration
var PROJECT_ID = '98fd43a8-fb2f-4948-a7ae-069f53969f73';
var BUNDLER_RPC = "https://rpc.zerodev.app/api/v2/bundler/".concat(PROJECT_ID);
var PAYMASTER_RPC = "https://rpc.zerodev.app/api/v2/paymaster/".concat(PROJECT_ID);
var USDe_CONTRACT_ADDRESS = "0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE";
var RPC_URL = "https://rpc.zerodev.app";
var chain = chains_1.sepolia;
var entryPoint = (0, constants_1.getEntryPoint)("0.7");
var kernelVersion = constants_1.KERNEL_V3_1;
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider, signer, publicClient, customSigner, ecdsaValidator, account, zerodevPaymaster, kernelClient, accountAddress, recipient, amountToSend, usdeAbi, usdeContract, transferData, userOpHash, _a, _b;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                // Ensure MetaMask is installed
                if (!window.ethereum) {
                    throw new Error("MetaMask is not installed. Please install it and try again.");
                }
                provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
                return [4 /*yield*/, provider.send("eth_requestAccounts", [])];
            case 1:
                _e.sent(); // Request accounts
                signer = provider.getSigner();
                publicClient = (0, viem_1.createPublicClient)({
                    transport: (0, viem_1.http)(RPC_URL),
                    chain: chain,
                });
                _c = {};
                return [4 /*yield*/, signer.getAddress()];
            case 2:
                customSigner = (_c.address = (_e.sent()),
                    _c.signMessage = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
                        var messageToSign, signedMessage;
                        var message = _b.message;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    messageToSign = message instanceof Uint8Array
                                        ? ethers_1.ethers.utils.hexlify(message)
                                        : message;
                                    return [4 /*yield*/, signer.signMessage(messageToSign)];
                                case 1:
                                    signedMessage = _c.sent();
                                    return [2 /*return*/, signedMessage];
                            }
                        });
                    }); },
                    _c);
                return [4 /*yield*/, (0, ecdsa_validator_1.signerToEcdsaValidator)(publicClient, {
                        signer: customSigner,
                        entryPoint: entryPoint,
                        kernelVersion: kernelVersion,
                    })];
            case 3:
                ecdsaValidator = _e.sent();
                return [4 /*yield*/, (0, sdk_1.createKernelAccount)(publicClient, {
                        plugins: {
                            sudo: ecdsaValidator,
                        },
                        entryPoint: entryPoint,
                        kernelVersion: kernelVersion,
                    })];
            case 4:
                account = _e.sent();
                zerodevPaymaster = (0, sdk_1.createZeroDevPaymasterClient)({
                    chain: chain,
                    transport: (0, viem_1.http)(PAYMASTER_RPC),
                });
                kernelClient = (0, sdk_1.createKernelAccountClient)({
                    account: account,
                    chain: chain,
                    bundlerTransport: (0, viem_1.http)(BUNDLER_RPC),
                    paymaster: {
                        getPaymasterData: function (userOperation) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, zerodevPaymaster.sponsorUserOperation({ userOperation: userOperation })];
                            });
                        }); },
                    },
                });
                accountAddress = kernelClient.account.address;
                console.log("My account:", accountAddress);
                recipient = "0xRecipientAddress";
                amountToSend = ethers_1.ethers.utils.parseUnits("100", 18);
                usdeAbi = [
                    "function transfer(address to, uint256 amount) public returns (bool)",
                ];
                usdeContract = new ethers_1.ethers.Contract(USDe_CONTRACT_ADDRESS, usdeAbi, signer);
                return [4 /*yield*/, usdeContract.populateTransaction.transfer(recipient, amountToSend)];
            case 5:
                transferData = _e.sent();
                if (!transferData.data) {
                    throw new Error("Failed to encode transfer data");
                }
                _b = (_a = kernelClient).sendUserOperation;
                _d = {};
                return [4 /*yield*/, kernelClient.account.encodeCalls([
                        {
                            to: USDe_CONTRACT_ADDRESS,
                            value: BigInt(0),
                            data: transferData.data,
                        },
                    ])];
            case 6: return [4 /*yield*/, _b.apply(_a, [(_d.callData = _e.sent(),
                        _d)])];
            case 7:
                userOpHash = _e.sent();
                console.log("UserOp hash:", userOpHash);
                console.log("Waiting for UserOp to complete...");
                return [4 /*yield*/, kernelClient.waitForUserOperationReceipt({
                        hash: userOpHash,
                        timeout: 1000 * 15,
                    })];
            case 8:
                _e.sent();
                console.log("View completed UserOp here: https://jiffyscan.xyz/userOpHash/" + userOpHash);
                return [2 /*return*/];
        }
    });
}); };
// Error handling
main().catch(function (error) {
    console.error("Error:", error);
});
