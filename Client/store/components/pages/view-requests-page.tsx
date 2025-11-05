import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const allRequests = [
  {
    id: 1,
    requestId: "REQ-001",
    type: "Material",
    item: "Steel Sheets",
    quantity: 200,
    department: "Production",
    date: "2024-10-25",
    status: "Approved",
    approvedBy: "Admin",
  },
  {
    id: 2,
    requestId: "REQ-002",
    type: "Product",
    item: "Industrial Motor",
    quantity: 5,
    department: "Sales",
    date: "2024-10-24",
    status: "Pending",
    approvedBy: "-",
  },
  {
    id: 3,
    requestId: "REQ-003",
    type: "Material",
    item: "Aluminum Bars",
    quantity: 150,
    department: "Production",
    date: "2024-10-23",
    status: "Approved",
    approvedBy: "Manager",
  },
  {
    id: 4,
    requestId: "REQ-004",
    type: "Product",
    item: "Control Panel",
    quantity: 3,
    department: "Maintenance",
    date: "2024-10-22",
    status: "Rejected",
    approvedBy: "-",
  },
  {
    id: 5,
    requestId: "REQ-005",
    type: "Material",
    item: "Copper Wire",
    quantity: 50,
    department: "Production",
    date: "2024-10-21",
    status: "Approved",
    approvedBy: "Admin",
  },
  {
    id: 6,
    requestId: "REQ-006",
    type: "Product",
    item: "Hydraulic Pump",
    quantity: 2,
    department: "Operations",
    date: "2024-10-20",
    status: "Approved",
    approvedBy: "Manager",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "Material":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    case "Product":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export default function ViewRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">View Requests</h2>
        <p className="text-muted-foreground">View all product and material requests</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary/10 border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Request ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Item</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Approved By</th>
              </tr>
            </thead>
            <tbody>
              {allRequests.map((request, idx) => (
                <tr key={request.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                  <td className="px-6 py-4 text-sm font-mono text-primary">{request.requestId}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge className={getTypeColor(request.type)}>{request.type}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{request.item}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{request.quantity}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{request.department}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{request.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{request.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
