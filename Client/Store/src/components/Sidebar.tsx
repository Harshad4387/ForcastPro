import { 
  Package, 
  ShoppingBag, 
  ArrowDownToLine, 
  Send, 
  Eye, 
  LogOut,
  CheckCheck    // ✅ NEW ICON
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Raw Materials",
    icon: Package,
    path: "/dashboard/raw-materials",
  },
  {
    title: "Products",
    icon: ShoppingBag,
    path: "/dashboard/products",
  },
  {
    title: "Inward Raw Materials",
    icon: ArrowDownToLine,
    path: "/dashboard/inward-products",
  },
  {
    title: "Send Product Request",
    icon: Send,
    path: "/dashboard/send-request",
  },
  {
    title: "View Requests",
    icon: Eye,
    path: "/dashboard/view-requests",
  },
  {
    title: "View Accepted Requests",   // ✅ NEW TAB
    icon: CheckCheck,                  // ✅ ICON
    path: "/dashboard/view-accepted-requests",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-sidebar-background border-r border-sidebar-border flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="font-bold text-lg text-sidebar-foreground">Store Manager</h2>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
