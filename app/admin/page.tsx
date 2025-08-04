"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Heart, Plus, Edit, Trash2, Shield, Menu, X, DollarSign } from "lucide-react"
import { createClient } from "@/lib/supabase"
import Image from "next/image"

interface Lomba {
  id: string
  nama_lomba: string
  kategori: string
  jenis_lomba: string
  deskripsi: string
  syarat: string
  tanggal_lomba: string
  waktu_lomba: string
  tempat_lomba: string
  kontak_cp: string
}

interface Donatur {
  id: string
  nama_donatur: string
  jumlah_donasi: number
  pesan?: string
  created_at: string
  verified: boolean
}

export default function AdminPage() {
  const [lombaList, setLombaList] = useState<Lomba[]>([])
  const [donaturList, setDonaturList] = useState<Donatur[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [lombaForm, setLombaForm] = useState({
    nama_lomba: "",
    kategori: "",
    jenis_lomba: "",
    deskripsi: "",
    syarat: "",
    tanggal_lomba: "",
    waktu_lomba: "",
    tempat_lomba: "",
    kontak_cp: "",
  })
  const [donaturForm, setDonaturForm] = useState({
    nama_donatur: "",
    jumlah_donasi: "",
    pesan: "",
    verified: false,
  })
  const [editingLomba, setEditingLomba] = useState<string | null>(null)
  const [editingDonatur, setEditingDonatur] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
    if (isLoggedIn) {
      fetchLomba()
      fetchDonatur()
    }
  }, [isLoggedIn])

  const fetchLomba = async () => {
    const { data, error } = await supabase.from("lomba").select("*").order("tanggal_lomba", { ascending: true })

    if (data && !error) {
      setLombaList(data)
    }
  }

  const fetchDonatur = async () => {
    const { data, error } = await supabase.from("donasi").select("*").order("created_at", { ascending: false })

    if (data && !error) {
      setDonaturList(data)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication - in production, use proper authentication
    if (loginData.username === "admin" && loginData.password === "admin123") {
      setIsLoggedIn(true)
    } else {
      alert("Username atau password salah!")
    }
  }

  const handleLombaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    let error = null

    try {
      if (editingLomba) {
        const { data, err } = await supabase.from("lomba").update(lombaForm).eq("id", editingLomba)
        error = err

        if (!error) {
          alert("Lomba berhasil diupdate!")
          setEditingLomba(null)
        }
      } else {
        const { data, err } = await supabase.from("lomba").insert([lombaForm])
        error = err

        if (!error) {
          alert("Lomba berhasil ditambahkan!")
        }
      }

      if (!error) {
        setLombaForm({
          nama_lomba: "",
          kategori: "",
          jenis_lomba: "",
          deskripsi: "",
          syarat: "",
          tanggal_lomba: "",
          waktu_lomba: "",
          tempat_lomba: "",
          kontak_cp: "",
        })
        fetchLomba()
      }
    } catch (err) {
      error = err
      alert("Terjadi kesalahan!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDonaturSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    let error = null

    try {
      // Parse jumlah donasi dengan benar
      const jumlahDonasi = Number.parseInt(donaturForm.jumlah_donasi.replace(/\D/g, "")) || 0

      if (jumlahDonasi < 1000) {
        alert("Minimal donasi adalah Rp 1.000")
        setIsSubmitting(false)
        return
      }

      const donaturData = {
        nama_donatur: donaturForm.nama_donatur.trim() || "Anonim",
        jumlah_donasi: jumlahDonasi,
        pesan: donaturForm.pesan || `Donasi manual - ${new Date().toLocaleDateString("id-ID")}`,
        verified: donaturForm.verified,
        created_at: new Date().toISOString(),
      }

      if (editingDonatur) {
        const { data, err } = await supabase.from("donasi").update(donaturData).eq("id", editingDonatur)
        error = err

        if (!error) {
          alert("Data donatur berhasil diupdate!")
          setEditingDonatur(null)
        }
      } else {
        const { data, err } = await supabase.from("donasi").insert([donaturData])
        error = err

        if (!error) {
          alert("Donatur berhasil ditambahkan!")
        }
      }

      if (!error) {
        setDonaturForm({
          nama_donatur: "",
          jumlah_donasi: "",
          pesan: "",
          verified: false,
        })
        fetchDonatur()
      }
    } catch (err) {
      error = err
      alert("Terjadi kesalahan!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditLomba = (lomba: Lomba) => {
    setLombaForm(lomba)
    setEditingLomba(lomba.id)
  }

  const handleEditDonatur = (donatur: Donatur) => {
    setDonaturForm({
      nama_donatur: donatur.nama_donatur,
      jumlah_donasi: donatur.jumlah_donasi.toLocaleString("id-ID"),
      pesan: donatur.pesan || "",
      verified: donatur.verified || false,
    })
    setEditingDonatur(donatur.id)
  }

  const handleDeleteLomba = async (id: string) => {
    if (confirm("Yakin ingin menghapus lomba ini?")) {
      const { error } = await supabase.from("lomba").delete().eq("id", id)

      if (!error) {
        alert("Lomba berhasil dihapus!")
        fetchLomba()
      }
    }
  }

  const handleDeleteDonatur = async (id: string) => {
    if (confirm("Yakin ingin menghapus data donatur ini?")) {
      const { error } = await supabase.from("donasi").delete().eq("id", id)

      if (!error) {
        alert("Data donatur berhasil dihapus!")
        fetchDonatur()
      }
    }
  }

  const handleVerifyDonatur = async (id: string, verified: boolean) => {
    const { error } = await supabase.from("donasi").update({ verified: !verified }).eq("id", id)

    if (!error) {
      alert(`Donatur berhasil ${!verified ? "diverifikasi" : "dibatalkan verifikasinya"}!`)
      fetchDonatur()
    }
  }

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleJumlahDonasiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Remove non-digits
    const numValue = Number.parseInt(value) || 0
    setDonaturForm({
      ...donaturForm,
      jumlah_donasi: numValue > 0 ? numValue.toLocaleString("id-ID") : "",
    })
  }

  const totalDonasi = donaturList.reduce((total, donatur) => total + donatur.jumlah_donasi, 0)
  const verifiedDonasi = donaturList
    .filter((d) => d.verified)
    .reduce((total, donatur) => total + donatur.jumlah_donasi, 0)

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base animate-pulse">Memuat halaman admin...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
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

        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 relative z-10">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-2 border-red-100 shadow-xl animate-fade-in-up">
            <CardHeader className="text-center pb-4 sm:pb-6 animate-fade-in-up animate-delay-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-bounce-gentle">
                <Image
                  src="/images/logo-pemuda-siadem-square.png"
                  alt="Logo Pemuda Siadem"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-contain"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center justify-center animate-fade-in">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-red-600 animate-pulse-gentle" />
                Admin Panel
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base animate-fade-in animate-delay-400">
                Masuk untuk mengelola lomba dan donasi
              </CardDescription>
            </CardHeader>
            <CardContent className="animate-fade-in-up animate-delay-600">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-semibold text-gray-900">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    className="h-10 sm:h-12 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-900">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="h-10 sm:h-12 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-300"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-10 sm:h-12 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse-gentle"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Masuk
                </Button>
              </form>
            </CardContent>
          </Card>
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
          <div className="flex items-center justify-between">
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
                <h1 className="text-base sm:text-xl font-bold text-gray-900 leading-tight animate-fade-in flex items-center">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600" />
                  Admin Panel
                </h1>
                <p className="text-red-600 text-xs sm:text-sm font-medium animate-fade-in-delay">17 Agustus Siadem</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 animate-fade-in-right">
              <Button
                onClick={() => setIsLoggedIn(false)}
                className="bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-105 text-sm font-semibold"
              >
                Logout
              </Button>
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
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 animate-slide-down">
              <div className="flex flex-col space-y-3 pt-4">
                <Button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 w-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[
            {
              title: "Total Lomba",
              value: lombaList.length,
              icon: Trophy,
              color: "text-red-600",
              bgColor: "bg-red-50",
              iconBg: "bg-red-600",
            },
            {
              title: "Total Donatur",
              value: donaturList.length,
              icon: Users,
              color: "text-blue-600",
              bgColor: "bg-blue-50",
              iconBg: "bg-blue-600",
            },
            {
              title: "Total Donasi",
              value: formatRupiah(totalDonasi),
              icon: Heart,
              color: "text-green-600",
              bgColor: "bg-green-50",
              iconBg: "bg-green-600",
              isAmount: true,
            },
            {
              title: "Donasi Verified",
              value: formatRupiah(verifiedDonasi),
              icon: DollarSign,
              color: "text-purple-600",
              bgColor: "bg-purple-50",
              iconBg: "bg-purple-600",
              isAmount: true,
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${stat.color} animate-fade-in`}>{stat.title}</p>
                    <p
                      className={`text-2xl sm:text-3xl font-bold text-gray-900 animate-number-change ${stat.isAmount ? "text-lg sm:text-xl" : ""}`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.iconBg} rounded-xl flex items-center justify-center animate-bounce-gentle`}
                  >
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="lomba" className="space-y-4 sm:space-y-6 animate-fade-in-up animate-delay-400">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border-2 border-red-100 rounded-2xl p-2 shadow-lg">
            <TabsTrigger
              value="lomba"
              className="font-semibold text-sm sm:text-base data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Trophy className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Kelola </span>Lomba
            </TabsTrigger>
            <TabsTrigger
              value="donasi"
              className="font-semibold text-sm sm:text-base data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Data </span>Donasi
            </TabsTrigger>
            <TabsTrigger
              value="kelola-donatur"
              className="font-semibold text-sm sm:text-base data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Kelola </span>Donatur
            </TabsTrigger>
          </TabsList>

          {/* Lomba Management */}
          <TabsContent value="lomba" className="space-y-4 sm:space-y-6">
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Form */}
              <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg animate-fade-in-up animate-delay-600">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center animate-fade-in">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600 animate-bounce-gentle" />
                    {editingLomba ? "Edit Lomba" : "Tambah Lomba"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLombaSubmit} className="space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Nama Lomba</Label>
                      <Input
                        value={lombaForm.nama_lomba}
                        onChange={(e) => setLombaForm({ ...lombaForm, nama_lomba: e.target.value })}
                        className="h-9 sm:h-10 text-sm border-gray-200 focus:border-red-500 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Kategori</Label>
                      <Select
                        value={lombaForm.kategori}
                        onValueChange={(value) => setLombaForm({ ...lombaForm, kategori: value })}
                      >
                        <SelectTrigger className="h-9 sm:h-10 text-sm border-gray-200 focus:border-red-500">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anak-anak">Anak-anak</SelectItem>
                          <SelectItem value="remaja-dewasa">Remaja/Dewasa</SelectItem>
                          <SelectItem value="ibu-ibu">Ibu-ibu</SelectItem>
                          <SelectItem value="bapak-bapak">Bapak-bapak</SelectItem>
                          <SelectItem value="regu">Regu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Jenis Lomba</Label>
                      <Select
                        value={lombaForm.jenis_lomba}
                        onValueChange={(value) => setLombaForm({ ...lombaForm, jenis_lomba: value })}
                      >
                        <SelectTrigger className="h-9 sm:h-10 text-sm border-gray-200 focus:border-red-500">
                          <SelectValue placeholder="Pilih jenis lomba" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individu">Individu</SelectItem>
                          <SelectItem value="regu">Regu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Deskripsi</Label>
                      <Textarea
                        value={lombaForm.deskripsi}
                        onChange={(e) => setLombaForm({ ...lombaForm, deskripsi: e.target.value })}
                        className="text-sm border-gray-200 focus:border-red-500 min-h-[60px] transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Syarat</Label>
                      <Textarea
                        value={lombaForm.syarat}
                        onChange={(e) => setLombaForm({ ...lombaForm, syarat: e.target.value })}
                        className="text-sm border-gray-200 focus:border-red-500 min-h-[60px] transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-900">Tanggal Lomba</Label>
                        <Input
                          type="date"
                          value={lombaForm.tanggal_lomba}
                          onChange={(e) => setLombaForm({ ...lombaForm, tanggal_lomba: e.target.value })}
                          className="h-9 sm:h-10 text-sm border-gray-200 focus:border-red-500 transition-all duration-300"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-900">Waktu Lomba</Label>
                        <Input
                          value={lombaForm.waktu_lomba}
                          onChange={(e) => setLombaForm({ ...lombaForm, waktu_lomba: e.target.value })}
                          placeholder="08:00 - 10:00"
                          className="h-9 sm:h-10 text-sm border-gray-200 focus:border-red-500 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Tempat Lomba</Label>
                      <Input
                        value={lombaForm.tempat_lomba}
                        onChange={(e) => setLombaForm({ ...lombaForm, tempat_lomba: e.target.value })}
                        className="h-9 sm:h-10 text-sm border-gray-200 focus:border-red-500 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Kontak CP</Label>
                      <Input
                        value={lombaForm.kontak_cp}
                        onChange={(e) => setLombaForm({ ...lombaForm, kontak_cp: e.target.value })}
                        placeholder="+62 815-7343-1797"
                        className="h-9 sm:h-10 text-sm border-gray-200 focus:border-red-500 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        type="submit"
                        className="flex-1 h-9 sm:h-10 text-sm bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Menyimpan..." : editingLomba ? "Update" : "Tambah"}
                      </Button>
                      {editingLomba && (
                        <Button
                          type="button"
                          onClick={() => {
                            setEditingLomba(null)
                            setLombaForm({
                              nama_lomba: "",
                              kategori: "",
                              jenis_lomba: "",
                              deskripsi: "",
                              syarat: "",
                              tanggal_lomba: "",
                              waktu_lomba: "",
                              tempat_lomba: "",
                              kontak_cp: "",
                            })
                          }}
                          className="h-9 sm:h-10 text-sm px-3 bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300 hover:scale-105"
                        >
                          Batal
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Table */}
              <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg animate-fade-in-up animate-delay-800">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center animate-fade-in">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600 animate-pulse-gentle" />
                    Daftar Lomba ({lombaList.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm font-semibold">Nama Lomba</TableHead>
                          <TableHead className="text-xs sm:text-sm font-semibold">Kategori</TableHead>
                          <TableHead className="text-xs sm:text-sm hidden sm:table-cell font-semibold">
                            Tanggal
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm hidden md:table-cell font-semibold">Waktu</TableHead>
                          <TableHead className="text-xs sm:text-sm font-semibold">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lombaList.map((lomba, index) => (
                          <TableRow
                            key={lomba.id}
                            className="hover:bg-gray-50 transition-colors duration-200 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <TableCell className="font-medium text-xs sm:text-sm">{lomba.nama_lomba}</TableCell>
                            <TableCell>
                              <Badge className="bg-red-100 text-red-700 border-red-200 text-xs hover:bg-red-200 transition-colors duration-200">
                                {lomba.kategori}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-xs sm:text-sm">
                              {new Date(lomba.tanggal_lomba).toLocaleDateString("id-ID")}
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                              {lomba.waktu_lomba}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1 sm:space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleEditLomba(lomba)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white h-7 w-7 sm:h-8 sm:w-8 p-0 transition-all duration-300 hover:scale-110"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleDeleteLomba(lomba.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white h-7 w-7 sm:h-8 sm:w-8 p-0 transition-all duration-300 hover:scale-110"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Donasi Data */}
          <TabsContent value="donasi">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg animate-fade-in-up">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center animate-fade-in">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600 animate-heartbeat" />
                  Data Donasi ({donaturList.length} donatur)
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base animate-fade-in animate-delay-200">
                  Total donasi terkumpul: <span className="font-bold text-green-600">{formatRupiah(totalDonasi)}</span>{" "}
                  | Verified: <span className="font-bold text-purple-600">{formatRupiah(verifiedDonasi)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm font-semibold">Nama Donatur</TableHead>
                        <TableHead className="text-xs sm:text-sm font-semibold">Jumlah</TableHead>
                        <TableHead className="text-xs sm:text-sm hidden md:table-cell font-semibold">Pesan</TableHead>
                        <TableHead className="text-xs sm:text-sm hidden sm:table-cell font-semibold">Tanggal</TableHead>
                        <TableHead className="text-xs sm:text-sm font-semibold">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm font-semibold">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donaturList.map((donatur, index) => (
                        <TableRow
                          key={donatur.id}
                          className="hover:bg-gray-50 transition-colors duration-200 animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <TableCell className="font-medium text-xs sm:text-sm">{donatur.nama_donatur}</TableCell>
                          <TableCell className="font-bold text-green-600 text-xs sm:text-sm">
                            {formatRupiah(donatur.jumlah_donasi)}
                          </TableCell>
                          <TableCell className="max-w-xs truncate hidden md:table-cell text-xs sm:text-sm">
                            {donatur.pesan || "-"}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-xs sm:text-sm">
                            {new Date(donatur.created_at).toLocaleDateString("id-ID")}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs transition-colors duration-200 ${
                                donatur.verified
                                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              }`}
                            >
                              {donatur.verified ? "Verified" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                onClick={() => handleVerifyDonatur(donatur.id, donatur.verified)}
                                className={`h-7 w-7 sm:h-8 sm:w-8 p-0 text-white transition-all duration-300 hover:scale-110 ${
                                  donatur.verified
                                    ? "bg-yellow-600 hover:bg-yellow-700"
                                    : "bg-green-600 hover:bg-green-700"
                                }`}
                                title={donatur.verified ? "Batalkan Verifikasi" : "Verifikasi"}
                              >
                                {donatur.verified ? "✗" : "✓"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Kelola Donatur */}
          <TabsContent value="kelola-donatur" className="space-y-4 sm:space-y-6">
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Form */}
              <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg animate-fade-in-up">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center animate-fade-in">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600 animate-bounce-gentle" />
                    {editingDonatur ? "Edit Donatur" : "Tambah Donatur"}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm animate-fade-in animate-delay-200">
                    Tambahkan donatur baru atau edit data donatur yang sudah ada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonaturSubmit} className="space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Nama Donatur</Label>
                      <Input
                        value={donaturForm.nama_donatur}
                        onChange={(e) => setDonaturForm({ ...donaturForm, nama_donatur: e.target.value })}
                        placeholder="Masukkan nama donatur"
                        className="h-9 sm:h-10 text-sm border-gray-200 focus:border-red-500 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Jumlah Donasi</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          Rp
                        </span>
                        <Input
                          type="text"
                          value={donaturForm.jumlah_donasi}
                          onChange={handleJumlahDonasiChange}
                          placeholder="10.000"
                          className="h-9 sm:h-10 text-sm pl-10 border-gray-200 focus:border-red-500 transition-all duration-300"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500">Minimal Rp 1.000</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Pesan (Opsional)</Label>
                      <Textarea
                        value={donaturForm.pesan}
                        onChange={(e) => setDonaturForm({ ...donaturForm, pesan: e.target.value })}
                        placeholder="Pesan dari donatur..."
                        className="text-sm border-gray-200 focus:border-red-500 min-h-[60px] transition-all duration-300"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="verified"
                        checked={donaturForm.verified}
                        onChange={(e) => setDonaturForm({ ...donaturForm, verified: e.target.checked })}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 transition-all duration-300"
                      />
                      <Label htmlFor="verified" className="text-sm font-semibold text-gray-900">
                        Donasi Sudah Terverifikasi
                      </Label>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        type="submit"
                        className="flex-1 h-9 sm:h-10 text-sm bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Menyimpan..." : editingDonatur ? "Update" : "Tambah"}
                      </Button>
                      {editingDonatur && (
                        <Button
                          type="button"
                          onClick={() => {
                            setEditingDonatur(null)
                            setDonaturForm({
                              nama_donatur: "",
                              jumlah_donasi: "",
                              pesan: "",
                              verified: false,
                            })
                          }}
                          className="h-9 sm:h-10 text-sm px-3 bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300 hover:scale-105"
                        >
                          Batal
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Table */}
              <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg animate-fade-in-up animate-delay-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center animate-fade-in">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600 animate-pulse-gentle" />
                    Kelola Donatur ({donaturList.length})
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm animate-fade-in animate-delay-200">
                    Edit atau hapus data donatur yang sudah ada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm font-semibold">Nama</TableHead>
                          <TableHead className="text-xs sm:text-sm font-semibold">Jumlah</TableHead>
                          <TableHead className="text-xs sm:text-sm hidden sm:table-cell font-semibold">
                            Status
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm hidden md:table-cell font-semibold">
                            Tanggal
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm font-semibold">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donaturList.map((donatur, index) => (
                          <TableRow
                            key={donatur.id}
                            className="hover:bg-gray-50 transition-colors duration-200 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <TableCell className="font-medium text-xs sm:text-sm">{donatur.nama_donatur}</TableCell>
                            <TableCell className="font-bold text-green-600 text-xs sm:text-sm">
                              {formatRupiah(donatur.jumlah_donasi)}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge
                                className={`text-xs transition-colors duration-200 ${
                                  donatur.verified
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                }`}
                              >
                                {donatur.verified ? "Verified" : "Pending"}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                              {new Date(donatur.created_at).toLocaleDateString("id-ID")}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1 sm:space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleEditDonatur(donatur)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white h-7 w-7 sm:h-8 sm:w-8 p-0 transition-all duration-300 hover:scale-110"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleDeleteDonatur(donatur.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white h-7 w-7 sm:h-8 sm:w-8 p-0 transition-all duration-300 hover:scale-110"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
