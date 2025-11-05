import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const products = [
  { id: 1, name: "Industrial Motor", sku: "MOT-001", quantity: 25, category: "Motors", status: "Active", price: 15000 },
  { id: 2, name: "Control Panel", sku: "CP-002", quantity: 12, category: "Electronics", status: "Active", price: 8500 },
  { id: 3, name: "Hydraulic Pump", sku: "HP-003", quantity: 8, category: "Pumps", status: "Low Stock", price: 22000 },
  {
    id: 4,
    name: "Power Supply Unit",
    sku: "PSU-004",
    quantity: 0,
    category: "Electronics",
    status: "Out of Stock",
    price: 5200,
  },
  {
    id: 5,
    name: "Bearing Assembly",
    sku: "BA-005",
    quantity: 156,
    category: "Components",
    status: "Active",
    price: 2800,
  },
  { id: 6, name: "Pressure Valve", sku: "PV-006", quantity: 34, category: "Valves", status: "Active", price: 3500 },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Low Stock":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    case "Out of Stock":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Products</h2>
        <p className="text-muted-foreground">Manage your finished products</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/10 border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">SKU</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={product.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{product.quantity}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{product.category}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-secondary">₹{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
