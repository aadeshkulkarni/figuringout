import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Figuringout.life',
    short_name: 'FiguringOut',
    description: 'A Thought Journal',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/next.svg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/next.svg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}