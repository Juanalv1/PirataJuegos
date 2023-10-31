import './globals.css'
import { UserProvider } from './userContext'
import Script from 'next/script'


 const metadata = {
  title: 'PirataJuegos',
  description: 'Descarga juegos piratas gratis',
}


export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="es">       
        <body className='w-full min-h-screen bg-[#FFFCE6]  font-Cinzel'>{children}</body>
        <Script src="//pl21111464.toprevenuegate.com/9c30a0f07e3e73bde234faed95ab8d55/invoke.js" />
      </html>
    </UserProvider>
  )
}
