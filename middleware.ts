import { type NextRequest, NextResponse } from "next/server"

// Lista de países por idioma
const SPANISH_COUNTRIES = [
  "es",
  "mx",
  "ar",
  "co",
  "pe",
  "cl",
  "ec",
  "gt",
  "cu",
  "bo",
  "do",
  "hn",
  "py",
  "sv",
  "ni",
  "cr",
  "pa",
  "uy",
  "ve",
]
const ENGLISH_COUNTRIES = ["us", "gb", "au", "ca", "nz", "ie", "za", "sg", "in"]

export function middleware(request: NextRequest) {
  // Obtener la URL actual
  const url = request.nextUrl.clone()

  // Obtener el país del usuario (desde la cabecera o geolocalización)
  // Next.js proporciona esta información a través de geo en entornos de producción de Vercel
  const country = request.geo?.country?.toLowerCase() || "es"

  // Obtener el idioma preferido del navegador
  const acceptLanguage = request.headers.get("accept-language") || ""
  const preferredLanguage = acceptLanguage.split(",")[0].split("-")[0].toLowerCase()

  // Determinar el idioma basado en el país o preferencia del navegador
  let locale = "es" // Idioma predeterminado

  if (ENGLISH_COUNTRIES.includes(country)) {
    locale = "en"
  } else if (SPANISH_COUNTRIES.includes(country)) {
    locale = "es"
  } else if (preferredLanguage === "en" || preferredLanguage === "es") {
    // Si el país no está en nuestras listas, usar el idioma preferido del navegador
    locale = preferredLanguage
  }

  // Almacenar la información de la región en una cookie para usarla en el cliente
  const response = NextResponse.next()
  response.cookies.set("user-locale", locale)
  response.cookies.set("user-region", country)

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
