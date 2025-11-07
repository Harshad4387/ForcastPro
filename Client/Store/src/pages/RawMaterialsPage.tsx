import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface RawMaterial {
  _id: string;
  UniqueId: number;
  name: string;
  quantity: number;
  unit: string;
  supplier: string;
}

const RawMaterialsPage = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<RawMaterial[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch raw materials from backend using JWT token
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

        const response = await axios.get(`${BASE_URL}/store/RawMaterial/getRawmaterial`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setRawMaterials(response.data.data);
          setFilteredMaterials(response.data.data);
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

  // ✅ Filter materials based on search
  useEffect(() => {
    const filtered = rawMaterials.filter(
      (material) =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaterials(filtered);
  }, [searchTerm, rawMaterials]);

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Package className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Raw Materials</h2>
          <p className="text-sm text-muted-foreground">
            Manage and search your raw materials inventory
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Search Bar */}
      <div className="mb-4 relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search by name or supplier..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-muted-foreground">Loading raw materials...</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Raw Materials Inventory</CardTitle>
            <CardDescription>
              Current stock levels and supplier information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredMaterials.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Material Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Quantity
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Supplier
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMaterials.map((material) => (
                      <tr
                        key={material._id}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium">
                          {material.name}
                        </td>
                        <td className="py-3 px-4">
                          {material.quantity} {material.unit}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {material.supplier}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No matching raw materials found.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RawMaterialsPage;
