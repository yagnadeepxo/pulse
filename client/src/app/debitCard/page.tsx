import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CreditCard, Wallet, Shield } from 'lucide-react'

const CardDisplay = () => (
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
)

export default function USDeCryptoCardPage() {
  return (
    <div className="min-h-screen bg-[#0a2f1f] text-[#e0d4b4]">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-4xl font-serif font-bold mb-8 text-center text-[#c9b037]">Experience the Future of Payments</h2>
          <div className="flex justify-center items-center">
            <CardDisplay />
          </div>
        </section>

        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
              <CardContent className="p-6 text-center">
                <CreditCard className="w-12 h-12 text-[#c9b037] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#c9b037]">Pay What You See</h3>
                <p className="text-[#b0a484]">Zero hidden fees. Transparent transactions, always.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
              <CardContent className="p-6 text-center">
                <Wallet className="w-12 h-12 text-[#c9b037] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#c9b037]">Your Name, Your Card</h3>
                <p className="text-[#b0a484]">Personalized card with your name, reflecting your unique identity.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a4f3f] border-[#2a5f4f]">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-[#c9b037] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#c9b037]">Your Keys, Your Assets</h3>
                <p className="text-[#b0a484]">Maintain full control of your crypto assets with our secure technology.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold mb-4 text-[#c9b037]">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join the crypto revolution with USDe Crypto Debit Card. Seamless transactions, unparalleled control.</p>
          <Button size="lg" className="bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f] text-lg px-8 py-6">
              coming soon 
          </Button>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center text-[#c9b037]">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-[#c9b037] rounded-full p-2">
                <CreditCard className="w-6 h-6 text-[#0a2f1f]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#c9b037]">Global Acceptance</h3>
                <p className="text-[#b0a484]">Use your USDe card anywhere Visa is accepted worldwide.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#c9b037] rounded-full p-2">
                <Wallet className="w-6 h-6 text-[#0a2f1f]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#c9b037]">Instant Crypto-to-Fiat</h3>
                <p className="text-[#b0a484]">Convert your crypto to fiat instantly at the point of sale.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#c9b037] rounded-full p-2">
                <Shield className="w-6 h-6 text-[#0a2f1f]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#c9b037]">Enhanced Security</h3>
                <p className="text-[#b0a484]">Advanced encryption and multi-factor authentication to protect your assets.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#c9b037] rounded-full p-2">
                <ArrowRight className="w-6 h-6 text-[#0a2f1f]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#c9b037]">Real-time Tracking</h3>
                <p className="text-[#b0a484]">Monitor your transactions and balance in real-time through our mobile app.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}