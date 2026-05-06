"use client"

import Link from "next/link"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, Trophy, Calendar, Archive, Settings, Plus } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import TournamentFilters from "./tournament-filters"

interface TournamentsLayoutProps {
  children: React.ReactNode
  categories: Array<{ name: string }>
  clubs: Array<{ id: string; name: string }>
}

export default function TournamentsLayout({ children, categories, clubs }: TournamentsLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { userDetails } = useUser()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "")
  }, [searchParams])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  const isActive = (path: string) => pathname.includes(path)

  return (
    <div className="tpe-page min-h-screen">
      {(userDetails?.role === "CLUB" || userDetails?.role === "ORGANIZADOR") && (
        <div className="border-b border-black/5 bg-white/70 backdrop-blur">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-end">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/my-tournaments">
                    <Settings className="mr-2 h-4 w-4" />
                    Gestionar Mis Torneos
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  <Link href="/tournaments/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Nuevo Torneo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <p className="tpe-kicker mb-3">Agenda PadelElite</p>
          <h1 className="mb-3 text-4xl font-black tracking-[-0.04em] text-[var(--tpe-night)]">Torneos</h1>
          <p className="max-w-2xl text-base font-medium text-slate-700 sm:text-lg">
            Consulta proximos, activos y pasados con la misma lectura clara que usan los flyers semanales.
          </p>
        </div>

        <div className="mb-8 rounded-[1.75rem] border border-white/60 bg-white/75 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.07)] backdrop-blur sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={18} />
              <Input
                placeholder="Buscar torneos o categorias..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 border-slate-200 bg-white/90 text-slate-700 placeholder:text-slate-400 focus:border-[var(--tpe-cyan)] focus:ring-[var(--tpe-cyan)]"
              />
            </div>

            <TournamentFilters categories={categories} clubs={clubs} />
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-[var(--tpe-forest)] bg-transparent shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          <div className="tpe-shell rounded-none border-b-0 p-2">
            <div className="grid gap-2 md:grid-cols-3">
              <Link
                href={`/tournaments/upcoming?${searchParams.toString()}`}
                className={`flex items-center justify-center rounded-full py-3 text-sm font-black uppercase tracking-[0.16em] transition-colors ${
                  isActive("/upcoming")
                    ? "bg-[var(--tpe-lime)] text-[var(--tpe-night)]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Proximos
              </Link>

              <Link
                href={`/tournaments/in-progress?${searchParams.toString()}`}
                className={`flex items-center justify-center rounded-full py-3 text-sm font-black uppercase tracking-[0.16em] transition-colors ${
                  isActive("/in-progress")
                    ? "bg-[var(--tpe-lime)] text-[var(--tpe-night)]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Trophy className="mr-2 h-5 w-5" />
                Activos
              </Link>

              <Link
                href={`/tournaments/past?${searchParams.toString()}`}
                className={`flex items-center justify-center rounded-full py-3 text-sm font-black uppercase tracking-[0.16em] transition-colors ${
                  isActive("/past")
                    ? "bg-[var(--tpe-lime)] text-[var(--tpe-night)]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Archive className="mr-2 h-5 w-5" />
                Pasados
              </Link>
            </div>
          </div>

          <div className="p-4 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
