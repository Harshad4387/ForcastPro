"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PRODUCTS } from "@/lib/store-data"
import { Plus } from "lucide-react"

interface Request {
  id: number
  product: string
  quantity: number
  date: string
  status: "Approved" | "Pending" | "Rejected"
}

const initialRequests: Request[] = [
  {
    id: 1,
    product: "1 PH DOL",
    quantity: 5,
    date: "2024-10-25",
    status: "Approved",
  },
  {
    id: 2,
    product: "3 PH DRYRUN",
    quantity: 3,
    date: "2024-10-24",
    status: "Pending",
  },
  {
    id: 3,
    product: "DOL METAL",
    quantity: 2,
    date: "2024-10-23",
    status: "Approved",
  },
  {
    id: 4,
    product: "KAVEERI MINI",
    quantity: 20,
    date: "2024-10-22",
    status: "Rejected",
  },
  {
    id: 5,
    product: "2 PH DOL",
    quantity: 10,
    date: "2024-10-21",
    status: "Approved",
  },
  {
    id: 6,
    product: "SEMI METAL",
    quantity: 8,
    date: "2024-10-20",
    status: "Pending",
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

export default function SendProductRequestPage() {
  const [requests, setRequests] = useState<Request[]>(initialRequests)
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct || !quantity) return

    const newRequest: Request = {
      id: requests.length + 1,
      product: selectedProduct,
      quantity: Number.parseInt(quantity),
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    }

    setRequests([newRequest, ...requests])
    setSelectedProduct("")
    setQuantity("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Send Product Request</h2>
        <p className="text-muted-foreground">Create and manage product requests</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-destructive" />
          Create New Request
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
                required
              >
                <option value="">Select a product...</option>
                {PRODUCTS.map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
                placeholder="Enter quantity"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 font-medium transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        </form>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-destructive/10 border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, idx) => (
                <tr key={request.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{request.product}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{request.quantity}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{request.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
