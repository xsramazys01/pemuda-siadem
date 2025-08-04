"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Target, Gift, Menu, X, Trophy, Award, Star, DollarSign } from "lucide-react"
import { createClient } from "@/lib/supabase"
import Image from "next/image"

interface Donatur {
  id: string
  nama_donatur: string
  jumlah_donasi: number
  pesan?: string
  created_at: string
  verified: boolean
}

export default function DonasiPage() {
  const [donaturList, setDonaturList] = useState<Donatur[]>([])
  const [formData, setFormData] = useState({
    nama_donatur: "",
    jumlah_donasi: "",
    pesan: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const supabase = createClient()

  const TARGET_DONASI = 8000000 // 8 juta

  useEffect(() => {
    setMounted(true)
    fetchDonatur()
  }, [])

  const fetchDonatur = async () => {
    const { data, error } = await supabase
      .from("donasi")
      .select("*")
      .eq("verified", true)
      .order("created_at", { ascending: false })

    if (data && !error) {
      setDonaturList(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Parse jumlah donasi dengan benar
      const jumlahDonasi = Number.parseInt(formData.jumlah_donasi.replace(/\D/g, "")) || 0

      if (jumlahDonasi < 1000) {
        alert("Minimal donasi adalah Rp 1.000")
        setIsSubmitting(false)
        return
      }

      const donaturData = {
        nama_donatur: formData.nama_donatur.trim() || "Anonim",
        jumlah_donasi: jumlahDonasi,
        pesan: formData.pesan || `Semoga bermanfaat untuk acara 17 Agustus - ${new Date().toLocaleDateString("id-ID")}`,
        verified: false, // Default false, admin akan verifikasi
        created_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("donasi").insert([donaturData])

      if (!error) {
        alert("Terima kasih atas donasi Anda! Donasi akan diverifikasi oleh admin.")
        setFormData({
          nama_donatur: "",
          jumlah_donasi: "",
          pesan: "",
        })
        fetchDonatur()
      } else {
        alert("Terjadi kesalahan saat menyimpan donasi")
      }
    } catch (error) {
      alert("Terjadi kesalahan!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleJumlahDonasiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Remove non-digits
    const numValue = Number.parseInt(value) || 0
    setFormData({
      ...formData,
      jumlah_donasi: numValue > 0 ? numValue.toLocaleString("id-ID") : "",
    })
  }

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const totalDonasi = donaturList.reduce((total, donatur) => total + donatur.jumlah_donasi, 0)
  const progressPercentage = Math.min((totalDonasi / TARGET_DONASI) * 100, 100)

  // Budget allocation data
  const budgetAllocation = [
    {
      category: "Hadiah Lomba",
      amount: 3500000,
      percentage: 43.75,
      color: "bg-red-500",
      icon: Trophy,
      items: [
        "Lomba Balap Karung: Rp 300.000",
        "Lomba Makan Kerupuk: Rp 200.000",
        "Lomba Panjat Pinang: Rp 500.000",
        "Lomba Tarik Tambang: Rp 400.000",
        "Lomba Futsal: Rp 800.000",
        "Lomba Volly: Rp 700.000",
        "Lomba Lainnya: Rp 600.000",
      ],
    },
    {
      category: "Konsumsi",
      amount: 2000000,
      percentage: 25,
      color: "bg-blue-500",
      icon: Gift,
      items: [
        "Snack peserta: Rp 800.000",
        "Makan siang panitia: Rp 600.000",
        "Minuman & air mineral: Rp 400.000",
        "Konsumsi tambahan: Rp 200.000",
      ],
    },
    {
      category: "Dekorasi & Perlengkapan",
      amount: 1500000,
      percentage: 18.75,
      color: "bg-green-500",
      icon: Star,
      items: [
        "Sewa sound system: Rp 500.000",
        "Bendera & spanduk: Rp 300.000",
        "Dekorasi panggung: Rp 400.000",
        "Perlengkapan lomba: Rp 300.000",
      ],
    },
    {
      category: "Hiburan",
      amount: 1000000,
      percentage: 12.5,
      color: "bg-purple-500",
      icon: Award,
      items: ["Pertunjukan & doorprize"],
    },
  ]

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base animate-pulse">Memuat halaman donasi...</p>
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

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <Badge className="bg-red-100 text-red-800 border-red-200 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium animate-bounce-in hover:animate-pulse">
            🇮🇩 Donasi untuk HUT RI ke-80
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fade-in-up animate-delay-200">
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent animate-gradient-x">
              Mari Berdonasi
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl">untuk Kemerdekaan</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animate-delay-400">
            Dukung perayaan HUT RI ke-80 di Desa Siadem dengan memberikan donasi untuk berbagai perlombaan dan kegiatan
            kemerdekaan
          </p>
        </section>

        {/* Progress Section */}
        <section className="mb-8 sm:mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-red-100 shadow-lg animate-fade-in-up animate-delay-600">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center justify-center animate-fade-in">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-red-600 animate-pulse-gentle" />
                Progress Donasi
              </CardTitle>
              <CardDescription className="text-gray-600 animate-fade-in animate-delay-200">
                Target: <span className="font-bold text-red-600">{formatRupiah(TARGET_DONASI)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center animate-fade-in">
                  <span className="text-sm sm:text-base font-medium text-gray-700">
                    Terkumpul: <span className="font-bold text-green-600">{formatRupiah(totalDonasi)}</span>
                  </span>
                  <span className="text-sm sm:text-base font-bold text-red-600">{progressPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3 sm:h-4 animate-fade-in animate-delay-200" />
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 animate-fade-in animate-delay-400">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Budget Allocation Section */}
        <section className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Rincian Penggunaan Dana</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Transparansi penggunaan donasi Rp 8.000.000 untuk acara kemerdekaan
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {budgetAllocation.map((budget, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${budget.color} rounded-xl flex items-center justify-center mx-auto mb-3 animate-bounce-gentle`}
                  >
                    <budget.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <CardTitle className="text-sm sm:text-base font-bold text-gray-900 text-center animate-fade-in">
                    {budget.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mb-2 animate-fade-in animate-delay-200">
                    {formatRupiah(budget.amount)}
                  </p>
                  <Badge className={`${budget.color} text-white text-xs animate-fade-in animate-delay-400`}>
                    {budget.percentage}%
                  </Badge>
                  <div className={`w-full ${budget.color} h-2 rounded-full mt-3 animate-fade-in animate-delay-600`}>
                    <div
                      className="bg-white h-full rounded-full transition-all duration-1000 animate-pulse-gentle"
                      style={{ width: `${budget.percentage}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Budget Breakdown */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg animate-fade-in-up animate-delay-800">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center animate-fade-in">
                <DollarSign className="w-5 h-5 mr-2 text-green-600 animate-pulse-gentle" />
                Detail Alokasi Anggaran
              </CardTitle>
              <CardDescription className="text-gray-600 animate-fade-in animate-delay-200">
                Rincian lengkap penggunaan dana untuk setiap kategori
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {budgetAllocation.map((budget, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-8 h-8 ${budget.color} rounded-lg flex items-center justify-center mr-3 animate-bounce-gentle`}
                      >
                        <budget.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 animate-fade-in">{budget.category}</h3>
                        <p className="text-sm font-bold text-green-600 animate-fade-in animate-delay-200">
                          {formatRupiah(budget.amount)}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {budget.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center animate-fade-in"
                          style={{ animationDelay: `${index * 0.1 + itemIndex * 0.05}s` }}
                        >
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 animate-pulse-gentle"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form and Donatur List */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Donation Form */}
          <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border-2 border-red-100 shadow-lg animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center animate-fade-in">
                <Heart className="w-5 h-5 mr-2 text-red-600 animate-heartbeat" />
                Form Donasi
              </CardTitle>
              <CardDescription className="text-gray-600 animate-fade-in animate-delay-200">
                Isi form di bawah untuk memberikan donasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nama" className="text-sm font-semibold text-gray-900">
                    Nama Donatur
                  </Label>
                  <Input
                    id="nama"
                    type="text"
                    placeholder="Masukkan nama Anda (opsional)"
                    value={formData.nama_donatur}
                    onChange={(e) => setFormData({ ...formData, nama_donatur: e.target.value })}
                    className="border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-300"
                  />
                  <p className="text-xs text-gray-500">Kosongkan jika ingin anonim</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jumlah" className="text-sm font-semibold text-gray-900">
                    Jumlah Donasi
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">Rp</span>
                    <Input
                      id="jumlah"
                      type="text"
                      placeholder="10.000"
                      value={formData.jumlah_donasi}
                      onChange={handleJumlahDonasiChange}
                      className="pl-10 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-300"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">Minimal Rp 1.000</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pesan" className="text-sm font-semibold text-gray-900">
                    Pesan (Opsional)
                  </Label>
                  <Textarea
                    id="pesan"
                    placeholder="Tulis pesan atau doa untuk acara kemerdekaan..."
                    value={formData.pesan}
                    onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                    className="border-gray-200 focus:border-red-500 focus:ring-red-500 min-h-[80px] transition-all duration-300"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse-gentle"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2 animate-heartbeat" />
                      Donasi Sekarang
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in animate-delay-600">
                <p className="text-xs sm:text-sm text-blue-700 font-medium">
                  <strong>Informasi:</strong>
                </p>
                <p className="text-xs sm:text-sm text-blue-600 mt-1">
                  Donasi akan diverifikasi oleh admin sebelum ditampilkan di daftar donatur.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Donatur List */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-2 border-green-100 shadow-lg animate-fade-in-up animate-delay-200">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center animate-fade-in">
                <Users className="w-5 h-5 mr-2 text-green-600 animate-pulse-gentle" />
                Daftar Donatur ({donaturList.length})
              </CardTitle>
              <CardDescription className="text-gray-600 animate-fade-in animate-delay-200">
                Terima kasih kepada para donatur yang telah berkontribusi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {donaturList.length > 0 ? (
                  donaturList.map((donatur, index) => (
                    <div
                      key={donatur.id}
                      className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center animate-bounce-gentle">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base animate-fade-in">
                            {donatur.nama_donatur}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 animate-fade-in animate-delay-200">
                            {new Date(donatur.created_at).toLocaleDateString("id-ID")}
                          </p>
                          {donatur.pesan && (
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 italic animate-fade-in animate-delay-400">
                              "{donatur.pesan}"
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-sm sm:text-base animate-number-change">
                          {formatRupiah(donatur.jumlah_donasi)}
                        </p>
                        <Badge className="bg-green-100 text-green-700 text-xs mt-1 animate-fade-in animate-delay-600">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 animate-fade-in">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse-gentle" />
                    <p className="text-gray-500">Belum ada donatur yang terverifikasi</p>
                    <p className="text-sm text-gray-400 mt-2">Jadilah yang pertama memberikan donasi!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
