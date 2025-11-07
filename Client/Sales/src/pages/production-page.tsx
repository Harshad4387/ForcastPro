import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, UserCheck, Clock, Award } from "lucide-react";

const ProductionPage = () => {
  const workers = [
    { id: "W001", name: "John Smith", role: "Machine Operator", shift: "Morning", status: "Active", productivity: 94, department: "Assembly" },
    { id: "W002", name: "Sarah Johnson", role: "Quality Inspector", shift: "Morning", status: "Active", productivity: 98, department: "QC" },
    { id: "W003", name: "Mike Chen", role: "Production Supervisor", shift: "Afternoon", status: "Active", productivity: 91, department: "Assembly" },
    { id: "W004", name: "Emma Davis", role: "Machine Operator", shift: "Afternoon", status: "Break", productivity: 89, department: "Machining" },
    { id: "W005", name: "James Wilson", role: "Maintenance Tech", shift: "Morning", status: "Active", productivity: 96, department: "Maintenance" },
    { id: "W006", name: "Lisa Brown", role: "Quality Inspector", shift: "Night", status: "Offline", productivity: 92, department: "QC" },
    { id: "W007", name: "David Lee", role: "Machine Operator", shift: "Morning", status: "Active", productivity: 87, department: "Assembly" },
    { id: "W008", name: "Maria Garcia", role: "Production Supervisor", shift: "Night", status: "Offline", productivity: 95, department: "Packaging" },
  ];

  const shiftStats = [
    { shift: "Morning", active: 4, total: 12, hours: "06:00 - 14:00" },
    { shift: "Afternoon", active: 2, total: 10, hours: "14:00 - 22:00" },
    { shift: "Night", active: 0, total: 8, hours: "22:00 - 06:00" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Active": "bg-green-100 text-green-800",
      "Break": "bg-yellow-100 text-yellow-800",
      "Offline": "bg-gray-100 text-gray-800",
    };
    return <Badge className={`${variants[status]} hover:${variants[status]}`}>{status}</Badge>;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2">Production Workers</h3>
        <p className="text-muted-foreground">
          Monitor workforce status, shifts, and productivity metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
            <p className="text-xs text-muted-foreground">Across all shifts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Active</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">On duty now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Productivity</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shift Overview</CardTitle>
          <CardDescription>Current staffing by shift schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {shiftStats.map((shift) => (
              <div key={shift.shift} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{shift.shift} Shift</p>
                  <p className="text-sm text-muted-foreground">{shift.hours}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{shift.active}/{shift.total}</p>
                  <p className="text-xs text-muted-foreground">Active/Total</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Worker Directory</CardTitle>
          <CardDescription>Complete list of production staff</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Worker</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                  <th className="text-left py-3 px-4 font-medium">Shift</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Productivity</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-primary">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {getInitials(worker.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{worker.name}</p>
                          <p className="text-xs text-muted-foreground">{worker.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{worker.role}</td>
                    <td className="py-3 px-4 text-sm">{worker.department}</td>
                    <td className="py-3 px-4 text-sm">{worker.shift}</td>
                    <td className="py-3 px-4">{getStatusBadge(worker.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${worker.productivity}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{worker.productivity}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionPage;
