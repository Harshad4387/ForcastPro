import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Package } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface RawMaterial {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  supplier: string;
}

const RawMaterialPage = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<RawMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch raw materials from backend
  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/admin/get-all-raw-material`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setRawMaterials(response.data.data);
          setFilteredMaterials(response.data.data);
          setError("");
        } else {
          setError(response.data.message || "Failed to fetch raw materials.");
        }
      } catch (err: any) {
        console.error("Error fetching raw materials:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError("Server error. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRawMaterials();
  }, []);

  // ✅ Helper to get stock status
  const getStatus = (item: RawMaterial) => {
    if (item.quantity <= 0) return "Out of Stock";
    if (item.quantity <= item.reorderLevel / 2) return "Critical";
    if (item.quantity <= item.reorderLevel) return "Low Stock";
    return "In Stock";
  };

  // ✅ Badge colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            In Stock
          </Badge>
        );
      case "Low Stock":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Low Stock
          </Badge>
        );
      case "Critical":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Critical
          </Badge>
        );
      case "Out of Stock":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Out of Stock
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // ✅ Compute summary stats
  const totalItems = rawMaterials.length;
  const lowStockCount = rawMaterials.filter(
    (item) => item.quantity <= item.reorderLevel
  ).length;
  const healthyStock = totalItems - lowStockCount;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Raw Material Inventory
        </h3>
        <p className="text-muted-foreground">
          Monitor and manage raw material stock levels and suppliers
        </p>
      </div>

      {/* Loading/Error States */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading && (
        <p className="text-muted-foreground">Loading materials...</p>
      )}

      {!loading && !error && (
        <>
          {/* Dashboard Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Items
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalItems}</div>
                <p className="text-xs text-muted-foreground">
                  Active materials
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Low Stock Alerts
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lowStockCount}</div>
                <p className="text-xs text-muted-foreground">
                  Requires attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Healthy Stock
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{healthyStock}</div>
                <p className="text-xs text-muted-foreground">
                  Above reorder level
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Current Inventory</CardTitle>
              <CardDescription>Real-time stock levels and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Material</th>
                      <th className="text-left py-3 px-4 font-medium">Quantity</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Reorder Level</th>
                      <th className="text-left py-3 px-4 font-medium">Supplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMaterials.map((item) => {
                      const status = getStatus(item);
                      return (
                        <tr key={item._id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{item.name}</td>
                          <td className="py-3 px-4">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="py-3 px-4">{getStatusBadge(status)}</td>
                          <td className="py-3 px-4">
                            {item.reorderLevel} {item.unit}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {item.supplier || "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default RawMaterialPage;
