'use client'

import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ArrowRight, Wallet } from 'lucide-react'

// Proper type definitions
interface Wallet {
  address: string;
  signer: ethers.Signer;
}

// Contract ABIs and Addresses
const USDe_BLE_TESTNET_ADDRESS = '0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE'
const USDe_SEPOLIA_EID = 40161

const OFT_ABI = [
  {
    "inputs": [
      {
        "components": [
          {"type": "uint32", "name": "dstEid"},
          {"type": "bytes32", "name": "to"},
          {"type": "uint256", "name": "amountLD"},
          {"type": "uint256", "name": "minAmountLD"},
          {"type": "bytes", "name": "extraOptions"},
          {"type": "bytes", "name": "composeMsg"},
          {"type": "bytes", "name": "dstUserMsg"}
        ],
        "type": "tuple",
        "name": "param"
      },
      {"type": "bool", "name": "payInLzToken"}
    ],
    "name": "quoteSend",
    "outputs": [
      {
        "components": [
          {"type": "uint256", "name": "nativeFee"},
          {"type": "uint256", "name": "lzTokenFee"}
        ],
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {"type": "uint32", "name": "dstEid"},
          {"type": "bytes32", "name": "to"},
          {"type": "uint256", "name": "amountLD"},
          {"type": "uint256", "name": "minAmountLD"},
          {"type": "bytes", "name": "extraOptions"},
          {"type": "bytes", "name": "composeMsg"},
          {"type": "bytes", "name": "dstUserMsg"}
        ],
        "type": "tuple",
        "name": "param"
      },
      {
        "components": [
          {"type": "uint256", "name": "nativeFee"},
          {"type": "uint256", "name": "lzTokenFee"}
        ],
        "type": "tuple",
        "name": "fee"
      },
      {"type": "address", "name": "refundAddress"}
    ],
    "name": "send",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

export default function USDeBridgePage() {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [balance, setBalance] = useState<string>('0')
  const [bridgeAmount, setBridgeAmount] = useState<string>('')
  const [messageFee, setMessageFee] = useState<ethers.BigNumber | null>(null)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [isBridging, setIsBridging] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Wallet Connection
  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request<string[]>({ 
          method: 'eth_requestAccounts' 
        })
        
        if (!accounts || accounts.length === 0) {
          throw new Error('No accounts found')
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const signer = provider.getSigner()
        const network = await provider.getNetwork()
        
        if (network.chainId !== 52085143) {
          setErrorMessage('Please switch to Ble Testnet')
        }

        if (accounts[0]) {
          setWallet({
            address: accounts[0],
            signer: signer
          })
          await fetchUSDeBalance(signer, accounts[0])
        }
      } else {
        setErrorMessage('MetaMask not found. Please install MetaMask.')
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred while connecting wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const fetchUSDeBalance = async (signer: ethers.Signer, address: string) => {
    try {
      const usdContract = new ethers.Contract(
        USDe_BLE_TESTNET_ADDRESS, 
        ['function balanceOf(address) view returns (uint256)'], 
        signer
      )
      const balance = await usdContract.balanceOf(address)
      setBalance(ethers.utils.formatUnits(balance, 18))
    } catch (error) {
      console.error('Balance fetch error:', error)
      setErrorMessage('Failed to fetch balance')
    }
  }

  useEffect(() => {
    const quoteBridgeFee = async () => {
      if (!wallet || !bridgeAmount || isNaN(Number(bridgeAmount)) || Number(bridgeAmount) <= 0) {
        setMessageFee(null)
        return
      }

      try {
        const contract = new ethers.Contract(
          USDe_BLE_TESTNET_ADDRESS, 
          OFT_ABI, 
          wallet.signer
        )

        const sendParam = {
          dstEid: USDe_SEPOLIA_EID,
          to: ethers.utils.hexZeroPad(wallet.address, 32),
          amountLD: ethers.utils.parseUnits(bridgeAmount, 18),
          minAmountLD: ethers.utils.parseUnits(bridgeAmount, 18).mul(99).div(100),
          extraOptions: '0x0003010011010000000000000000000000000000ea60',
          composeMsg: '0x',
          dstUserMsg: '0x'
        }

        const quote = await contract.quoteSend(sendParam, false)
        setMessageFee(quote.nativeFee)
        setErrorMessage('')
      } catch (error: any) {
        setErrorMessage('Failed to quote bridge fee: ' + error.message)
        setMessageFee(null)
      }
    }

    quoteBridgeFee()
  }, [wallet, bridgeAmount])

  const bridgeTokens = async () => {
    if (!wallet || !messageFee) return

    setIsBridging(true)
    try {
      const contract = new ethers.Contract(
        USDe_BLE_TESTNET_ADDRESS, 
        OFT_ABI, 
        wallet.signer
      )

      const sendParam = {
        dstEid: USDe_SEPOLIA_EID,
        to: ethers.utils.hexZeroPad(wallet.address, 32),
        amountLD: ethers.utils.parseUnits(bridgeAmount, 18),
        minAmountLD: ethers.utils.parseUnits(bridgeAmount, 18).mul(99).div(100),
        extraOptions: '0x0003010011010000000000000000000000000000ea60',
        composeMsg: '0x',
        dstUserMsg: '0x'
      }

      const tx = await contract.send(
        sendParam, 
        { nativeFee: messageFee, lzTokenFee: ethers.BigNumber.from(0) }, 
        wallet.address,
        { value: messageFee }
      )

      await tx.wait()
      setErrorMessage('')
      setBridgeAmount('')
      setMessageFee(null)
      await fetchUSDeBalance(wallet.signer, wallet.address)
    } catch (error: any) {
      setErrorMessage('Bridge failed: ' + error.message)
    } finally {
      setIsBridging(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a2f1f] text-[#e0d4b4] py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="bg-[#1a4f3f] border-[#2a5f4f] shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#c9b037]">
              USDe Bridge
              <p className="text-sm font-normal text-[#b0a484] mt-2">
                Ble Testnet → Sepolia
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!wallet ? (
              <Button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f]"
              >
                {isConnecting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...</>
                ) : (
                  <><Wallet className="mr-2 h-4 w-4" /> Connect Wallet</>
                )}
              </Button>
            ) : (
              <>
                <div className="space-y-2 p-4 bg-[#0f3f2f] rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#b0a484]">Address</span>
                    <span className="font-mono">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#b0a484]">USDe Balance</span>
                    <span>{parseFloat(balance).toFixed(4)} USDe</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#c9b037]">Bridge Amount</label>
                  <Input 
                    type="number"
                    value={bridgeAmount}
                    onChange={(e) => setBridgeAmount(e.target.value)}
                    placeholder="Enter amount to bridge"
                    className="bg-[#0f3f2f] border-[#2a5f4f] text-[#e0d4b4] placeholder-[#b0a484]"
                  />
                </div>

                {messageFee && (
                  <div className="p-4 bg-[#0f3f2f] rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#b0a484]">Bridge Fee</span>
                      <span>{ethers.utils.formatEther(messageFee)} ETH</span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={bridgeTokens}
                  disabled={!messageFee || isBridging}
                  className="w-full bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f]"
                >
                  {isBridging ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Bridging...</>
                  ) : (
                    <><ArrowRight className="mr-2 h-4 w-4" /> Bridge Tokens</>
                  )}
                </Button>
              </>
            )}

            {errorMessage && (
              <Alert className="bg-[#4f3f1a] border-[#5f4f2a]">
                <AlertDescription className="text-[#e0d4b4]">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}