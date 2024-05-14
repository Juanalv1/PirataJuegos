export default function CategoryBubble({ categoria }) {

  return(
    <div className="rounded  text-xs  text-gray-600 flex justify-end items-end font-semibold">
      <p>{categoria}</p>
    </div>
  )
}