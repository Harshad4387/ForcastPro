import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Topbar = () => {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-xl font-semibold text-foreground">Store Dashboard</h1>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
