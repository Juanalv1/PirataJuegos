export default function CategoryBubble({ categoria }) {

  return(
    <div className="rounded  text-sm px-0.5  text-gray-600 flex justify-end items-end font-semibold">
      <p>{categoria}</p>
    </div>
  )
}