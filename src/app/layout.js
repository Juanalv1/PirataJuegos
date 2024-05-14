
import './globals.css'
import { AppContextProvider } from './Context/AppContext'


export default function RootLayout({ children }) {
  return (
      <html lang="es"> 
        <body className='w-full min-h-screen bg-[#FFFCE6]  font-Cinzel'>
        <AppContextProvider> 
        {children}</AppContextProvider> 
        </body>
      </html>
  )
}
