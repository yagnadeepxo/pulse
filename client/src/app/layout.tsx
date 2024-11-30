import type { Metadata } from "next"
import localFont from "next/font/local"
import Link from "next/link"
import "./globals.css"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Pulse",
  description: "Combining traditional elegance with cutting-edge crypto technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-[#0a2f1f] border-b border-[#2a4f3f]">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
              <Link href="/" className="text-3xl font-serif font-bold text-[#e0d4b4]">
                Pulse
              </Link>
              <div className="space-x-6">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-[#e0d4b4] hover:text-white inline-flex items-center">
                    Features <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1a4f3f] border-[#2a5f4f]">
                    <DropdownMenuItem className="text-[#e0d4b4] hover:text-white hover:underline hover:decoration-[#c9b037] hover:decoration-2">
                      <Link href="/123/payment" className="w-full">payment</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[#e0d4b4] hover:text-white hover:underline hover:decoration-[#c9b037] hover:decoration-2">
                      <Link href="/analytics" className="w-full">Analytics</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[#e0d4b4] hover:text-white hover:underline hover:decoration-[#c9b037] hover:decoration-2">
                      <Link href="/bridge" className="w-full">Bridge</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[#e0d4b4] hover:text-white hover:underline hover:decoration-[#c9b037] hover:decoration-2">
                      <Link href="/savingsAccount" className="w-full">Savings Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[#e0d4b4] hover:text-white hover:underline hover:decoration-[#c9b037] hover:decoration-2">
                      <Link href="/debitCard" className="w-full">Debit Card</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[#e0d4b4] hover:text-white hover:underline hover:decoration-[#c9b037] hover:decoration-2">
                      <Link href="/fiat-ramp" className="w-full">Fiat Ramp</Link>
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/savingsAccount" className="text-[#e0d4b4] hover:text-white hover:underline hover:decoration-[#c9b037] hover:decoration-2">
                  Accounts
                </Link>
                <Link href="/debitCard" className="text-[#e0d4b4] hover:text-white hover:underline hover:decoration-[#c9b037] hover:decoration-2">
                  Cards
                </Link>
                <Link href="/" className="text-[#e0d4b4] hover:text-white hover:underline hover:decoration-[#c9b037] hover:decoration-2">
                  Support
                </Link>
               
              </div>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-[#0f3f2f] py-12 border-t border-[#2a4f3f]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#c9b037]">Products</h4>
                <ul className="space-y-2 text-[#b0a484]">
                  <li><Link href="/accounts" className="hover:text-[#e0d4b4]">Checking Account</Link></li>
                  <li><Link href="/savingsAccount" className="hover:text-[#e0d4b4]">Savings Account</Link></li>
                  <li><Link href="/debitCard" className="hover:text-[#e0d4b4]">Crypto Debit Card</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#c9b037]">Company</h4>
                <ul className="space-y-2 text-[#b0a484]">
                  <li><Link href="/about" className="hover:text-[#e0d4b4]">About Us</Link></li>
                  <li><Link href="/careers" className="hover:text-[#e0d4b4]">Careers</Link></li>
                  <li><Link href="/press" className="hover:text-[#e0d4b4]">Press</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#c9b037]">Resources</h4>
                <ul className="space-y-2 text-[#b0a484]">
                  <li><Link href="/blog" className="hover:text-[#e0d4b4]">Blog</Link></li>
                  <li><Link href="/help" className="hover:text-[#e0d4b4]">Help Center</Link></li>
                  <li><Link href="/contact" className="hover:text-[#e0d4b4]">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#c9b037]">Legal</h4>
                <ul className="space-y-2 text-[#b0a484]">
                  <li><Link href="/privacy" className="hover:text-[#e0d4b4]">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-[#e0d4b4]">Terms of Service</Link></li>
                  <li><Link href="/cookies" className="hover:text-[#e0d4b4]">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-[#2a4f3f] text-center text-[#b0a484]">
              <p>&copy; 2024 Pulse. All rights reserved.</p>
              <p className="mt-2">Combining traditional elegance with cutting-edge crypto technology</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}