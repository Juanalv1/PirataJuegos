
import './globals.css'
import { AppContextProvider } from './Context/AppContext'
import Script from 'next/script'


export default function RootLayout({ children }) {
  return (
      <html lang="es"> 
        <body className='w-full min-h-screen bg-[#FFFCE6]  font-Cinzel'>
        <AppContextProvider> 
        {children}</AppContextProvider> 
        </body>
        <Script src="//pl21111464.toprevenuegate.com/9c30a0f07e3e73bde234faed95ab8d55/invoke.js" />
      </html>
  )
}
