import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Mail } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Logging in with:", email, password);
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });

      console.log("Response from backend:", response.data);

      if (response.data.success) {
        const { user, token } = response.data;

        localStorage.setItem("storemanager", user);
        localStorage.setItem("authToken", token);

        console.log("User ID stored:", localStorage.getItem("storemanager"));
        console.log("Navigating to dashboard...");

        // ✅ Small timeout ensures state updates flush before navigation
        setTimeout(() => navigate("/dashboard"), 300);
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Store Dashboard</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
