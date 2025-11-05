import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RAW_MATERIAL_QUANTITIES } from "@/lib/store-data"

function getStockStatus(quantity: number) {
  if (quantity > 100)
    return { status: "In Stock", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" }
  if (quantity > 50)
    return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" }
  return { status: "Critical", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" }
}

export default function RawMaterialsPage() {
  const materials = Object.entries(RAW_MATERIAL_QUANTITIES).map(([name, quantity], idx) => ({
    id: idx + 1,
    name,
    quantity,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Raw Materials</h2>
        <p className="text-muted-foreground">View all raw materials inventory</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary/10 border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Material Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, idx) => {
                const { status, color } = getStockStatus(material.quantity)
                return (
                  <tr key={material.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{material.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground font-semibold">{material.quantity} units</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge className={color}>{status}</Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
