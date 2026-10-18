"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import Image from "next/image";
import { AuroraText } from "@/components/magicui/aurora-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import {
  Copy,
  Check,
  ExternalLink,
  Shield,
  Zap,
  Info,
  Wallet,
  Globe,
  Smartphone,
  Layers,
  Heart,
  QrCode,
  Lock,
  ArrowRight,
  AlertTriangle,
  Building2,
  RefreshCw,
  HelpCircle,
  CheckCircle2,
  Coins,
  CircleDollarSign,
  FolderGit,
} from "lucide-react";

// Configuration for BTC and XMR addresses and data
const DONATION_CONFIG = {
  btc: {
    name: "Bitcoin",
    ticker: "BTC",
    symbol: "₿",
    qrImage:
      "/projects/mobile-development/sunrise-signal/donate/bitcoin-qr.png",
    address: "bc1q6mdq36guusf93yvl25k4nhhmk275we48jrs8cm",
    network: "Bitcoin Mainnet (Native SegWit / bech32)",
    exchangeNetworkName: "Bitcoin (BTC)",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    uriScheme: "bitcoin",
    exchangeAvailable: true,
    wallets: [
      {
        name: "BlueWallet",
        platform: "iOS, Android, macOS",
        link: "https://bluewallet.io",
      },
      {
        name: "Electrum",
        platform: "Desktop, Android",
        link: "https://electrum.org",
      },
      {
        name: "Cake Wallet",
        platform: "iOS, Android, Desktop",
        link: "https://cakewallet.com",
      },
    ],
    selfCustodySteps: [
      {
        title: "Download a Non-Custodial BTC Wallet",
        description:
          "Install BlueWallet, Electrum, or Cake Wallet on your mobile or desktop device.",
      },
      {
        title: "Acquire Bitcoin",
        description:
          "Receive BTC into your wallet or purchase directly through peer-to-peer/in-app options.",
      },
      {
        title: "Scan QR Code or Copy Address",
        description:
          "Tap 'Send' in your wallet app and scan the QR code above or paste our Native SegWit address.",
      },
      {
        title: "Confirm & Send",
        description:
          "Select standard transaction fee priority and broadcast the transaction.",
      },
    ],
    exchangeSteps: [
      {
        title: "Log in to Binance / Exchange",
        description:
          "Open Binance, Coinbase, Kraken, or your preferred crypto exchange app.",
      },
      {
        title: "Buy Bitcoin (BTC)",
        description:
          "Go to Buy Crypto, select BTC, and purchase using your credit/debit card, bank transfer, or balance.",
      },
      {
        title: "Navigate to Withdraw / Send",
        description:
          "Go to your Wallet -> Spot Wallet -> Withdraw -> Select BTC.",
      },
      {
        title: "Paste Address & Select BTC Network",
        description:
          "Paste our copied address and Send. IMPORTANT: Choose network 'BTC' or 'Bitcoin' (do NOT select BEP20/BSC or Lightning).",
      },
    ],
  },
  xmr: {
    name: "Monero",
    ticker: "XMR",
    symbol: "ɱ",
    qrImage: "/projects/mobile-development/sunrise-signal/donate/monero-qr.png",
    address:
      "8AahK9CYhPrKZcHDUdYtyc33K8CZyN9aBPufwe4DS8irPPzXKkHyxX71xwx8gvEtBE4Sr1NMZrtDwLq6yZqFdJ2nEsoAAgW",
    network: "Monero Mainnet (Private & Untraceable)",
    exchangeNetworkName: "Monero (XMR)",
    badgeColor: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    uriScheme: "monero",
    exchangeAvailable: false,
    wallets: [
      {
        name: "Cake Wallet",
        platform: "iOS, Android, Desktop",
        link: "https://cakewallet.com",
      },
      {
        name: "Feather Wallet",
        platform: "Desktop (Linux, Win, Mac)",
        link: "https://featherwallet.org",
      },
      {
        name: "Monerujo",
        platform: "Android",
        link: "https://www.monerujo.io",
      },
    ],
    selfCustodySteps: [
      {
        title: "Get a Monero Wallet",
        description:
          "Install Feather Wallet (Desktop), Cake Wallet, or Monerujo (Android).",
      },
      {
        title: "Obtain Monero (XMR)",
        description:
          "Transfer XMR from an exchange or swap crypto inside Cake Wallet / SideShift.",
      },
      {
        title: "Scan QR Code or Paste Address",
        description:
          "In your Monero wallet, tap 'Send' and scan our QR code or paste our address.",
      },
      {
        title: "Send Privately",
        description:
          "Confirm sending. RingCT and Stealth Addresses ensure complete privacy.",
      },
    ],
    exchangeSteps: [
      {
        title: "Check Exchange XMR Availability",
        description:
          "If your exchange (e.g. Kraken or local exchange) supports direct XMR withdrawal, go to Withdraw -> XMR.",
      },
      {
        title: "Alternative: Buy BTC/USDT on Binance",
        description:
          "If your exchange delisted XMR in your region, buy BTC or USDT on Binance/Coinbase first.",
      },
      {
        title: "Use Instant Swap (SideShift / ChangeNOW)",
        description:
          "Go to SideShift.ai, ChangeNOW.io, or use the Exchange tab inside Cake Wallet.",
      },
      {
        title: "Set Destination & Pay",
        description:
          "Select 'Send USDT/BTC -> Receive XMR'. Input our Monero address as the destination, then send crypto from Binance to the swap address provided.",
      },
    ],
  },
};

export default function Page() {
  const [selectedCrypto, setSelectedCrypto] = useState("btc");
  const [guideMethod, setGuideMethod] = useState("exchange"); // 'exchange' | 'wallet'
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const activeData = DONATION_CONFIG[selectedCrypto];

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setToastMessage(`${label} address copied to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <>
      <Navbar />

      <section className="container mx-auto px-4 py-12 md:py-24 max-w-6xl overflow-hidden">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 shadow-2xl animate-bounce">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <BlurFade delay={0.2} inView>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
              <AuroraText>Donate to Sunrise Signal</AuroraText>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mt-4">
              Sunrise Signal is an open-source, privacy-focused morning wood
              tracking app. Built with zero tracking, no cloud telemetry, and
              zero ads.
            </p>
          </BlurFade>

          {/* Feature Badges */}
          <BlurFade delay={0.4} inView>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <CircleDollarSign className="w-4 h-4 text-sky-400" />
                <span>Free</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <FolderGit className="w-4 h-4 text-purple-400" />
                <span>Open Source</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>F-Droid Compliant</span>
              </div>
              {/* <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>Web Platform</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Cross Desktop</span>
              </div> */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Zero Telemetry</span>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* DONATION STATION (Crypto Interface) */}
        <BlurFade delay={0.5} inView>
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden mb-16">
            <div className="max-w-4xl mx-auto">
              {/* Crypto Currency Switcher */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-amber-500 fill-amber-500/20" />
                    <span>Crypto Donation Station</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Select your preferred cryptocurrency to view wallet details
                  </p>
                </div>

                <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedCrypto("btc")}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      selectedCrypto === "btc"
                        ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="font-mono text-base">₿</span>
                    <span>Bitcoin</span>
                  </button>
                  <button
                    onClick={() => setSelectedCrypto("xmr")}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      selectedCrypto === "xmr"
                        ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="font-mono text-base">ɱ</span>
                    <span>Monero</span>
                  </button>
                </div>
              </div>

              {/* QR and Address Display Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-950/70 rounded-2xl p-6 sm:p-8 border border-slate-800/80">
                {/* QR Code Column */}
                <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
                  <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-slate-800 mb-3 relative group">
                    <Image
                      src={activeData.qrImage}
                      width={240}
                      height={240}
                      alt={`${activeData.name} Donation QR Code`}
                      className="w-52 h-52 md:w-60 md:h-60 object-contain rounded-2xl"
                      priority
                    />
                  </div>
                  <span className="text-sm text-slate-500 font-mono flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" /> Scan with wallet or
                    exchange app
                  </span>
                </div>

                {/* Address Details Column */}
                <div className="md:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-sm font-mono font-bold border ${activeData.badgeColor}`}
                    >
                      {activeData.ticker}
                    </span>
                    <span className="text-sm text-slate-400 font-mono">
                      {activeData.network}
                    </span>
                  </div>

                  <label className="text-sm text-slate-400 font-medium mb-1.5 block">
                    {activeData.name} Wallet Address
                  </label>

                  {/* Address Text Box */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-5 flex items-center gap-2 overflow-hidden">
                    <span className="font-mono text-sm text-amber-300 break-all select-all flex-1">
                      {activeData.address}
                    </span>
                  </div>

                  {/* Buttons with InteractiveHoverButton */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <div
                      onClick={() =>
                        handleCopy(activeData.address, activeData.name)
                      }
                      className="cursor-pointer"
                    >
                      <InteractiveHoverButton className="text-sm">
                        {copied ? "Copied!" : "Copy Address"}
                      </InteractiveHoverButton>
                    </div>

                    <a
                      href={`${activeData.uriScheme}:${activeData.address}`}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Wallet URI</span>
                    </a>
                  </div>

                  {/* Network Notice */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-start gap-2.5 text-sm text-amber-300">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      {selectedCrypto === "btc"
                        ? "Send native Bitcoin (BTC). Do not send wrapped tokens (WBTC) or use Binance Smart Chain (BEP20)."
                        : "Send Monero (XMR) directly to our mainnet address. No payment ID or memo required."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* ROBUST HOW-TO DONATE SECTION (BINANCE & EXCHANGES VS SELF-CUSTODY) */}
        <section className="mb-20">
          <BlurFade delay={0.6} inView>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl font-bold text-slate-100 mb-2">
                Step-by-Step Donation Guides
              </h2>
              <p className="text-slate-400 text-sm">
                Choose how you prefer to donate: directly from an exchange
                (Binance, Coinbase, Kraken) or using a private wallet.
              </p>
            </div>

            {/* Guide Method Selector Tabs */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setGuideMethod("exchange")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                    guideMethod === "exchange"
                      ? "bg-slate-800 text-amber-400 border border-amber-500/30 shadow-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Via Binance / Exchanges (Easiest)</span>
                </button>
                <button
                  onClick={() => setGuideMethod("wallet")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                    guideMethod === "wallet"
                      ? "bg-slate-800 text-amber-400 border border-amber-500/30 shadow-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>Via Self-Custody Wallet</span>
                </button>
              </div>
            </div>
          </BlurFade>

          {/* Guide Content: Exchange Method */}
          {guideMethod === "exchange" && (
            <BlurFade delay={0.7} inView>
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">
                      Donating via Binance, Coinbase, Kraken, or OKX
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Withdraw directly from your exchange account to our
                      address in under 3 minutes
                    </p>
                  </div>
                </div>

                {/* Steps Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {activeData.exchangeSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-sm font-bold mb-3">
                          Step 0{idx + 1}
                        </span>
                        <h4 className="font-bold text-slate-200 text-sm mb-2">
                          {step.title}
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exchange Specific Nuances & Warnings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Important Warning Card */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-200/90 leading-relaxed">
                      <strong className="text-amber-400 font-bold block mb-1">
                        Network Selection Warning (Binance Users)
                      </strong>
                      When withdrawing Bitcoin from Binance, select network{" "}
                      <strong>"BTC" (Bitcoin)</strong>. Do NOT select BEP20
                      (Binance Smart Chain) or ERC20, as those funds will not
                      arrive at a native Bitcoin address.
                    </div>
                  </div>

                  {/* Monero Exchange Nuance Card */}
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-orange-200/90 leading-relaxed">
                      <strong className="text-orange-400 font-bold block mb-1">
                        Monero (XMR) Exchange Regional Limits
                      </strong>
                      Some exchanges (like Binance in certain EU/US regions)
                      restrict direct XMR withdrawals. You can easily buy USDT
                      or BTC on Binance, then use <strong>SideShift.ai</strong>{" "}
                      or <strong>ChangeNOW.io</strong> to swap directly to our
                      Monero address.
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          )}

          {/* Guide Content: Self-Custody Wallet Method */}
          {guideMethod === "wallet" && (
            <BlurFade delay={0.7} inView>
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">
                      Donating via Private Self-Custody Wallet
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Complete control and maximum privacy using open-source
                      wallets
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {activeData.selfCustodySteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80"
                    >
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-sm font-bold mb-3">
                        Step 0{idx + 1}
                      </span>
                      <h4 className="font-bold text-slate-200 text-sm mb-2">
                        {step.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recommended Wallets Grid */}
                <div>
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                    Recommended Open-Source {activeData.name} Wallets
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activeData.wallets.map((wallet, idx) => (
                      <a
                        key={idx}
                        href={wallet.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors group flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-slate-200 text-sm group-hover:text-amber-400 transition-colors block">
                            {wallet.name}
                          </span>
                          <span className="text-sm text-slate-500">
                            {wallet.platform}
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          )}
        </section>
      </section>

      <FooterSection />
    </>
  );
}
