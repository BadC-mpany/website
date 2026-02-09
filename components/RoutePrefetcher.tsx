'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const routes = ['/product', '/blog', '/story']

export default function RoutePrefetcher() {
    const router = useRouter()

    useEffect(() => {
        // Prefetch all routes after a short delay to not block initial render
        const timer = setTimeout(() => {
            routes.forEach(route => {
                router.prefetch(route)
            })
        }, 1000)

        return () => clearTimeout(timer)
    }, [router])

    return null
}
