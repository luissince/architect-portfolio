import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let ip: string | null = null;

  // Obtener la IP del cliente según el entorno
  if (process.env.ENV === 'development') {
    ip = process.env.DEV_IP || null;
  } else {
    ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         request.headers.get('x-real-ip') ||
         null;
  }

  if (!ip) {
    // Si no se puede obtener la IP, devolver una respuesta de error
    return NextResponse.json({ error: "Unable to determine client IP" }, { status: 400 });
  }

  try {
    // Obtener la información de la IP
    const ipInfo = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await ipInfo.json();

    if (data.status !== "success") {
      throw new Error("Unable to fetch IP information");
    }

    // Obtener el idioma de la cookie o usar 'es' por defecto
    // es = Español, en = Inglés
    const locale = request.cookies.get('user-locale')?.value || 'es';

    // Obtener la región de la respuesta de la API o usar 'pe' por defecto
    // pe = Perú, us = Estados Unidos
    const region = data.countryCode || 'pe';

    // Almacenar la información de la región y el idioma en cookies
    const response = NextResponse.next();
    response.cookies.set("user-locale", locale);
    response.cookies.set("user-region", region);

    return response;
  } catch (error) {
    // Manejar errores al obtener la información de la IP
    console.error("Error fetching IP information:", error);
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
