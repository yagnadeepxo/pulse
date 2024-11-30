'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'


interface CurrencyInfo {
  name: string;
  symbol: string;
  flag: string;
}

interface ExchangeRates {
  [key: string]: {
    buy: number;
    sell: number;
  };
}

const FIAT_CURRENCIES: { [key: string]: CurrencyInfo } = {
  USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  INR: { name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  ARS: { name: 'Argentine Peso', symbol: '$', flag: '🇦🇷' },
  TRY: { name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
}

export default function USDESwap() {
  const [fiatCurrency, setFiatCurrency] = useState('USD')
  const [fiatAmount, setFiatAmount] = useState('')
  const [usdeAmount, setUsdeAmount] = useState('')
  const [action, setAction] = useState<'buy' | 'sell'>('buy')
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({})

  useEffect(() => {
    // Simulating API call to fetch exchange rates
    const fetchExchangeRates = async () => {
      // In a real application, you would fetch this data from an API
      const mockRates: ExchangeRates = {
        USD: { buy: 1, sell: 0.99 },
        INR: { buy: 83.25, sell: 82.5 },
        ARS: { buy: 820, sell: 815 },
        TRY: { buy: 30.5, sell: 30.2 },
      }
      setExchangeRates(mockRates)
    }

    fetchExchangeRates()
  }, [])

  const handleFiatAmountChange = (value: string) => {
    setFiatAmount(value)
    if (value && exchangeRates[fiatCurrency]) {
      const rate = action === 'buy' ? exchangeRates[fiatCurrency].buy : exchangeRates[fiatCurrency].sell
      setUsdeAmount((parseFloat(value) / rate).toFixed(2))
    } else {
      setUsdeAmount('')
    }
  }

  const handleUsdeAmountChange = (value: string) => {
    setUsdeAmount(value)
    if (value && exchangeRates[fiatCurrency]) {
      const rate = action === 'buy' ? exchangeRates[fiatCurrency].buy : exchangeRates[fiatCurrency].sell
      setFiatAmount((parseFloat(value) * rate).toFixed(2))
    } else {
      setFiatAmount('')
    }
  }

  const handleSwap = () => {
    setAction(action === 'buy' ? 'sell' : 'buy')
    setFiatAmount('')
    setUsdeAmount('')
  }

  return (
    <div className="min-h-screen bg-[#0a2f1f] text-[#e0d4b4]">

      <main className="container mx-auto px-4 py-12">
        <Card className="bg-[#1a4f3f] border-[#2a5f4f] shadow-xl max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#c9b037]">Swap USDe</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="buy" className="space-y-6" onValueChange={(value) => setAction(value as 'buy' | 'sell')}>
              <TabsList className="grid w-full grid-cols-2 bg-[#0f3f2f]">
                <TabsTrigger value="buy" className="data-[state=active]:bg-[#1a4f3f] data-[state=active]:text-[#c9b037]">Buy USDe</TabsTrigger>
                <TabsTrigger value="sell" className="data-[state=active]:bg-[#1a4f3f] data-[state=active]:text-[#c9b037]">Sell USDe</TabsTrigger>
              </TabsList>
              <TabsContent value="buy" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#c9b037]">You pay</label>
                  <div className="flex space-x-2">
                    <Select value={fiatCurrency} onValueChange={setFiatCurrency}>
                      <SelectTrigger className="w-[120px] bg-[#0f3f2f] border-[#2a5f4f] text-[#e0d4b4]">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a4f3f] border-[#2a5f4f] text-[#e0d4b4]">
                        {Object.entries(FIAT_CURRENCIES).map(([code, { name, flag }]) => (
                          <SelectItem key={code} value={code}>
                            <div className="flex items-center">
                              <span className="mr-2 text-lg">{flag}</span>
                              {code}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={fiatAmount}
                      onChange={(e) => handleFiatAmountChange(e.target.value)}
                      className="flex-grow bg-[#0f3f2f] border-[#2a5f4f] text-[#e0d4b4] placeholder-[#b0a484]"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button onClick={handleSwap} variant="ghost" className="text-[#c9b037]">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Swap
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#c9b037]">You receive</label>
                  <div className="flex space-x-2">
                    <div className="w-[120px] h-[40px] bg-[#0f3f2f] border border-[#2a5f4f] rounded-md flex items-center justify-center">
                      <Image src="/USDe-Symbol-Color.png" alt="USDe" width={24} height={24} className="mr-2" />
                      USDe
                    </div>
                    <Input
                      type="number"
                      value={usdeAmount}
                      onChange={(e) => handleUsdeAmountChange(e.target.value)}
                      className="flex-grow bg-[#0f3f2f] border-[#2a5f4f] text-[#e0d4b4] placeholder-[#b0a484]"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="text-sm text-[#b0a484]">
                  1 USDe = {exchangeRates[fiatCurrency]?.buy.toFixed(2)} {fiatCurrency}
                </div>
                <Button className="w-full bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f]">
                  Buy USDe
                </Button>
              </TabsContent>
              <TabsContent value="sell" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#c9b037]">You sell</label>
                  <div className="flex space-x-2">
                    <div className="w-[120px] h-[40px] bg-[#0f3f2f] border border-[#2a5f4f] rounded-md flex items-center justify-center">
                      <Image src="/USDe-Symbol-Color.png" alt="USDe" width={24} height={24} className="mr-2" />
                      USDe
                    </div>
                    <Input
                      type="number"
                      value={usdeAmount}
                      onChange={(e) => handleUsdeAmountChange(e.target.value)}
                      className="flex-grow bg-[#0f3f2f] border-[#2a5f4f] text-[#e0d4b4] placeholder-[#b0a484]"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button onClick={handleSwap} variant="ghost" className="text-[#c9b037]">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Swap
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#c9b037]">You receive</label>
                  <div className="flex space-x-2">
                    <Select value={fiatCurrency} onValueChange={setFiatCurrency}>
                      <SelectTrigger className="w-[120px] bg-[#0f3f2f] border-[#2a5f4f] text-[#e0d4b4]">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a4f3f] border-[#2a5f4f] text-[#e0d4b4]">
                        {Object.entries(FIAT_CURRENCIES).map(([code, { name, flag }]) => (
                          <SelectItem key={code} value={code}>
                            <div className="flex items-center">
                              <span className="mr-2 text-lg">{flag}</span>
                              {code}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={fiatAmount}
                      onChange={(e) => handleFiatAmountChange(e.target.value)}
                      className="flex-grow bg-[#0f3f2f] border-[#2a5f4f] text-[#e0d4b4] placeholder-[#b0a484]"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="text-sm text-[#b0a484]">
                  1 USDe = {exchangeRates[fiatCurrency]?.sell.toFixed(2)} {fiatCurrency}
                </div>
                <Button className="w-full bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f]">
                  Sell USDe
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}