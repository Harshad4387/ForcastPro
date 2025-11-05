"use client"

import { Button } from "@/components/ui/button"
import { Package, BookOpen as BoxOpen, ArrowDown, Send, Eye, LogOut } from "lucide-react"

interface SidebarProps {
  activePage: string
  onPageChange: (page: string) => void
  onLogout: () => void
}

const menuItems = [
  { id: "raw-materials", label: "Raw Materials", icon: Package },
  { id: "products", label: "Products", icon: BoxOpen },
  { id: "inward-products", label: "Inward Products", icon: ArrowDown },
  { id: "send-request", label: "Send Product Request", icon: Send },
  { id: "view-requests", label: "View Requests", icon: Eye },
]

export default function Sidebar({ activePage, onPageChange, onLogout }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-foreground">Store Mgmt</h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.id

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button onClick={onLogout} variant="outline" className="w-full flex items-center gap-2 bg-transparent">
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </aside>
  )
}
