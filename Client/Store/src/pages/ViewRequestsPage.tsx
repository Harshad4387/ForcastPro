import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface Request {
  _id: string;
  date: string;
  product: string;
  quantity: number;
  unit: string;
  requestedBy: string;
  acceptedBy?: string;
  status: string;
}

const ViewRequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/store/request/get-all-request`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setRequests(response.data.data);
          setError("");
        } else {
          setError(response.data.message || "Failed to fetch requests.");
        }
      } catch (err: any) {
        console.error("Error fetching requests:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError("Server error. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 hover:bg-green-600";
      case "Approved":
        return "bg-blue-500 hover:bg-blue-600";
      case "In Progress":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Pending":
        return "bg-gray-500 hover:bg-gray-600";
      case "Rejected":
        return "";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Eye className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">View Requests</h2>
          <p className="text-sm text-muted-foreground">
            Track all product requests from departments
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading */}
      {loading ? (
        <p className="text-muted-foreground">Loading requests...</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Product Requests</CardTitle>
            <CardDescription>
              Complete history of submitted requests with current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Requested By</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Accepted By</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr
                        key={req._id}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(req.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 font-medium">{req.product}</td>
                        <td className="py-3 px-4">
                          {req.quantity} {req.unit}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {req.requestedBy}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {req.acceptedBy || "—"}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={req.status === "Rejected" ? "destructive" : "default"}
                            className={getStatusColor(req.status)}
                          >
                            {req.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No requests found.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ViewRequestsPage;
