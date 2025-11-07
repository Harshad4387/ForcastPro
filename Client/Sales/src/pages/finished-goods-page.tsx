import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boxes, TrendingUp, Package, Truck } from "lucide-react";

const FinishedGoodsPage = () => {
  const products = [
    { id: "FG-101", name: "Product Alpha", quantity: 450, status: "Ready", category: "Electronics", warehouse: "W1" },
    { id: "FG-102", name: "Product Beta", quantity: 230, status: "Ready", category: "Mechanical", warehouse: "W2" },
    { id: "FG-103", name: "Product Gamma", quantity: 180, status: "Packaging", category: "Electronics", warehouse: "W1" },
    { id: "FG-104", name: "Product Delta", quantity: 520, status: "Ready", category: "Components", warehouse: "W3" },
    { id: "FG-105", name: "Product Epsilon", quantity: 95, status: "Quality Check", category: "Mechanical", warehouse: "W2" },
    { id: "FG-106", name: "Product Zeta", quantity: 340, status: "Ready", category: "Electronics", warehouse: "W1" },
  ];

  const shipments = [
    { id: "SH-2401", product: "Product Alpha", quantity: 150, destination: "New York", status: "Dispatched", date: "2024-01-15" },
    { id: "SH-2402", product: "Product Beta", quantity: 80, destination: "Los Angeles", status: "In Transit", date: "2024-01-14" },
    { id: "SH-2403", product: "Product Delta", quantity: 200, destination: "Chicago", status: "Delivered", date: "2024-01-12" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Ready": "bg-green-100 text-green-800",
      "Packaging": "bg-blue-100 text-blue-800",
      "Quality Check": "bg-yellow-100 text-yellow-800",
      "Dispatched": "bg-purple-100 text-purple-800",
      "In Transit": "bg-blue-100 text-blue-800",
      "Delivered": "bg-green-100 text-green-800",
    };
    return <Badge className={`${variants[status]} hover:${variants[status]}`}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2">Finished Goods Management</h3>
        <p className="text-muted-foreground">
          Track completed products, inventory levels, and shipment status
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,815</div>
            <p className="text-xs text-muted-foreground">Units available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready to Ship</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,540</div>
            <p className="text-xs text-muted-foreground">Units ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">Production increase</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Current stock of finished goods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Product ID</th>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Warehouse</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-mono text-sm">{product.id}</td>
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4">{product.quantity} units</td>
                    <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
                    <td className="py-3 px-4 text-sm">{product.category}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{product.warehouse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
          <CardDescription>Track outgoing product deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {shipments.map((shipment) => (
              <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{shipment.id} - {shipment.product}</p>
                  <p className="text-sm text-muted-foreground">
                    {shipment.quantity} units → {shipment.destination}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  {getStatusBadge(shipment.status)}
                  <p className="text-xs text-muted-foreground">{shipment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinishedGoodsPage;
