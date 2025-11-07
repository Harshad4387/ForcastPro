import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("storemanager"); // ✅ match key used in LoginPage
    if (!userId) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
