export interface TenantBranding {
  siteName: string
  shortName: string
  siteDomain: string
  supportEmail: string
  tenantOrganizationSlug: string
  logo: {
    navbar: string
    hero: string
    mark?: string
  }
  assets: {
    favicon: string
    appleTouchIcon: string
    manifest: string
    placeholderLogo: string
    placeholderUser: string
  }
  seo: {
    title: string
    description: string
  }
  home: {
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
}

const defaultBranding: TenantBranding = {
  siteName: "PadelElite",
  shortName: "TPE Padel",
  siteDomain: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  supportEmail: "info@padel-elite.com",
  tenantOrganizationSlug: process.env.NEXT_PUBLIC_TENANT_ORGANIZATION_SLUG || "padel-elite",
  logo: {
    navbar: "/tpe-logo-text.svg",
    hero: "/tpe-logo-text.svg",
    mark: "/tpe-logo-mark.svg",
  },
  assets: {
    favicon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
    manifest: "/site.webmanifest",
    placeholderLogo: "/placeholder-logo.svg",
    placeholderUser: "/placeholder-user.jpg",
  },
  seo: {
    title: "PadelElite",
    description: "Torneos semanales de padel con inscripcion clara, rapida y centrada en la experiencia del jugador.",
  },
  home: {
    title: "Proximos torneos de PadelElite",
    subtitle: "Toda la agenda semanal en un formato claro: categoria, horario, sede e inscripcion desde el primer vistazo.",
    ctaPrimary: "Ver torneos",
    ctaSecondary: "Ver clubes",
  },
}

export function getTenantBranding(): TenantBranding {
  return defaultBranding
}

export const TENANT_CONFIG = getTenantBranding()
