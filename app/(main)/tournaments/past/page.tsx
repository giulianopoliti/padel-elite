import React from "react"
import { getTournamentsOptimized, getCategories, getClubsForFilter } from "@/app/api/tournaments"
import TournamentsLayout from "../components/tournaments-layout"
import PaginationWrapper from "../components/pagination-wrapper"
import { Archive } from "lucide-react"
import PublicTournamentList from "@/components/public/public-tournament-list"

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{
    page?: string
    category?: string
    club?: string
    search?: string
  }>
}

export default async function PastTournamentsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const categoryFilter = params.category
  const clubFilter = params.club
  const searchTerm = params.search

  const [tournamentsData, categories, clubs] = await Promise.all([
    getTournamentsOptimized({
      status: "past",
      page,
      limit: 30,
      filters: {
        categoryName: categoryFilter,
        clubId: clubFilter,
        search: searchTerm,
      },
    }),
    getCategories(),
    getClubsForFilter(),
  ])

  const { tournaments, totalCount } = tournamentsData

  return (
    <TournamentsLayout categories={categories} clubs={clubs}>
      {tournaments.length > 0 ? (
        <>
          <div className="mb-8">
            <PublicTournamentList
              tournaments={tournaments}
              emptyTitle="No hay torneos pasados"
              emptyDescription="No hay torneos pasados disponibles."
            />
          </div>

          <PaginationWrapper total={totalCount} pageSize={30} currentPage={page} />
        </>
      ) : (
        <EmptyState
          icon={<Archive className="h-8 w-8 text-gray-400" />}
          title="No hay torneos pasados"
          description={
            categoryFilter || clubFilter || searchTerm
              ? "No se encontraron torneos finalizados con los filtros seleccionados. Intenta ajustar tu busqueda."
              : "No hay torneos finalizados en el sistema. Los torneos completados apareceran aqui."
          }
        />
      )}
    </TournamentsLayout>
  )
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">{icon}</div>
      <h3 className="mb-2 text-xl font-medium text-gray-700">{title}</h3>
      <p className="mx-auto max-w-md text-gray-500">{description}</p>
    </div>
  )
}
