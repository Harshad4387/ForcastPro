import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, Search, Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

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

  // Dialog State
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [requestQuantity, setRequestQuantity] = useState<string>(""); // ✅ store as string

  const { toast } = useToast();
  const quantityInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Fetch products from backend
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

  // ✅ Local search filter
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();

    const sorted = [...products].sort((a, b) => {
      const aMatch = a.name.toLowerCase().includes(lowerSearch);
      const bMatch = b.name.toLowerCase().includes(lowerSearch);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return a.name.localeCompare(b.name);
    });

    setFilteredProducts(sorted);
  }, [searchTerm, products]);

  // ✅ Autofocus input when dialog opens
  useEffect(() => {
    if (open && quantityInputRef.current) {
      setTimeout(() => {
        quantityInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // ✅ Handle Request Submit
// ✅ Check stock and create request
const handleSubmitRequest = async () => {
  const quantity = Number(requestQuantity);
  if (!selectedProduct || !quantity || quantity <= 0) {
    toast({
      title: "Invalid Quantity",
      description: "Please enter a valid quantity greater than 0.",
      variant: "destructive",
    });
    return;
  }


  try {
    const token = localStorage.getItem("authToken");


    // 1️⃣ Check stock first
    const checkRes = await axios.post(
      `${BASE_URL}/store/request/check-stock`,
      { productId: selectedProduct._id, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );


    if (!checkRes.data.success) {
      toast({
        title: "Stock Check Failed",
        description: checkRes.data.message || "Error checking stock.",
        variant: "destructive",
      });
      return;
    }


    if (!checkRes.data.isSufficient) {
      toast({
        title: "Insufficient Stock",
        description: checkRes.data.message,
        variant: "destructive",
      });
      return;
    }


    // 2️⃣ If sufficient, create request
    const createRes = await axios.post(
      `${BASE_URL}/store/request/send-product-request`,
      { productId: selectedProduct._id, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );


    if (createRes.data.success) {
      toast({
        title: "Request Sent!",
        description: "Production request created successfully.",
      });
      setOpen(false);
      setRequestQuantity("");
    } else {
      toast({
        title: "Request Failed",
        description: createRes.data.message || "Unable to send request.",
        variant: "destructive",
      });
    }
  } catch (err) {
    console.error(err);
    toast({
      title: "Server Error",
      description: "Unable to connect to the server. Please try again.",
      variant: "destructive",
    });
  }
};







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
            View and request available products with quantity
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

      {/* Loading or Table */}
      {loading ? (
        <p className="text-muted-foreground">Loading products...</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>List of all products and their quantities</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-sm">Product Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        key={product._id}
                        className={`border-b transition-colors ${
                          product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedProduct(product);
                              setRequestQuantity(""); // ✅ reset quantity field
                              setOpen(true);
                            }}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Request
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No products found.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dialog for Quantity Input */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Request Product – {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            <Label htmlFor="quantityInput">Enter Quantity</Label>
            <Input
              ref={quantityInputRef}
              id="quantityInput"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="e.g., 25"
              value={requestQuantity}
              onChange={(e) => setRequestQuantity(e.target.value)} // ✅ string value allows clearing
              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRequest}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
