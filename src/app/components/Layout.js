
import RootLayout from "../layout";
import Navbar from './Navbar'

export default function Layout ({children}) {
  return(
    <RootLayout>
      <header className="w-full"><Navbar /></header>
      <main className="bg-[#FFCF57] mx-1 lg:mx-10 my-2">
      {children}
      </main>
    </RootLayout>
  )
}