import './globals.css'
import { UserProvider } from './userContext'


 const metadata = {
  title: 'PirataJuegos',
  description: 'Descarga juegos piratas gratis',
}

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="es">
        <body className='w-full min-h-screen bg-[#FFFCE6]  font-Cinzel'>{children}</body>
      </html>
    </UserProvider>
  )
}
