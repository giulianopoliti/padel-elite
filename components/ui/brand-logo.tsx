import Image from "next/image"
import { getTenantBranding } from "@/config/tenant"

interface BrandLogoProps {
  variant?: "navbar" | "hero"
  className?: string
  priority?: boolean
}

export default function BrandLogo({
  variant = "navbar",
  className,
  priority = true,
}: BrandLogoProps) {
  const branding = getTenantBranding()
  const src = variant === "hero" ? branding.logo.hero : branding.logo.navbar
  const markSrc = branding.logo.mark
  const alt = `${branding.siteName} logo`
  const sizeClasses = variant === "hero" ? "h-24 w-auto sm:h-28" : "h-12 w-auto sm:h-14"

  if (!src) {
    return (
      <div className={className || `flex items-center gap-3 ${sizeClasses}`} aria-label={alt}>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-[var(--tpe-lime)] bg-[var(--tpe-night)] text-sm font-black uppercase text-[var(--tpe-lime)]">
          TPE
        </div>
        <div className="leading-none">
          <p className="text-lg font-black uppercase tracking-[0.18em] text-[var(--tpe-paper)]">{branding.shortName}</p>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--tpe-cyan)]">{branding.siteName}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {variant === "navbar" && markSrc ? (
        <div className={className || "flex items-center gap-3"}>
          <Image
            src={markSrc}
            alt={`${branding.siteName} mark`}
            width={112}
            height={112}
            className="h-11 w-auto sm:hidden"
            style={{ width: "auto", height: "auto", maxHeight: "44px" }}
            priority={priority}
          />
          <Image
            src={src}
            alt={alt}
            width={440}
            height={120}
            className="hidden h-12 w-auto sm:block sm:h-14"
            style={{ width: "auto", height: "auto", maxHeight: "56px" }}
            priority={priority}
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={440}
          height={120}
          className={className || sizeClasses}
          style={{ width: "auto", height: "auto", maxHeight: variant === "hero" ? "112px" : "56px" }}
          priority={priority}
        />
      )}
    </>
  )
}
