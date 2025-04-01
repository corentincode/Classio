import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                <h1 className="text-4xl font-bold text-[#c83e3e] mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
                <p className="text-gray-600 mb-6">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-[#c83e3e] text-white rounded-md hover:bg-[#b53535] transition-colors"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    )
}