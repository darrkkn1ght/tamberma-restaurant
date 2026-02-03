import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-center px-4">
            <div>
                <h2 className="text-4xl font-display text-primary-500 mb-4">404</h2>
                <p className="text-xl text-gray-300 mb-8">Page Not Found</p>
                <Link
                    href="/"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
