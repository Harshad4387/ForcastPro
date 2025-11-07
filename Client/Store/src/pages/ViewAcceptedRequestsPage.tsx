import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ViewAcceptedRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectLoading, setCollectLoading] = useState<string | null>(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // ✅ Get token from localStorage
  const token = localStorage.getItem("authToken");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Send token in headers
    },
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/store/request/get-all-accepted`,
        axiosConfig
      );
     console.log("✅ Accepted Requests Response:", response.data);
      setRequests(response.data.data || []);
    } catch (error) {
      console.error("Error fetching accepted requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCollect = async (requestId: string) => {
  try {
    setCollectLoading(requestId);

    await axios.put(
      `${BASE_URL}/store/request/collected`,
      { requestId }, // ✅ sending id in req.body
      axiosConfig
    );

    fetchRequests(); // ✅ refresh list
  } catch (error) {
    console.error("Error collecting request:", error);
  } finally {
    setCollectLoading(null);
  }
};


  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Accepted Requests</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : requests.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">
          No accepted requests found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req: any) => (
            <Card key={req._id} className="shadow-md p-2">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Request #{req._id.slice(-6)}</span>
                  <Badge variant="secondary">Accepted</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <p>
                  <strong>Product:</strong> {req.product?.name}
                </p>
                <p>
                  <strong>Requested By:</strong> {req.requestedBy?.name}
                </p>
                <p>
                  <strong>Assigned To:</strong> {req.assignedTo?.name}
                </p>
                <p>
                  <strong>Quantity:</strong>{" "}
                  <span className="font-semibold">{req.quantity}</span>
                </p>
                <p>
                  <strong>Accepted On:</strong>{" "}
                  {new Date(req.
startedAt
).toLocaleString()}
                </p>

                <Button
                  className="w-full mt-2"
                  onClick={() => handleCollect(req._id)}
                  disabled={collectLoading === req._id}
                >
                  {collectLoading === req._id ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  {collectLoading === req._id ? "Collecting..." : "Collect"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAcceptedRequestsPage;
