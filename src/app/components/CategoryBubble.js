export default function CategoryBubble({ categoria }) {

  return(
    <div className="rounded  text-sm p-1  text-gray-600 flex justify-end items-end ">
      <p>{categoria}</p>
    </div>
  )
}