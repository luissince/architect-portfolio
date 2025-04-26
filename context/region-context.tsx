"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCookie } from "cookies-next"

type RegionData = {
  currency: string
  currencySymbol: string
  address: string
  phone: string
  timeZone: string
}

type RegionContextType = {
  region: string
  regionData: RegionData
}

// Datos específicos por región
const regionSettings: Record<string, RegionData> = {
  // Países de habla hispana
  es: {
    currency: "EUR",
    currencySymbol: "€",
    address: "Calle Gran Vía 123, Madrid, España",
    phone: "+34 91 123 45 67",
    timeZone: "Europe/Madrid",
  },
  mx: {
    currency: "MXN",
    currencySymbol: "$",
    address: "Av. Paseo de la Reforma 483, CDMX, México",
    phone: "+52 55 1234 5678",
    timeZone: "America/Mexico_City",
  },
  pe: {
    currency: "PEN",
    currencySymbol: "S/",
    address: "Av. Javier Prado Este 2875, San Borja, Lima, Perú",
    phone: "+51 1 234 5678",
    timeZone: "America/Lima",
  },
  // Países de habla inglesa
  us: {
    currency: "USD",
    currencySymbol: "$",
    address: "350 Fifth Avenue, New York, NY 10118, USA",
    phone: "+1 212 123 4567",
    timeZone: "America/New_York",
  },
  gb: {
    currency: "GBP",
    currencySymbol: "£",
    address: "20 Regent Street, London, SW1Y 4PH, UK",
    phone: "+44 20 1234 5678",
    timeZone: "Europe/London",
  },
  // Valor predeterminado
  default: {
    currency: "EUR",
    currencySymbol: "€",
    address: "Calle Gran Vía 123, Madrid, España",
    phone: "+34 91 123 45 67",
    timeZone: "Europe/Madrid",
  },
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<string>("default")
  const [regionData, setRegionData] = useState<RegionData>(regionSettings.default)

  useEffect(() => {
    // Obtener la región del usuario desde la cookie establecida por el middleware
    const userRegion = getCookie("user-region")?.toString() || "default"
    setRegion(userRegion)

    // Establecer los datos específicos de la región
    setRegionData(regionSettings[userRegion] || regionSettings.default)
  }, [])

  return <RegionContext.Provider value={{ region, regionData }}>{children}</RegionContext.Provider>
}

export function useRegion() {
  const context = useContext(RegionContext)
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider")
  }
  return context
}
