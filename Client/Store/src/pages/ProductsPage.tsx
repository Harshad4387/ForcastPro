import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface Product {
  _id: string;
  name: string;
  quantity: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products only once from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/store/Product/getProducts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
          setError("");
        } else {
          setError(response.data.message || "Failed to fetch products.");
        }
      } catch (err: any) {
        console.error("Error fetching products:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError("Server error. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Local search: move matching products to the top
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();

    // Sort: matching first, then non-matching
    const sorted = [...products].sort((a, b) => {
      const aMatch = a.name.toLowerCase().includes(lowerSearch);
      const bMatch = b.name.toLowerCase().includes(lowerSearch);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return a.name.localeCompare(b.name);
    });

    setFilteredProducts(sorted);
  }, [searchTerm, products]);

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <ShoppingBag className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Products</h2>
          <p className="text-sm text-muted-foreground">
            View and search available products with quantity
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
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-muted-foreground">Loading products...</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>
              List of all products and their quantities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Product Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        key={product._id}
                        className={`border-b transition-colors ${
                          product.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                            ? "bg-primary/5"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              product.quantity > 50
                                ? "default"
                                : product.quantity > 20
                                ? "secondary"
                                : "destructive"
                            }
                            className={
                              product.quantity > 50
                                ? "bg-green-500 hover:bg-green-600"
                                : ""
                            }
                          >
                            {product.quantity} units
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No products found.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductsPage;
