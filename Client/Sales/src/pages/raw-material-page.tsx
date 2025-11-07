import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Package } from "lucide-react";

const RawMaterialPage = () => {
  const inventory = [
    { id: "RM-001", name: "Steel Sheets", quantity: 2450, unit: "kg", status: "In Stock", reorderLevel: 1000, supplier: "MetalCo Inc" },
    { id: "RM-002", name: "Aluminum Rods", quantity: 850, unit: "kg", status: "Low Stock", reorderLevel: 1200, supplier: "AlumSource Ltd" },
    { id: "RM-003", name: "Copper Wire", quantity: 3200, unit: "m", status: "In Stock", reorderLevel: 1500, supplier: "WireTech" },
    { id: "RM-004", name: "Plastic Pellets", quantity: 450, unit: "kg", status: "Critical", reorderLevel: 800, supplier: "PolyMasters" },
    { id: "RM-005", name: "Rubber Components", quantity: 1890, unit: "units", status: "In Stock", reorderLevel: 1000, supplier: "RubberWorks" },
    { id: "RM-006", name: "Glass Sheets", quantity: 720, unit: "units", status: "Low Stock", reorderLevel: 900, supplier: "ClearGlass Co" },
  ];

  const recentDeliveries = [
    { date: "2024-01-15", material: "Steel Sheets", quantity: "1500 kg", supplier: "MetalCo Inc" },
    { date: "2024-01-14", material: "Copper Wire", quantity: "2000 m", supplier: "WireTech" },
    { date: "2024-01-12", material: "Rubber Components", quantity: "890 units", supplier: "RubberWorks" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low Stock</Badge>;
      case "Critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2">Raw Material Inventory</h3>
        <p className="text-muted-foreground">
          Monitor and manage raw material stock levels and suppliers
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
            <p className="text-xs text-muted-foreground">Active materials</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Stock</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Above reorder level</p>
          </CardContent>
        </Card>
      </div>

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
                  <th className="text-left py-3 px-4 font-medium">ID</th>
                  <th className="text-left py-3 px-4 font-medium">Material</th>
                  <th className="text-left py-3 px-4 font-medium">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Reorder Level</th>
                  <th className="text-left py-3 px-4 font-medium">Supplier</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-mono text-sm">{item.id}</td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.quantity} {item.unit}</td>
                    <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                    <td className="py-3 px-4">{item.reorderLevel} {item.unit}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{item.supplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
          <CardDescription>Latest material arrivals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentDeliveries.map((delivery, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{delivery.material}</p>
                  <p className="text-sm text-muted-foreground">{delivery.supplier}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{delivery.quantity}</p>
                  <p className="text-sm text-muted-foreground">{delivery.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RawMaterialPage;
