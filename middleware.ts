import { type NextRequest, NextResponse } from "next/server";

// Cache simple en memoria para evitar múltiples requests a la misma IP
const ipCache = new Map<string, { region: string; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

export async function middleware(request: NextRequest) {
  // Skip middleware para rutas específicas
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/api/') || 
      pathname.startsWith('/_next/') || 
      pathname.includes('.')) {
    return NextResponse.next();
  }

  let ip: string | null = null;
  
  // Obtener la IP del cliente según el entorno
  if (process.env.NODE_ENV === 'development') {
    ip = process.env.DEV_IP || '127.0.0.1';
  } else {
    ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         request.headers.get('x-real-ip') ||
         request.headers.get('cf-connecting-ip') || // Cloudflare
         '127.0.0.1';
  }

  // Obtener el idioma de la cookie o usar 'es' por defecto
  const locale = request.cookies.get('user-locale')?.value || 'es';
  let region = 'pe'; // Valor por defecto

  // Solo intentar obtener información de IP en producción y si no es localhost
  if (process.env.NODE_ENV === 'production' && 
      ip && 
      ip !== '127.0.0.1' && 
      ip !== 'localhost' && 
      !ip.startsWith('192.168.') && 
      !ip.startsWith('10.')) {
    
    // Verificar cache
    const cached = ipCache.get(ip);
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      region = cached.region;
    } else {
      try {
        // Usar AbortController para timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 segundos timeout

        const ipInfo = await fetch(`https://ip-api.com/json/${ip}?fields=status,countryCode`, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; NextJS-App/1.0)',
          },
        });
        
        clearTimeout(timeoutId);

        if (ipInfo.ok) {
          const data = await ipInfo.json();
          if (data.status === "success" && data.countryCode) {
            region = data.countryCode.toLowerCase();
            // Guardar en cache
            ipCache.set(ip, { region, timestamp: Date.now() });
          }
        }
      } catch (error) {
        // Log silencioso del error
        if ((process.env.NODE_ENV as string) === 'development') {
          console.warn("IP lookup failed:", (error as Error).message);
        }
        // Continuar con valor por defecto
      }
    }
  }

  // Limpiar cache viejo ocasionalmente
  if (Math.random() < 0.1) { // 10% de probabilidad
    const now = Date.now();
    for (const [key, value] of ipCache.entries()) {
      if (now - value.timestamp > CACHE_DURATION) {
        ipCache.delete(key);
      }
    }
  }

  // Siempre continuar con la request
  const response = NextResponse.next();
  
  // Solo establecer cookies si han cambiado
  const currentLocale = request.cookies.get('user-locale')?.value;
  const currentRegion = request.cookies.get('user-region')?.value;
  
  if (currentLocale !== locale) {
    response.cookies.set("user-locale", locale, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
  }
  
  if (currentRegion !== region) {
    response.cookies.set("user-region", region, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};