import Home from "@/app/components/BtnHome"
import RootLayout from "@/app/layout"
Home
RootLayout

export default function GamesList () {
  return(
    <RootLayout>
      <div>
        <h1>Estos son las categorias</h1>

      </div>
      <Home />
    </RootLayout>
  )
}