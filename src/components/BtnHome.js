import Link from "next/link"

export default function Home (){
  return(
    <div>
  <button className="p-1 bg-blue-600 rounded-lg">
  <Link href={`/`}>
  Home</Link>       
</button></div>
    )
}