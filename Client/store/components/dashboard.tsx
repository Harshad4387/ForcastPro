"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Topbar from "@/components/topbar"
import RawMaterialsPage from "@/components/pages/raw-materials-page"
import ProductsPage from "@/components/pages/products-page"
import InwardProductsPage from "@/components/pages/inward-products-page"
import SendProductRequestPage from "@/components/pages/send-product-request-page"
import ViewRequestsPage from "@/components/pages/view-requests-page"

interface DashboardProps {
  onLogout: () => void
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activePage, setActivePage] = useState("raw-materials")

  const renderPage = () => {
    switch (activePage) {
      case "raw-materials":
        return <RawMaterialsPage />
      case "products":
        return <ProductsPage />
      case "inward-products":
        return <InwardProductsPage />
      case "send-request":
        return <SendProductRequestPage />
      case "view-requests":
        return <ViewRequestsPage />
      default:
        return <RawMaterialsPage />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activePage={activePage} onPageChange={setActivePage} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">{renderPage()}</main>
      </div>
    </div>
  )
}
