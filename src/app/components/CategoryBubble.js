export default function CategoryBubble({ categoria }) {

  return(
    <div className="rounded bg-slate-500 text-sm p-1 flex">
      <p>{categoria}</p>
    </div>
  )
}