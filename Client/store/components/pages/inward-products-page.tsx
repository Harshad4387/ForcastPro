"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { RAW_MATERIALS } from "@/lib/store-data"
import { Plus, CheckCircle } from "lucide-react"

interface RawMaterialRequest {
  id: number
  materialName: string
  quantity: number
  date: string
  requestId: string
}

const initialRequests: RawMaterialRequest[] = []

export default function InwardProductsPage() {
  const [requests, setRequests] = useState<RawMaterialRequest[]>(initialRequests)
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [quantity, setQuantity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMaterial || !quantity) return

    const newRequest: RawMaterialRequest = {
      id: requests.length + 1,
      materialName: selectedMaterial,
      quantity: Number.parseInt(quantity),
      date: new Date().toISOString().split("T")[0],
      requestId: `RMR-${new Date().getFullYear()}-${String(requests.length + 1).padStart(4, "0")}`,
    }

    setRequests([newRequest, ...requests])
    setSelectedMaterial("")
    setQuantity("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Inward Raw Materials</h2>
        <p className="text-muted-foreground">Add Materail</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          Add new Raw Material in Store
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Raw Material Name</label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select a raw material...</option>
                {RAW_MATERIALS.map((material) => (
                  <option key={material} value={material}>
                    {material}
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
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter quantity"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium transition-colors"
              >
                Add Material
              </button>
            </div>
          </div>
        </form>
      </Card>

      {requests.length > 0 && (
        <Card className="overflow-hidden">
          <div className="bg-orange-50 dark:bg-orange-950 px-6 py-3 border-b border-orange-200 dark:border-orange-800">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              Submitted Requests ({requests.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-100/50 dark:bg-orange-900/30 border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Request ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Material Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, idx) => (
                  <tr key={request.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="px-6 py-4 text-sm font-mono text-orange-600 dark:text-orange-400">
                      {request.requestId}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{request.materialName}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{request.quantity} units</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{request.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
