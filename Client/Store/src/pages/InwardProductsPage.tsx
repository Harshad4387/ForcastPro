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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface RawMaterial {
  _id: string;
  name: string;
  category: string;
  quantity: number;
}

const RawMaterialsPage = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<RawMaterial[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<RawMaterial | null>(null);
  const [addQuantity, setAddQuantity] = useState<number | "">("");
  const { toast } = useToast();

  // ✅ Fetch raw materials (used in multiple places)
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
        `${BASE_URL}/store/RawMaterial/getRawmaterial`,
        {
          headers: { Authorization: `Bearer ${token}` },
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

  // ✅ Fetch data initially
  useEffect(() => {
    fetchRawMaterials();
  }, []);

  // ✅ Filter materials based on search
  useEffect(() => {
    const filtered = rawMaterials.filter(
      (material) =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaterials(filtered);
  }, [searchTerm, rawMaterials]);

  // ✅ Open popup for inward
  const openInwardDialog = (material: RawMaterial) => {
    setSelectedMaterial(material);
    setAddQuantity("");
    setOpenDialog(true);
  };

  // ✅ Handle inward API + auto refresh
  const handleInward = async () => {
    if (!selectedMaterial || !addQuantity) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication token missing. Please log in again.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/store/RawMaterial/inward`,
        {
          _id: selectedMaterial._id,
          name: selectedMaterial.name,
          category: selectedMaterial.category,
          addQuantity: Number(addQuantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast({
          title: "Success",
          description: `Raw material "${selectedMaterial.name}" updated successfully.`,
        });

        setOpenDialog(false);
        setAddQuantity("");

        // ✅ Refresh data from backend
        await fetchRawMaterials();
      } else {
        setError(response.data.message || "Failed to update quantity.");
      }
    } catch (err: any) {
      console.error("Inward API error:", err);
      setError("Server error while updating raw material quantity.");
    }
  };

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
            Manage and update your raw material inventory
          </p>
        </div>
      </div>

      {/* Error Alert */}
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
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-muted-foreground">Loading raw materials...</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Raw Material Inventory</CardTitle>
            <CardDescription>
              List of raw materials with categories and available quantities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredMaterials.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMaterials.map((material) => (
                      <tr
                        key={material._id}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium">{material.name}</td>
                        <td className="py-3 px-4">{material.category}</td>
                        <td className="py-3 px-4">{material.quantity}</td>
                        <td className="py-3 px-4">
                          <Button size="sm" onClick={() => openInwardDialog(material)}>
                            Inward
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No materials found.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* ✅ Inward Quantity Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Inward Raw Material</DialogTitle>
            <DialogDescription>
              Enter the quantity to add for{" "}
              <strong>{selectedMaterial?.name}</strong> ({selectedMaterial?.category})
            </DialogDescription>
          </DialogHeader>

          <div className="py-3">
            <Input
              type="number"
              placeholder="Enter quantity"
              value={addQuantity}
              onChange={(e) =>
                setAddQuantity(e.target.value ? Number(e.target.value) : "")
              }
              min="1"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleInward}
              disabled={!addQuantity || Number(addQuantity) <= 0}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RawMaterialsPage;
