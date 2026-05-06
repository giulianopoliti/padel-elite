import Link from "next/link"
import { Building2, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import BrandLogo from "@/components/ui/brand-logo"
import PublicTournamentList from "@/components/public/public-tournament-list"
import { getTenantBranding } from "@/config/tenant"
import { getTenantHomeData } from "@/lib/services/tenant-home.service"

export async function HomeContent() {
  const branding = getTenantBranding()
  const { tournaments, clubs } = await getTenantHomeData()

  return (
    <div className="tpe-page min-h-screen">
      <section className="container mx-auto px-4 pb-10 pt-8 sm:px-6 lg:pt-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="tpe-kicker mb-4">PadelElite</p>
                <BrandLogo variant="hero" />
                <h1 className="mt-6 text-4xl font-black tracking-[-0.04em] text-[var(--tpe-night)] sm:text-5xl">
                  {branding.home.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-700 sm:text-lg">
                  {branding.home.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[var(--tpe-night)] px-8 py-6 text-sm font-black uppercase tracking-[0.16em] text-[var(--tpe-paper)] hover:bg-[var(--tpe-night-soft)]"
                >
                  <Link href="/tournaments/upcoming">Ver torneos</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-[var(--tpe-night)] bg-transparent px-8 py-6 text-sm font-black uppercase tracking-[0.16em] text-[var(--tpe-night)] hover:bg-[var(--tpe-night)] hover:text-[var(--tpe-paper)]"
                >
                  <Link href="/clubes">
                    <Building2 className="mr-2 h-5 w-5" />
                    Ver clubes
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="tpe-kicker mb-2">Agenda semanal</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--tpe-night)] sm:text-4xl">
                Proximos torneos
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-0 text-sm font-black uppercase tracking-[0.14em] text-[var(--tpe-night)] hover:bg-transparent hover:text-[var(--tpe-night-soft)]"
            >
              <Link href="/tournaments/upcoming">
                Ver todos
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <PublicTournamentList
            tournaments={tournaments}
            emptyTitle="Todavia no hay torneos publicados"
            emptyDescription="Cuando PadelElite cargue la proxima fecha, vas a verla aca con categoria, horario, sede e inscripcion directa."
            showRegistration
          />
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="tpe-kicker mb-2">Sedes</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--tpe-night)] sm:text-4xl">
                Clubes donde organiza
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-0 text-sm font-black uppercase tracking-[0.14em] text-[var(--tpe-night)] hover:bg-transparent hover:text-[var(--tpe-night-soft)]"
            >
              <Link href="/clubes">
                Ver clubes
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {clubs.length === 0 ? (
            <div className="tpe-shell rounded-[2rem] p-8 text-center text-white">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/8">
                <MapPin className="h-8 w-8 text-[var(--tpe-cyan)]" />
              </div>
              <h3 className="text-2xl font-black">No hay clubes asociados</h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/72 sm:text-base">
                Cuando las sedes de PadelElite esten vinculadas, apareceran en esta seccion.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {clubs.map((club) => (
                <div key={club.id} className="tpe-shell rounded-[1.75rem] p-6 text-white">
                  <p className="mb-3 inline-flex rounded-full bg-[var(--tpe-lime)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--tpe-night)]">
                    Sede activa
                  </p>
                  <h3 className="text-2xl font-black uppercase tracking-[-0.03em] text-[var(--tpe-paper)]">
                    {club.name}
                  </h3>
                  <p className="mt-3 flex items-start gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-[var(--tpe-cyan)]">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{club.address || "Direccion a confirmar"}</span>
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white/80">
                      {club.courts || 0} canchas
                    </span>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-white/20 bg-transparent text-xs font-black uppercase tracking-[0.14em] text-white hover:bg-white/10 hover:text-white"
                    >
                      <Link href={`/clubes/${club.id}`}>Ver club</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
