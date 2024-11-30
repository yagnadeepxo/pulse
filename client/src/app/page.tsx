import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CreditCard, Smartphone, Percent, Shield } from 'lucide-react'
import Link from 'next/link'

export default function USDeLandingPage() {
  // Generate random account number
  const generateAccountNumber = () => {
    return Array(16).fill(0).map(() => Math.floor(Math.random() * 10)).join('')
  }

  // Generate random expiry date
  const generateExpiryDate = () => {
    const now = new Date()
    const futureDate = new Date(now.setFullYear(now.getFullYear() + Math.floor(Math.random() * 4) + 1))
    return `${String(futureDate.getMonth() + 1).padStart(2, '0')}/${String(futureDate.getFullYear()).slice(-2)}`
  }

  const accountNumber = generateAccountNumber()
  const expiryDate = generateExpiryDate()

  return (
    <div className="min-h-screen bg-[#0a2f1f] text-[#e0d4b4]">
      <main>
        <section className="py-20 bg-cover bg-center relative">
          <div className="absolute inset-0 bg-[#0a2f1f] bg-opacity-70"></div>
          <div className="absolute inset-0 border-[#c9b037] border-8 opacity-20 m-8 rounded-lg"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl font-serif font-bold mb-6">Welcome to the Future of Banking</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Experience the perfect blend of traditional banking elegance and cutting-edge crypto technology.</p>
            <Link 
  href="/stake" 
  className="inline-flex items-center justify-center bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f] text-lg px-8 py-3 rounded-md transition-colors duration-300"
>
  Open Your Savings Account Now <ArrowRight className="ml-2" />
</Link>
          </div>
        </section>

        <section className="py-20 bg-[#0f3f2f]">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-serif font-bold mb-12 text-center">Unparalleled Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardContent className="p-6 text-center">
                  <CreditCard className="w-12 h-12 text-[#c9b037] mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Crypto Debit Card</h4>
                  <p className="text-[#b0a484]">Spend your USDe anywhere, anytime with zero fees.</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardContent className="p-6 text-center">
                  <Percent className="w-12 h-12 text-[#c9b037] mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">15% APY Savings</h4>
                  <p className="text-[#b0a484]">Grow your wealth with our high-yield savings account.</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardContent className="p-6 text-center">
                  <Smartphone className="w-12 h-12 text-[#c9b037] mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">QR Code Payments</h4>
                  <p className="text-[#b0a484]">Seamless transactions for merchants and customers alike.</p>
                </CardContent>
              </Card>
              <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-[#c9b037] mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Bank-Grade Security</h4>
                  <p className="text-[#b0a484]">Your assets are protected by state-of-the-art encryption.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#0a2f1f]">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-serif font-bold mb-12 text-center">The Pulse Prestige Card</h3>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <p className="text-xl mb-6">Experience unparalleled financial freedom with our Pulse Prestige Card. Crafted for the discerning individual who demands excellence in every transaction.</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <ArrowRight className="text-[#c9b037] mr-2" />
                    <span>Zero foreign transaction fees</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="text-[#c9b037] mr-2" />
                    <span>Exclusive concierge service</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="text-[#c9b037] mr-2" />
                    <span>Instant crypto-to-fiat conversions</span>
                  </li>
                </ul>
                <Link 
  href="/debitCard" 
  className="inline-flex items-center justify-center bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f] text-lg px-4 py-1 rounded-md transition-colors duration-300"
>
  Apply Now <ArrowRight className="ml-2" />
</Link>
              </div>
              <div className="lg:w-1/2">
                <div className="w-[428px] h-[270px] rounded-xl shadow-2xl overflow-hidden relative mx-auto" aria-label="USDe Prestige Card">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 856 540" className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="royalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0a2f1f"/>
                        <stop offset="50%" stopColor="#1a4f3f"/>
                        <stop offset="100%" stopColor="#0a2f1f"/>
                      </linearGradient>
                      <pattern id="luxuryPattern" x="0" y="0" width="856" height="540" patternUnits="userSpaceOnUse">
                        <path d="M0,0 C213,135 427,135 640,0 S853,135 1066,0" fill="none" stroke="#c9b037" strokeWidth="1.5" opacity="0.3" transform="translate(0,100)"/>
                        <path d="M0,0 C213,135 427,135 640,0 S853,135 1066,0" fill="none" stroke="#c9b037" strokeWidth="1.5" opacity="0.3" transform="translate(0,300)"/>
                      </pattern>
                      <filter id="goldGlow">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <rect width="856" height="540" rx="30" ry="30" fill="url(#royalGradient)"/>
                    <rect width="856" height="540" rx="30" ry="30" fill="url(#luxuryPattern)"/>
                    <g transform="translate(60,80)" filter="url(#goldGlow)">
                      <text x="0" y="0" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="#c9b037" letterSpacing="4">
                        Ethena USDe
                      </text>
                    </g>
                    <g transform="translate(60,180)">
                      <rect width="100" height="80" rx="10" fill="#c9b037" opacity="0.8"/>
                      <rect x="20" y="15" width="60" height="50" fill="none" stroke="#0a2f1f" strokeWidth="2"/>
                      <path d="M30,40 L70,40 M50,20 L50,60" stroke="#0a2f1f" strokeWidth="2"/>
                    </g>

                    <text x="60" y="460" fontFamily="Arial, sans-serif" fontSize="24" fill="#e0d4b4" letterSpacing="2" fontWeight="300">
                      JAMES ANDERSON
                    </text>
                    <g transform="translate(700,430)">
                      <text x="0" y="0" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="#c9b037" filter="url(#goldGlow)">VISA</text>
                    </g>
                    <circle cx="750" cy="120" r="60" fill="none" stroke="#c9b037" strokeWidth="1" opacity="0.3"/>
                    <circle cx="750" cy="120" r="45" fill="none" stroke="#c9b037" strokeWidth="1" opacity="0.3"/>
                    <circle cx="750" cy="120" r="30" fill="none" stroke="#c9b037" strokeWidth="1" opacity="0.3"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#0f3f2f]">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-serif font-bold mb-12 text-center">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#c9b037] rounded-full flex items-center justify-center text-[#0a2f1f] text-2xl font-bold mx-auto mb-4">1</div>
                <h4 className="text-xl font-semibold mb-2">Open Your Account</h4>
                <p className="text-[#b0a484]">Sign up in minutes with our streamlined digital onboarding process.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#c9b037] rounded-full flex items-center justify-center text-[#0a2f1f] text-2xl font-bold mx-auto mb-4">2</div>
                <h4 className="text-xl font-semibold mb-2">Fund Your Account</h4>
                <p className="text-[#b0a484]">Easily transfer funds or deposit crypto to start enjoying our services.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#c9b037] rounded-full flex items-center justify-center text-[#0a2f1f] text-2xl font-bold mx-auto mb-4">3</div>
                <h4 className="text-xl font-semibold mb-2">Experience Freedom</h4>
                <p className="text-[#b0a484]">Use your Pulse card, earn high interest, and enjoy seamless transactions.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#0a2f1f]">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-4xl font-serif font-bold mb-6">Ready to Redefine Your Banking Experience?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who have embraced the future of finance with Pulse</p>
            <Link 
  href="/fiat-ramp" 
  className="inline-flex items-center justify-center bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f] text-lg px-8 py-3 rounded-md transition-colors duration-300"
>
  Buy USDe now <ArrowRight className="ml-2" />
</Link>
          </div>
        </section>

        <section className="py-20 bg-[#0a2f1f]">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-4xl font-serif font-bold mb-6">Ready to Make Your First Payment?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Experience the seamless integration of traditional and crypto payments with USDe Bank.</p>
            <Link href="/123/payment">
              <Button size="lg" className="bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f] text-lg px-8 py-6">
                Start Payment Process <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        
      </main>

    </div>
  )
}