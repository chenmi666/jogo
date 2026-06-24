import Link from "next/link"

export default function BreadcrumbNav({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  return (
    <div className="container">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, idx) => (
          <li
            key={item.url}
            className={`breadcrumb-item ${idx === items.length - 1 ? "active" : ""}`}
          >
            {idx === items.length - 1 ? (
              item.name
            ) : (
              <Link href={item.url}>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </div>
  )
}
