'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Percent, Lock, TrendingUp, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function USDeSavingsLanding() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const calculateEarnings = () => {
    // Add your earnings calculation logic here
    setEarnings(depositAmount + (depositAmount * 0.15));
  }

  return (
    <div className="min-h-screen bg-[#0a2f1f] text-[#e0d4b4]">
      <main>
        <section className="py-20 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-[#0a2f1f] bg-opacity-70"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-5xl font-serif font-bold mb-6">Earn 15% APY with USDe Savings</h2>
              <p className="text-xl mb-8">Deposit USDe and mint sUSDe to start earning high yields today. Secure, stable, and seamless.</p>
              <Link 
  href="/stake" 
  className="inline-flex items-center justify-center bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f] text-lg px-8 py-3 rounded-md transition-colors duration-300"
>
  stake now<ArrowRight className="ml-2" />
</Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-[#0f3f2f]">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-serif font-bold mb-12 text-center">Why Choose USDe Savings?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardContent className="p-6 text-center">
                  <Percent className="w-12 h-12 text-[#c9b037] mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">15% APY</h4>
                  <p className="text-[#b0a484]">Earn industry-leading interest rates on your USDe deposits.</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardContent className="p-6 text-center">
                  <Lock className="w-12 h-12 text-[#c9b037] mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Secure Storage</h4>
                  <p className="text-[#b0a484]">Your funds are protected by state-of-the-art security measures.</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-[#c9b037] mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Compound Interest</h4>
                  <p className="text-[#b0a484]">Watch your savings grow faster with daily compound interest.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-[#0a2f1f]">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-serif font-bold mb-12 text-center">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#c9b037] rounded-full flex items-center justify-center text-[#0a2f1f] text-2xl font-bold mx-auto mb-4">1</div>
                <h4 className="text-xl font-semibold mb-2">Deposit USDe</h4>
                <p className="text-[#b0a484]">Transfer your USDe to your savings account.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#c9b037] rounded-full flex items-center justify-center text-[#0a2f1f] text-2xl font-bold mx-auto mb-4">2</div>
                <h4 className="text-xl font-semibold mb-2">Mint sUSDe</h4>
                <p className="text-[#b0a484]">Your USDe is converted to sUSDe</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#c9b037] rounded-full flex items-center justify-center text-[#0a2f1f] text-2xl font-bold mx-auto mb-4">3</div>
                <h4 className="text-xl font-semibold mb-2">Earn Interest</h4>
                <p className="text-[#b0a484]">Start earning 15% APY, compounded daily.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#0f3f2f]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-4xl font-serif font-bold mb-8 text-center">Calculate Your Earnings</h3>
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <Input
                      type="number"
                      placeholder="Enter deposit amount"
                      className="flex-grow bg-[#0a2f1f] border-[#2a5f4f] text-[#e0d4b4] placeholder-[#b0a484]"
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                    />
                    <Button className="bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f]" onClick={calculateEarnings}>
                      Calculate
                    </Button>
                  </div>
                    <p className="text-3xl text-center text-[#c9b037]">{earnings} USDe</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-[#0a2f1f]">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-serif font-bold mb-12 text-center">Frequently Asked Questions</h3>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardHeader>
                  <CardTitle className="text-[#c9b037]">What is sUSDe?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#e0d4b4]">sUSDe is the interest-bearing token you receive when you deposit USDe into our savings account. It represents your stake in the savings pool and automatically accrues interest.</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardHeader>
                  <CardTitle className="text-[#c9b037]">Is there a minimum deposit?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#e0d4b4]">There is no minimum deposit required to start earning interest. You can begin with any amount of USDe.</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardHeader>
                  <CardTitle className="text-[#c9b037]">How often is interest paid?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#e0d4b4]">Interest is accrued and compounded daily, increasing the value of your sUSDe holdings. You can withdraw your earnings at any time.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#0f3f2f]">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-4xl font-serif font-bold mb-6">Ready to Start Earning?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who are already earning high yields with USDe Savings.</p>
            <Link 
  href="/stake" 
  className="inline-flex items-center justify-center bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f] text-lg px-8 py-3 rounded-md transition-colors duration-300"
>
  Open Your Savings Account Now <ArrowRight className="ml-2" />
</Link>
          </div>
        </section>
      </main>
    </div>
  )
}