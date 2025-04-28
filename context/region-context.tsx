"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCookie } from "cookies-next"

type Language = "es" | "en"

type RegionData = {
  region: string
  lenguaje: Language
  currency: string
  currencySymbol: string
  address: string
  phone: string
  timeZone: string
}

type RegionContextType = {
  regionData: RegionData,
  setRegionData: (regionData: RegionData) => void
}

// Datos específicos por región
export const regionSettings: Record<string, RegionData> = {
  // Países de habla hispana
  pe: {
    region: "pe",
    lenguaje: "es",
    currency: "PEN",
    currencySymbol: "S/",
    address: "Av. Javier Prado Este 2875, San Borja, Lima, Perú",
    phone: "+51 1 234 5678",
    timeZone: "America/Lima",
  },
  // Países de habla inglesa
  us: {
    region: "us",
    lenguaje: "en",
    currency: "USD",
    currencySymbol: "$",
    address: "350 Fifth Avenue, New York, NY 10118, USA",
    phone: "+1 212 123 4567",
    timeZone: "America/New_York",
  },
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)

export function RegionProvider({ children }: { children: ReactNode }) {
  const [regionData, setRegionData] = useState<RegionData>(regionSettings.pe)

  useEffect(() => {
    // Obtener la región del usuario desde la cookie establecida por el middleware
    const userRegion = getCookie("user-region")?.toString() || regionSettings.pe.currency.toUpperCase()

    // Establecer los datos específicos de la región
    setRegionData(regionSettings[userRegion] || regionSettings.pe)
  }, [])

  return <RegionContext.Provider value={{ regionData, setRegionData }}>{children}</RegionContext.Provider>
}

export function useRegion() {
  const context = useContext(RegionContext)
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider")
  }
  return context
}
