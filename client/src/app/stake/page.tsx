'use client'

import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, DollarSign, Wallet, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react'
import { MetaMaskInpageProvider } from "@metamask/providers"

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

// Contract addresses
const USDE_ADDRESS = "0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696"
const SUSDE_ADDRESS = "0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b"

// Simplified ABI for the required functions
const USDE_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)"
]

const SUSDE_ABI = [
  "function deposit(uint256 assets, address receiver) returns (uint256)",
  "function cooldownShares(uint256 shares)",
  "function cooldownAssets(uint256 assets)",
  "function unstake(address receiver)",
  "function cooldownDuration() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)"
]

interface Balances {
  usde: string
  susde: string
}

interface LoadingStates {
  approve: boolean
  stake: boolean
  cooldownShares: boolean
  cooldownAssets: boolean
  unstake: boolean
}

export default function StakingPage() {
  const [amount, setAmount] = useState<string>('')
  const [loading, setLoading] = useState<LoadingStates>({
    approve: false,
    stake: false,
    cooldownShares: false,
    cooldownAssets: false,
    unstake: false
  })
  const [cooldownDuration, setCooldownDuration] = useState<string>('')
  const [balances, setBalances] = useState<Balances>({ usde: '0', susde: '0' })
  const [address, setAddress] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    const fetchCooldownDuration = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com')
        const sUsdeContract = new ethers.Contract(SUSDE_ADDRESS, SUSDE_ABI, provider)
        const duration = await sUsdeContract.cooldownDuration()
        setCooldownDuration(duration.toString())
      } catch (error) {
        console.error('Error fetching cooldown duration:', error)
      }
    }

    fetchCooldownDuration()
  }, [])

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0xaa36a7') {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }]
          });
        }
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        }) as string[]
        
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0])
          await updateBalances(accounts[0])
        } else {
          throw new Error('No accounts found')
        }
      } else {
        setStatus('Please install MetaMask to use this dApp')
      }
    } catch (error) {
      setStatus('Error connecting wallet')
      console.error(error)
    }
  }

  const updateBalances = async (userAddress: string) => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed')
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum as any)
      const usdeContract = new ethers.Contract(USDE_ADDRESS, USDE_ABI, provider)
      const sUsdeContract = new ethers.Contract(SUSDE_ADDRESS, SUSDE_ABI, provider)

      const usdeBalance = await usdeContract.balanceOf(userAddress)
      const susdeBalance = await sUsdeContract.balanceOf(userAddress)

      setBalances({
        usde: ethers.utils.formatEther(usdeBalance),
        susde: ethers.utils.formatEther(susdeBalance)
      })
    } catch (error) {
      console.error('Error updating balances:', error)
    }
  }

  const getProvider = () => {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed')
    }
    return new ethers.providers.Web3Provider(window.ethereum as any)
  }

  const approveUSDe = async () => {
    try {
      setLoading(prev => ({ ...prev, approve: true }))
      const provider = getProvider()
      const signer = provider.getSigner()
      const usdeContract = new ethers.Contract(USDE_ADDRESS, USDE_ABI, signer)

      const tx = await usdeContract.approve(
        SUSDE_ADDRESS,
        ethers.utils.parseEther(amount)
      )
      await tx.wait()
      setStatus('USDe approved successfully')
    } catch (error) {
      setStatus('Error approving USDe')
      console.error(error)
    } finally {
      setLoading(prev => ({ ...prev, approve: false }))
    }
  }

  const stakeUSDe = async () => {
    try {
      setLoading(prev => ({ ...prev, stake: true }))
      const provider = getProvider()
      const signer = provider.getSigner()
      const sUsdeContract = new ethers.Contract(SUSDE_ADDRESS, SUSDE_ABI, signer)

      const tx = await sUsdeContract.deposit(
        ethers.utils.parseEther(amount),
        address
      )
      await tx.wait()
      setStatus('USDe staked successfully')
      await updateBalances(address)
    } catch (error) {
      setStatus('Error staking USDe')
      console.error(error)
    } finally {
      setLoading(prev => ({ ...prev, stake: false }))
    }
  }

  const cooldownSharesHandler = async () => {
    try {
      setLoading(prev => ({ ...prev, cooldownShares: true }))
      const provider = getProvider()
      const signer = provider.getSigner()
      const sUsdeContract = new ethers.Contract(SUSDE_ADDRESS, SUSDE_ABI, signer)

      const tx = await sUsdeContract.cooldownShares(ethers.utils.parseEther(amount))
      await tx.wait()
      setStatus('Cooldown initiated for shares')
    } catch (error) {
      setStatus('Error initiating shares cooldown')
      console.error(error)
    } finally {
      setLoading(prev => ({ ...prev, cooldownShares: false }))
    }
  }

  const cooldownAssetsHandler = async () => {
    try {
      setLoading(prev => ({ ...prev, cooldownAssets: true }))
      const provider = getProvider()
      const signer = provider.getSigner()
      const sUsdeContract = new ethers.Contract(SUSDE_ADDRESS, SUSDE_ABI, signer)

      const tx = await sUsdeContract.cooldownAssets(ethers.utils.parseEther(amount))
      await tx.wait()
      setStatus('Cooldown initiated for assets')
    } catch (error) {
      setStatus('Error initiating assets cooldown')
      console.error(error)
    } finally {
      setLoading(prev => ({ ...prev, cooldownAssets: false }))
    }
  }

  const unstake = async () => {
    try {
      setLoading(prev => ({ ...prev, unstake: true }))
      const provider = getProvider()
      const signer = provider.getSigner()
      const sUsdeContract = new ethers.Contract(SUSDE_ADDRESS, SUSDE_ABI, signer)

      const tx = await sUsdeContract.unstake(address)
      await tx.wait()
      setStatus('Unstaking successful')
      await updateBalances(address)
    } catch (error) {
      setStatus('Error unstaking')
      console.error(error)
    } finally {
      setLoading(prev => ({ ...prev, unstake: false }))
    }
  }

  return (
    <div className="min-h-screen bg-[#0a2f1f] text-[#e0d4b4] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-[#1a4f3f] border-[#2a5f4f] shadow-lg">
          <CardHeader className="border-b border-[#2a5f4f]">
            <CardTitle className="text-3xl font-serif text-[#c9b037]">USDe Staking Interface</CardTitle>
            <CardDescription className="text-[#b0a484]">Interact with USDe and sUSDe on Sepolia testnet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#c9b037]">Connected Address</p>
                <p className="text-lg font-mono">{address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'Not Connected'}</p>
              </div>
              <Button 
                onClick={connectWallet}
                className="bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f]"
                disabled={!!address}
              >
                {address ? 'Connected' : 'Connect Wallet'}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-[#0f3f2f] border-[#2a5f4f]">
                <CardContent className="p-4 flex items-center space-x-4">
                  <DollarSign className="h-10 w-10 text-[#c9b037]" />
                  <div>
                    <p className="text-sm font-medium text-[#c9b037]">USDe Balance</p>
                    <p className="text-2xl font-bold">{parseFloat(balances.usde).toFixed(4)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#0f3f2f] border-[#2a5f4f]">
                <CardContent className="p-4 flex items-center space-x-4">
                  <Wallet className="h-10 w-10 text-[#c9b037]" />
                  <div>
                    <p className="text-sm font-medium text-[#c9b037]">sUSDe Balance</p>
                    <p className="text-2xl font-bold">{parseFloat(balances.susde).toFixed(4)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-grow bg-[#0a2f1f] border-[#2a5f4f] text-[#e0d4b4] placeholder-[#b0a484]"
                />
                <Button 
                  onClick={approveUSDe} 
                  disabled={loading.approve || !amount}
                  className="bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f]"
                >
                  {loading.approve ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Approve'}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={stakeUSDe} 
                  disabled={loading.stake || !amount}
                  className="bg-[#0f3f2f] hover:bg-[#1a4f3f] border border-[#c9b037] text-[#c9b037]"
                >
                  {loading.stake ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ArrowUpRight className="mr-2 h-4 w-4" /> Stake USDe</>}
                </Button>
                <Button 
                  onClick={unstake} 
                  disabled={loading.unstake} 
                  className="bg-[#0f3f2f] hover:bg-[#1a4f3f] border border-[#c9b037] text-[#c9b037]"
                >
                  {loading.unstake ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ArrowDownRight className="mr-2 h-4 w-4" /> Unstake</>}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-[#c9b037]">Cooldown Options</p>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={cooldownSharesHandler} 
                  disabled={loading.cooldownShares || !amount}
                  className="bg-[#0f3f2f] hover:bg-[#1a4f3f] border border-[#c9b037] text-[#c9b037]"
                >
                  {loading.cooldownShares ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Clock className="mr-2 h-4 w-4" /> Cooldown Shares</>}
                </Button>
                <Button 
                  onClick={cooldownAssetsHandler} 
                  disabled={loading.cooldownAssets || !amount}
                  className="bg-[#0f3f2f] hover:bg-[#1a4f3f] border border-[#c9b037] text-[#c9b037]"
                >
                  {loading.cooldownAssets ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Clock className="mr-2 h-4 w-4" /> Cooldown Assets</>}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 border-t border-[#2a5f4f] pt-4">
            <p className="text-sm text-[#b0a484]">
              Cooldown Duration: {cooldownDuration ? `${Number(cooldownDuration)} seconds` : 'Loading...'}
            </p>
            {status && (
              <Alert className="bg-[#0f3f2f] border-[#2a5f4f]">
                <AlertDescription className="text-[#e0d4b4]">{status}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}