import Link from "next/link"

interface GridItem {
  label: string
  href: string
}

export default function LotteryGrid({
  title,
  description,
  items,
}: {
  title?: string
  description?: string
  items: GridItem[]
}) {
  return (
    <div className="row justify-content-center menus-home">
      {items.map((item) => (
        <div key={item.href} className="col-md-4 col-lg-3 col-6 p-0">
          <Link
            className="btn btn-grey"
            href={item.href}
            title={item.label}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  )
}
