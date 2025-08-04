"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Heart,
  Star,
  Clock,
  Phone,
  Mail,
  Instagram,
  Flag,
  Crown,
  Gift,
} from "lucide-react"
import { createClient } from "@/lib/supabase"
import Image from "next/image"

interface Lomba {
  id: string
  nama_lomba: string
  kategori: string
  deskripsi: string
  syarat: string
  hadiah_juara1: string
  hadiah_juara2: string
  hadiah_juara3: string
  tanggal_lomba: string
  waktu_lomba: string
  tempat_lomba: string
  kontak_cp: string
}

export default function LombaPage() {
  const [lombaList, setLombaList] = useState<Lomba[]>([])
  const [activeTab, setActiveTab] = useState("semua")
  const supabase = createClient()

  useEffect(() => {
    fetchLomba()
  }, [])

  const fetchLomba = async () => {
    const { data, error } = await supabase.from("lomba").select("*").order("tanggal_lomba", { ascending: true })

    if (data && !error) {
      setLombaList(data)
    }
  }

  const categories = ["semua", "anak-anak", "remaja-dewasa", "ibu-ibu", "bapak-bapak", "regu"]

  const filteredLomba =
    activeTab === "semua" ? lombaList : lombaList.filter((lomba) => lomba.kategori.toLowerCase() === activeTab)

  const getCategoryIcon = (kategori: string) => {
    switch (kategori.toLowerCase()) {
      case "anak-anak":
        return <Star className="w-4 h-4" />
      case "remaja-dewasa":
        return <Trophy className="w-4 h-4" />
      case "ibu-ibu":
        return <Heart className="w-4 h-4" />
      case "bapak-bapak":
        return <Crown className="w-4 h-4" />
      case "regu":
        return <Users className="w-4 h-4" />
      default:
        return <Flag className="w-4 h-4" />
    }
  }

  const getCategoryColor = (kategori: string) => {
    switch (kategori.toLowerCase()) {
      case "anak-anak":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "remaja-dewasa":
        return "bg-green-100 text-green-700 border-green-200"
      case "ibu-ibu":
        return "bg-pink-100 text-pink-700 border-pink-200"
      case "bapak-bapak":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "regu":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-red-100 text-red-700 border-red-200"
    }
  }

  const getCategoryStats = (kategori: string) => {
    const filtered =
      kategori === "semua" ? lombaList : lombaList.filter((lomba) => lomba.kategori.toLowerCase() === kategori)
    return filtered.length
  }

  return (
    <div className="min-h-screen gradient-indonesia-hero relative overflow-hidden">
      {/* Indonesia Flag Particles */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="particle-indonesia particle-red-1"></div>
        <div className="particle-indonesia particle-red-2"></div>
        <div className="particle-indonesia particle-white-1"></div>
        <div className="particle-indonesia particle-white-2"></div>
      </div>

      {/* Modern Header - Indonesia Theme */}
      <header className="relative z-10" role="banner">
        <div className="glass-indonesia-header">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex items-center justify-between" role="navigation" aria-label="Main navigation">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-indonesia-lg animate-indonesia-pulse p-1">
                  <Image
                    src="/images/logo-pemuda-siadem-square.png"
                    alt="Logo Pemuda Siadem"
                    width={40}
                    height={40}
                    className="rounded-lg object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold text-indonesia-white text-shadow-indonesia-strong">
                    PANITIA PEMUDA SIADEM
                  </h1>
                  <p className="text-red-100 text-sm">HUT RI ke-80</p>
                </div>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="text-indonesia-white hover:text-red-200 transition-all duration-300 font-medium relative group focus-indonesia"
                >
                  Beranda
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indonesia-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/lomba"
                  className="text-indonesia-white hover:text-red-200 transition-all duration-300 font-medium relative group font-semibold focus-indonesia"
                >
                  Perlombaan
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indonesia-white"></span>
                </Link>
                <Link
                  href="/donasi"
                  className="text-indonesia-white hover:text-red-200 transition-all duration-300 font-medium relative group focus-indonesia"
                >
                  Donasi
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indonesia-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 relative" role="main">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center space-x-2 glass-indonesia rounded-full px-6 py-3 mb-6 shadow-indonesia animate-bounce-in">
            <Trophy className="w-5 h-5 text-indonesia-red" />
            <span className="text-indonesia-red font-semibold">Perlombaan 17 Agustus</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-indonesia-gradient mb-6 text-shadow-indonesia">
            Lomba Seru
            <br />
            <span className="text-indonesia-red-dark">Untuk Semua</span>
          </h1>
          <p className="text-xl md:text-2xl text-indonesia-red-dark mb-8 font-light max-w-3xl mx-auto">
            Ikuti berbagai perlombaan menarik dalam rangka HUT RI ke-80 dengan hadiah yang menggiurkan
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 bg-white/80 backdrop-blur-sm border border-red-100 rounded-2xl p-2">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize font-semibold text-sm data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
                >
                  {category === "semua"
                    ? "Semua"
                    : category === "remaja-dewasa"
                      ? "Remaja/Dewasa"
                      : category === "anak-anak"
                        ? "Anak-anak"
                        : category === "ibu-ibu"
                          ? "Ibu-ibu"
                          : category === "bapak-bapak"
                            ? "Bapak-bapak"
                            : category === "regu"
                              ? "Regu"
                              : category}
                  <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full data-[state=active]:bg-white/20 data-[state=active]:text-white">
                    {getCategoryStats(category)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-8">
                {/* Category Summary */}
                <Card className="card-indonesia shadow-indonesia-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 gradient-indonesia-primary rounded-xl flex items-center justify-center shadow-indonesia">
                          {getCategoryIcon(category)}
                          <span className="text-indonesia-white font-bold ml-1">{getCategoryStats(category)}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-indonesia-red-dark capitalize">
                            {category === "semua" ? "Semua Kategori" : `Kategori ${category}`}
                          </h3>
                          <p className="text-indonesia-red">
                            {category === "semua"
                              ? "Seluruh perlombaan yang tersedia"
                              : `Perlombaan khusus untuk ${category}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indonesia-red">{getCategoryStats(category)}</p>
                        <p className="text-sm text-indonesia-red">Lomba Tersedia</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Competition Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLomba.map((lomba) => (
                    <Card
                      key={lomba.id}
                      className="card-indonesia shadow-indonesia-lg hover:shadow-indonesia-xl transition-all duration-500 group"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge
                            className={`${getCategoryColor(lomba.kategori)} font-semibold px-3 py-1 flex items-center space-x-1`}
                          >
                            {getCategoryIcon(lomba.kategori)}
                            <span>{lomba.kategori}</span>
                          </Badge>
                          <div className="w-10 h-10 gradient-indonesia-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-indonesia">
                            <Trophy className="w-5 h-5 text-indonesia-white" />
                          </div>
                        </div>
                        <CardTitle className="text-xl font-display font-bold text-indonesia-red-dark group-hover:text-indonesia-red transition-colors">
                          {lomba.nama_lomba}
                        </CardTitle>
                        <CardDescription className="text-indonesia-red line-clamp-2">{lomba.deskripsi}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-sm text-indonesia-red">
                            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{new Date(lomba.tanggal_lomba).toLocaleDateString("id-ID")}</span>
                          </div>
                          <div className="flex items-center text-sm text-indonesia-red">
                            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{lomba.waktu_lomba}</span>
                          </div>
                          <div className="flex items-center text-sm text-indonesia-red">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{lomba.tempat_lomba}</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-indonesia-red">Juara 1:</span>
                            <span className="font-semibold text-indonesia-red-dark">{lomba.hadiah_juara1}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-indonesia-red">Juara 2:</span>
                            <span className="font-semibold text-indonesia-red-dark">{lomba.hadiah_juara2}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-indonesia-red">Juara 3:</span>
                            <span className="font-semibold text-indonesia-red-dark">{lomba.hadiah_juara3}</span>
                          </div>
                        </div>

                        <Button className="btn-indonesia-primary w-full focus-indonesia">
                          <Phone className="w-4 h-4 mr-2" />
                          Daftar Sekarang
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredLomba.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 glass-indonesia rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-indonesia">
                      <Trophy className="w-12 h-12 text-indonesia-red" />
                    </div>
                    <h3 className="text-xl font-bold text-indonesia-red-dark mb-2">Belum Ada Lomba</h3>
                    <p className="text-indonesia-red">Lomba untuk kategori ini akan segera hadir!</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {/* Contact Info */}
          <Card className="mt-16 card-indonesia shadow-indonesia-lg">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center space-x-2 glass-indonesia rounded-full px-6 py-3 mb-6 shadow-indonesia">
                <Phone className="w-5 h-5 text-indonesia-red" />
                <span className="text-indonesia-red font-semibold">Informasi Pendaftaran</span>
              </div>
              <CardTitle className="text-3xl font-display font-bold text-indonesia-red-dark text-shadow-indonesia">
                Cara Mendaftar
              </CardTitle>
              <CardDescription className="text-lg text-indonesia-red">
                Hubungi kontak di bawah ini untuk mendaftar lomba
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-16 h-16 gradient-indonesia-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-indonesia-lg animate-indonesia-pulse">
                    <Phone className="w-8 h-8 text-indonesia-white" />
                  </div>
                  <h4 className="font-display font-bold text-indonesia-red-dark mb-2">Telepon</h4>
                  <p className="text-indonesia-red font-medium">+62 812-3456-7890</p>
                  <p className="text-indonesia-red text-sm">Panitia Lomba</p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 gradient-indonesia-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-indonesia-lg animate-indonesia-pulse">
                    <Mail className="w-8 h-8 text-indonesia-white" />
                  </div>
                  <h4 className="font-display font-bold text-indonesia-red-dark mb-2">Email</h4>
                  <p className="text-indonesia-red font-medium">lomba@pemudasiadem.id</p>
                  <p className="text-indonesia-red text-sm">Respon cepat</p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 gradient-indonesia-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-indonesia-lg animate-indonesia-pulse">
                    <Instagram className="w-8 h-8 text-indonesia-white" />
                  </div>
                  <h4 className="font-display font-bold text-indonesia-red-dark mb-2">Instagram</h4>
                  <p className="text-indonesia-red font-medium">@pemudasiadem</p>
                  <p className="text-indonesia-red text-sm">DM terbuka</p>
                </div>
              </div>

              <div className="mt-8 glass-indonesia rounded-2xl p-6 border-indonesia-light">
                <h4 className="font-display font-bold text-indonesia-red-dark mb-4 flex items-center">
                  <Gift className="w-5 h-5 mr-2" />
                  Syarat & Ketentuan Umum
                </h4>
                <ul className="space-y-2 text-sm text-indonesia-red">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-indonesia-red rounded-full mt-2 flex-shrink-0"></span>
                    <span>Pendaftaran dibuka hingga 15 Agustus 2025</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-indonesia-red rounded-full mt-2 flex-shrink-0"></span>
                    <span>Peserta wajib hadir 30 menit sebelum lomba dimulai</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-indonesia-red rounded-full mt-2 flex-shrink-0"></span>
                    <span>Membawa identitas diri (KTP/Kartu Pelajar)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-indonesia-red rounded-full mt-2 flex-shrink-0"></span>
                    <span>Keputusan juri tidak dapat diganggu gugat</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer - Indonesia Theme */}
      <footer className="relative" role="contentinfo">
        <div className="gradient-indonesia-primary py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-indonesia-lg animate-indonesia-pulse p-1">
                <Image
                  src="/images/logo-pemuda-siadem-square.png"
                  alt="Logo Pemuda Siadem"
                  width={56}
                  height={56}
                  className="rounded-xl object-contain"
                />
              </div>
              <h3 className="text-2xl font-display font-bold text-indonesia-white mb-2 text-shadow-indonesia-strong">
                Panitia Pemuda Siadem
              </h3>
              <p className="text-red-100">Merayakan kemerdekaan dengan penuh semangat</p>
            </div>
            <div className="border-t border-red-400/30 pt-6">
              <p className="text-red-100 mb-2">&copy; 2025 Panitia Pemuda Siadem. All rights reserved.</p>
              <p className="text-indonesia-white font-semibold text-shadow-indonesia-strong">🇮🇩 MERDEKA! 🇮🇩</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
