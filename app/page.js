'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Shield, Clock, FileCheck, Lock, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[hsl(217,33%,17%)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IB</span>
            </div>
            <span className="text-xl font-semibold text-[hsl(217,33%,17%)]">IntelliOnboard</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-slate-600 hover:text-[hsl(217,33%,17%)] transition-colors">How It Works</a>
            <a href="#security" className="text-slate-600 hover:text-[hsl(217,33%,17%)] transition-colors">Security</a>
            <a href="#faq" className="text-slate-600 hover:text-[hsl(217,33%,17%)] transition-colors">FAQ</a>
            <Link href="/login">
              <Button variant="outline" className="rounded-xl">Resume Application</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <div className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-700 font-medium">
              Trusted by 50,000+ customers
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[hsl(217,33%,17%)] tracking-tight leading-tight">
            Open Your Bank Account
            <br />
            <span className="text-[hsl(180,25%,50%)]">in Minutes</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Secure. Paperless. Hassle-free.
            <br />
            Complete your bank account opening from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login">
              <Button size="lg" className="bg-[hsl(217,33%,17%)] hover:bg-[hsl(217,33%,25%)] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-xl">
                Resume Application
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 pt-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Bank-grade security
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              5 min process
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              100% digital
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(217,33%,17%)] mb-4">How It Works</h2>
            <p className="text-slate-600 text-lg">Three simple steps to your new bank account</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[hsl(217,33%,17%)]">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[hsl(217,33%,17%)] mb-3">Enter Details</h3>
              <p className="text-slate-600 leading-relaxed">
                Fill in your personal information, address, and employment details. We've made it simple and quick.
              </p>
            </Card>
            <Card className="p-8 border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[hsl(217,33%,17%)]">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[hsl(217,33%,17%)] mb-3">Verify Identity</h3>
              <p className="text-slate-600 leading-relaxed">
                Upload your documents and complete a quick video verification. Your data is encrypted and secure.
              </p>
            </Card>
            <Card className="p-8 border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[hsl(217,33%,17%)]">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[hsl(217,33%,17%)] mb-3">Get Approved</h3>
              <p className="text-slate-600 leading-relaxed">
                We'll review your application and get back to you within 24 hours. Welcome to seamless banking!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section id="security" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[hsl(217,33%,17%)] mb-4">Security & Compliance</h2>
              <p className="text-slate-600 text-lg">Your security is our top priority</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-slate-200 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[hsl(217,33%,17%)] mb-2">256-bit Encryption</h3>
                    <p className="text-slate-600 text-sm">All your data is encrypted with bank-grade security protocols</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-slate-200 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[hsl(217,33%,17%)] mb-2">Regulatory Compliant</h3>
                    <p className="text-slate-600 text-sm">Fully compliant with banking regulations and KYC norms</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-slate-200 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[hsl(217,33%,17%)] mb-2">Secure Document Storage</h3>
                    <p className="text-slate-600 text-sm">Your documents are stored securely and never shared</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-slate-200 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[hsl(217,33%,17%)] mb-2">Real-time Verification</h3>
                    <p className="text-slate-600 text-sm">Instant identity verification with advanced AI technology</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[hsl(217,33%,17%)] mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600 text-lg">Everything you need to know</p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-slate-200 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold text-[hsl(217,33%,17%)] hover:no-underline">
                  How long does the account opening process take?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  The entire process usually takes less than 10 minutes to complete. Once submitted, we'll review your application within 24 hours and notify you via email or SMS.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-slate-200 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold text-[hsl(217,33%,17%)] hover:no-underline">
                  What documents do I need?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  You'll need a valid government-issued ID (passport, driver's license, or national ID), proof of address (utility bill or bank statement), and a recent photograph. All documents can be uploaded digitally.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-slate-200 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold text-[hsl(217,33%,17%)] hover:no-underline">
                  Is my personal information safe?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Absolutely. We use 256-bit encryption to protect all your data. Your information is stored securely and never shared with third parties without your consent. We're fully compliant with data protection regulations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border border-slate-200 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold text-[hsl(217,33%,17%)] hover:no-underline">
                  Can I save my progress and return later?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Yes! You can save your application at any step and return to complete it later. Just use the "Resume Application" option on our homepage.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border border-slate-200 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold text-[hsl(217,33%,17%)] hover:no-underline">
                  What types of accounts can I open?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  We offer both Savings and Current accounts. During the application process, you can choose the account type that best suits your needs and customize features like debit card and online banking.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[hsl(217,33%,17%)]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of customers who have already opened their accounts with us. Experience seamless digital banking today.
          </p>
          <Link href="/login">
            <Button size="lg">
              Open Your Account Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-[hsl(217,33%,17%)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IB</span>
              </div>
              <span className="text-lg font-semibold text-[hsl(217,33%,17%)]">IntelliOnboard</span>
            </div>
            <div className="text-sm text-slate-500">
              © 2025 IntelliOnboard. All rights reserved.
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3" />
              SSL Secured
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3" />
              256-bit Encryption
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3" />
              Banking Regulations Compliant
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}