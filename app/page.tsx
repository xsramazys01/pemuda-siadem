"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Trophy, Heart, Star, Award, Menu, X, Clock, Target, Gift } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [countdownEnded, setCountdownEnded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsVisible(true)

    // Target date: August 17, 2025 at 00:00:00 WIB (UTC+7)
    const targetDate = new Date("2025-08-17T00:00:00+07:00")

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setCountdownEnded(false)
      } else {
        // Countdown has ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setCountdownEnded(true)
      }
    }

    // Update immediately
    updateCountdown()

    // Set up interval to update every second
    const timer = setInterval(updateCountdown, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(timer)
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base animate-pulse">Memuat halaman...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white overflow-hidden">
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="particle-float particle-1"></div>
        <div className="particle-float particle-2"></div>
        <div className="particle-float particle-3"></div>
        <div className="particle-float particle-4"></div>
        <div className="particle-float particle-5"></div>
        <div className="particle-float particle-6"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-100 shadow-sm animate-slide-down">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 animate-fade-in-left">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg animate-bounce-gentle hover:animate-pulse">
                  <Image
                    src="/images/logo-pemuda-siadem-square.png"
                    alt="Logo Pemuda Siadem"
                    width={32}
                    height={32}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg object-contain"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold text-gray-900 leading-tight animate-fade-in">
                  PANITIA PEMUDA SIADEM
                </h1>
                <p className="text-red-600 text-xs sm:text-sm font-medium animate-fade-in-delay">HUT RI ke-80</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 animate-fade-in-right">
              {[
                { name: "Beranda", href: "/" },
                { name: "Perlombaan", href: "/lomba" },
                { name: "Donasi", href: "/donasi" },
                { name: "Admin", href: "/admin" },
              ].map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium relative group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute inset-0 bg-red-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 active:bg-gray-200 animate-fade-in-right hover:scale-110"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 animate-rotate-in" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 animate-fade-in" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 animate-slide-down">
              <div className="flex flex-col space-y-2 pt-4">
                {[
                  { name: "Beranda", href: "/" },
                  { name: "Perlombaan", href: "/lomba" },
                  { name: "Donasi", href: "/donasi" },
                  { name: "Admin", href: "/admin" },
                ].map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-red-600 active:text-red-700 transition-all duration-300 font-medium px-4 py-3 rounded-lg hover:bg-red-50 active:bg-red-100 text-center animate-fade-in-up hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8 sm:mb-12">
            <Badge className="bg-red-100 text-red-800 border-red-200 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium animate-bounce-in hover:animate-pulse">
              🇮🇩 Peringatan HUT RI ke-80
            </Badge>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent animate-gradient-x animate-fade-in-up">
                SEMARAK
              </span>
              <br />
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl animate-fade-in-up animate-delay-200">
                LOMBA KEMERDEKAAN
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 animate-fade-in-up animate-delay-400">
              Merayakan kemerdekaan Indonesia dengan berbagai perlombaan tradisional yang seru dan menarik
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0 animate-fade-in-up animate-delay-600">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-6 sm:px-8 py-3 text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-all duration-300 animate-pulse-gentle"
              >
                <Link href="/lomba">
                  <Trophy className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-bounce-gentle" />
                  Lihat Perlombaan
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100 px-6 sm:px-8 py-3 bg-transparent text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                <Link href="/donasi">
                  <Heart className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-heartbeat" />
                  Donasi Sekarang
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 leading-tight animate-fade-in-up">
              {countdownEnded ? (
                <>
                  <span className="block sm:inline animate-bounce">🎉 Hari Kemerdekaan</span>
                  <span className="block sm:inline animate-bounce animate-delay-200"> Telah Tiba! 🎉</span>
                </>
              ) : (
                <>
                  <span className="block sm:inline animate-fade-in">Hitung Mundur Menuju</span>
                  <span className="block sm:inline animate-fade-in animate-delay-200"> 17 Agustus 2025</span>
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-2 animate-fade-in-up animate-delay-400">
              {countdownEnded
                ? "Selamat Hari Kemerdekaan Indonesia ke-80! Mari rayakan bersama!"
                : "Bersiaplah untuk merayakan kemerdekaan Indonesia!"}
            </p>
          </div>

          {/* Mobile-First Countdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
            {[
              {
                value: timeLeft.days,
                label: "Hari",
                icon: Calendar,
                color: "text-red-600",
                bgColor: "bg-red-50",
                borderColor: "border-red-200",
              },
              {
                value: timeLeft.hours,
                label: "Jam",
                icon: Clock,
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200",
              },
              {
                value: timeLeft.minutes,
                label: "Menit",
                icon: Target,
                color: "text-yellow-600",
                bgColor: "bg-yellow-50",
                borderColor: "border-yellow-200",
              },
              {
                value: timeLeft.seconds,
                label: "Detik",
                icon: Star,
                color: "text-green-600",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`text-center border-2 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up ${
                  countdownEnded
                    ? "bg-gradient-to-br from-red-50 to-yellow-50 border-red-200 shadow-md animate-celebration"
                    : `border-gray-100 hover:${item.borderColor} ${item.bgColor} animate-float`
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <item.icon
                    className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${item.color} mx-auto mb-2 sm:mb-3 lg:mb-4 ${
                      countdownEnded ? "animate-bounce" : "animate-pulse-gentle"
                    }`}
                  />
                  <div
                    className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 tabular-nums transition-all duration-300 ${
                      countdownEnded ? "text-red-600 animate-pulse" : "text-gray-900 animate-number-change"
                    }`}
                  >
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div
                    className={`${item.color} font-medium uppercase tracking-wide text-xs sm:text-sm animate-fade-in`}
                  >
                    {item.label}
                  </div>
                  {countdownEnded && index === 0 && (
                    <div className="mt-1 sm:mt-2 text-xs text-red-500 font-medium animate-bounce">🎊 MERDEKA! 🎊</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile-Optimized Countdown Status */}
          <div className="text-center mt-6 sm:mt-8 px-4 animate-fade-in-up animate-delay-800">
            {countdownEnded ? (
              <div className="bg-gradient-to-r from-red-100 to-yellow-100 border-2 border-red-200 rounded-xl p-4 sm:p-6 max-w-md mx-auto shadow-lg animate-celebration">
                <p className="text-red-800 font-bold text-sm sm:text-base animate-bounce">
                  🇮🇩 Dirgahayu Indonesia ke-80! 🇮🇩
                </p>
                <p className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2 animate-fade-in animate-delay-200">
                  Mari rayakan kemerdekaan dengan penuh semangat!
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 max-w-md mx-auto hover:shadow-lg transition-all duration-300">
                <p className="text-blue-800 font-semibold text-sm sm:text-base animate-fade-in">
                  ⏰ Countdown aktif dan berjalan
                </p>
                <p className="text-blue-600 text-xs sm:text-sm mt-1 sm:mt-2 animate-fade-in animate-delay-200">
                  Timer akan update setiap detik
                </p>
                <div className="mt-2 sm:mt-3 text-xs text-blue-500 animate-fade-in animate-delay-400">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-ping mr-2"></span>
                  Live Update
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-red-50 relative">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Informasi Acara
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-2">
              Detail lengkap tentang perayaan HUT RI ke-80
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Calendar,
                title: "Tanggal Acara",
                content: "9-10 Agustus 2025",
                description: "Perlombaan & Final 17 Agustus",
              },
              {
                icon: MapPin,
                title: "Lokasi",
                content: "Baperkam Siadem",
                description: "Tempat penyelenggaraan acara",
              },
              {
                icon: Users,
                title: "Penyelenggara",
                content: "Panitia Pemuda Siadem",
                description: "Organisasi pemuda setempat",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-500 bg-white transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 bg-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-bounce-gentle hover:animate-spin-slow">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 px-2 animate-fade-in">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  <p className="text-base sm:text-lg font-semibold text-red-600 mb-2 animate-fade-in animate-delay-200">
                    {item.content}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 animate-fade-in animate-delay-400">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Mengapa Bergabung dengan Kami?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-2">
              Berbagai keuntungan mengikuti acara kemerdekaan
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Trophy,
                title: "Hadiah Menarik",
                description: "Berbagai hadiah menarik untuk para pemenang lomba",
              },
              {
                icon: Users,
                title: "Mempererat Persaudaraan",
                description: "Kesempatan untuk berinteraksi dengan warga sekitar",
              },
              {
                icon: Star,
                title: "Pengalaman Berkesan",
                description: "Menciptakan kenangan indah di hari kemerdekaan",
              },
              {
                icon: Gift,
                title: "Lomba Beragam",
                description: "Berbagai jenis lomba untuk semua kalangan",
              },
              {
                icon: Heart,
                title: "Semangat Gotong Royong",
                description: "Menumbuhkan rasa kebersamaan dan gotong royong",
              },
              {
                icon: Award,
                title: "Apresiasi Prestasi",
                description: "Pengakuan atas partisipasi dan prestasi peserta",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-500 border-gray-100 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-all duration-300 animate-bounce-gentle">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 px-2 animate-fade-in">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 px-2 animate-fade-in animate-delay-200">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-red-600 to-red-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-800/90"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2 animate-fade-in-up">
            Siap Merayakan Kemerdekaan?
          </h2>
          <p className="text-red-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2 animate-fade-in-up animate-delay-200">
            Bergabunglah dengan kami dalam merayakan HUT RI ke-80 dengan penuh semangat dan kegembiraan!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0 animate-fade-in-up animate-delay-400">
            <Button
              asChild
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 active:bg-gray-200 px-6 sm:px-8 py-3 text-sm sm:text-base hover:scale-105 hover:shadow-xl transition-all duration-300 animate-pulse-gentle"
            >
              <Link href="/lomba">
                <Trophy className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-bounce-gentle" />
                Daftar Lomba Sekarang
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-red-600 active:bg-gray-100 px-6 sm:px-8 py-3 bg-transparent text-sm sm:text-base hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <Link href="/donasi">
                <Heart className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-heartbeat" />
                Berikan Donasi
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 relative">
        <div className="container mx-auto text-center">
          <div className="mb-6 sm:mb-8 animate-fade-in-up">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg animate-bounce-gentle hover:animate-spin-slow">
              <Image
                src="/images/logo-pemuda-siadem-square.png"
                alt="Logo Pemuda Siadem"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl object-contain"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 animate-fade-in">Panitia Pemuda Siadem</h3>
            <p className="text-gray-400 text-sm sm:text-base animate-fade-in animate-delay-200">
              Merayakan kemerdekaan dengan penuh semangat
            </p>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 animate-fade-in-up animate-delay-400">
            <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm animate-fade-in">
              &copy; 2025 Panitia Pemuda Siadem. All rights reserved.
            </p>
            <p className="text-red-400 font-semibold text-sm sm:text-base lg:text-lg animate-bounce-gentle animate-delay-600">
              🇮🇩 MERDEKA! DIRGAHAYU INDONESIA! 🇮🇩
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
