import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Building, MapPin, Phone, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  const adminInfo = {
    name: "Admin User",
    email: "admin@gmail.com",
    role: "System Administrator",
    department: "Operations Management",
    location: "Factory HQ - Building A",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2023",
    employeeId: "ADM-001",
  };

  const permissions = [
    "Full System Access",
    "User Management",
    "Production Control",
    "Inventory Management",
    "Analytics & Reports",
    "Security Settings",
  ];

  const recentActivity = [
    { action: "Updated inventory levels", time: "2 hours ago" },
    { action: "Approved production schedule", time: "5 hours ago" },
    { action: "Added new worker profile", time: "1 day ago" },
    { action: "Generated monthly report", time: "2 days ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2">Admin Profile</h3>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your account details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b">
              <Avatar className="h-20 w-20 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{adminInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{adminInfo.role}</p>
                <Badge className="mt-2 bg-primary/10 text-primary hover:bg-primary/10">
                  <Shield className="h-3 w-3 mr-1" />
                  Administrator
                </Badge>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={adminInfo.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex gap-2 items-center">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input id="email" defaultValue={adminInfo.email} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2 items-center">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input id="phone" defaultValue={adminInfo.phone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <div className="flex gap-2 items-center">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <Input id="department" defaultValue={adminInfo.department} />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2 items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input id="location" defaultValue={adminInfo.location} />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Employee ID</p>
                <p className="font-medium font-mono">{adminInfo.employeeId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Join Date</p>
                <p className="font-medium">{adminInfo.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Type</p>
                <p className="font-medium">Administrator</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Your access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    {permission}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <p className="text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
