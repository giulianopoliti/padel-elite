import { createClient } from "@/utils/supabase/server"
import { getTenantOrganization } from "@/lib/services/tenant-organization.service"
import type { PublicTournamentSummary } from "@/types/public-tournament"

export interface TenantClub {
  id: string
  name: string
  address: string | null
  courts: number | null
  cover_image_url: string | null
}

export interface TenantRankingPlayer {
  id: string
  first_name: string | null
  last_name: string | null
  score: number | null
  category_name: string | null
  club_name: string | null
  profile_image_url: string | null
}

export interface TenantHomeData {
  organization: {
    id: string
    slug: string | null
    name: string
    description: string | null
    logo_url: string | null
  } | null
  tournaments: PublicTournamentSummary[]
  clubs: TenantClub[]
}

export async function getTenantHomeData(): Promise<TenantHomeData> {
  const supabase = await createClient()
  const organization = await getTenantOrganization()

  if (!organization) {
    return {
      organization: null,
      tournaments: [],
      clubs: [],
    }
  }

  const [tournamentsResult, clubsResult] = await Promise.all([
    supabase
      .from("tournaments")
      .select(`
        id,
        name,
        status,
        type,
        category_name,
        gender,
        start_date,
        end_date,
        price,
        enable_transfer_proof,
        transfer_alias,
        transfer_amount,
        clubes(id, name, address)
      `)
      .eq("organization_id", organization.id)
      .eq("status", "NOT_STARTED")
      .order("start_date", { ascending: true })
      .limit(8),
    supabase
      .from("organization_clubs")
      .select("clubes(id, name, address, courts, cover_image_url)")
      .eq("organizacion_id", organization.id)
      .limit(6),
  ])

  const tournaments = (tournamentsResult.data || []).map((tournament: any) => ({
    id: tournament.id,
    name: tournament.name,
    type: tournament.type,
    status: tournament.status,
    categoryName: tournament.category_name,
    gender: tournament.gender,
    startDate: tournament.start_date,
    endDate: tournament.end_date,
    price: tournament.price,
    enableTransferProof: tournament.enable_transfer_proof,
    transferAlias: tournament.transfer_alias,
    transferAmount: tournament.transfer_amount,
    club: Array.isArray(tournament.clubes)
      ? {
          id: tournament.clubes[0]?.id || null,
          name: tournament.clubes[0]?.name || null,
          address: tournament.clubes[0]?.address || null,
        }
      : {
          id: tournament.clubes?.id || null,
          name: tournament.clubes?.name || null,
          address: tournament.clubes?.address || null,
        },
  }))

  const clubs = (clubsResult.data || [])
    .map((item: any) => item.clubes)
    .filter(Boolean)
    .map((club: any) => ({
      id: club.id,
      name: club.name,
      address: club.address,
      courts: club.courts,
      cover_image_url: club.cover_image_url,
    }))

  return {
    organization: {
      id: organization.id,
      slug: organization.slug,
      name: organization.name,
      description: organization.description,
      logo_url: organization.logo_url,
    },
    tournaments,
    clubs,
  }
}
