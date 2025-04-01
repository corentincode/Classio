import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Initialiser Prisma
const prisma = new PrismaClient()

// Définir les domaines qui ne sont pas des sous-domaines d'établissements
const publicDomains = ['www', 'admin', 'api']

// Définir les chemins qui ne nécessitent pas de vérification de sous-domaine
const publicPaths = ['/api/auth', '/_next', '/favicon.ico', '/images']

// Fonction pour vérifier si un chemin est public
function isPublicPath(pathname: string) {
  return publicPaths.some(path => pathname.startsWith(path))
}

// Middleware pour gérer les sous-domaines
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Si le chemin est une route d'authentification, laisser NextAuth gérer
  if (pathname.startsWith('/api/auth')) {
    return
  }
  
  // Récupérer le nom d'hôte de la requête
  const hostname = request.headers.get('host') || ''
  
  // Vérifier si nous sommes sur le domaine principal ou un sous-domaine
  const isDomainClassio = hostname.endsWith('.classio.fr')
  
  // Si nous ne sommes pas sur le domaine classio.fr, continuer normalement
  if (!isDomainClassio) {
    return
  }
  
  // Extraire le sous-domaine
  const sousDomaine = hostname.split('.')[0]
  
  // Si c'est un domaine public, continuer normalement
  if (publicDomains.includes(sousDomaine)) {
    return
  }
  
  try {
    // Vérifier si l'établissement existe avec ce sous-domaine
    const etablissement = await prisma.etablissement.findUnique({
      where: { sousDomaine },
      select: { id: true, nom: true }
    })
    
    // Si l'établissement n'existe pas, rediriger vers une page 404 ou la page d'accueil
    if (!etablissement) {
      return NextResponse.redirect(new URL('/404', request.url))
    }
    
    // Construire l'URL de redirection vers l'interface de l'établissement
    const url = new URL(`/etablissements/${sousDomaine}${pathname}`, request.url)
    
    // Ajouter l'ID et le nom de l'établissement comme paramètres de requête
    url.searchParams.set('etablissementId', etablissement.id)
    url.searchParams.set('etablissementNom', etablissement.nom)
    
    // Préserver les paramètres de requête existants
    request.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value)
    })
    
    // Rediriger vers l'interface de l'établissement
    return NextResponse.rewrite(url)
  } catch (error) {
    console.error('Erreur lors de la vérification du sous-domaine:', error)
    return
  }
}

// Configuration du matcher pour le middleware
export const config = {
  matcher: [
    // Exclure les fichiers statiques mais inclure les API d'authentification
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}