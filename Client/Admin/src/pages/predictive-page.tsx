import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const PredictivePage = () => {
  const metrics = [
    { title: "Production Efficiency", value: "87%", change: "+5%", trending: "up" },
    { title: "Quality Score", value: "94%", change: "+2%", trending: "up" },
    { title: "Machine Downtime", value: "3.2h", change: "-12%", trending: "down" },
    { title: "Energy Consumption", value: "2.4 MW", change: "+8%", trending: "up" },
  ];

  const predictions = [
    { month: "Next Week", efficiency: 89, quality: 95, downtime: 2.8 },
    { month: "2 Weeks", efficiency: 91, quality: 96, downtime: 2.5 },
    { month: "3 Weeks", efficiency: 92, quality: 96, downtime: 2.2 },
    { month: "4 Weeks", efficiency: 93, quality: 97, downtime: 2.0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-2">AI-Powered Predictions</h3>
        <p className="text-muted-foreground">
          Advanced analytics and machine learning predictions for production optimization
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.trending === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.trending === "up" && metric.title !== "Energy Consumption" ? "text-green-600" : "text-muted-foreground"}`}>
                {metric.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>4-Week Performance Forecast</CardTitle>
          <CardDescription>Predicted metrics based on historical data and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((pred) => (
              <div key={pred.month} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-primary" />
                  <span className="font-medium">{pred.month}</span>
                </div>
                <div className="flex gap-6 text-sm">
                  <span>Efficiency: <strong>{pred.efficiency}%</strong></span>
                  <span>Quality: <strong>{pred.quality}%</strong></span>
                  <span>Downtime: <strong>{pred.downtime}h</strong></span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Recommendations</CardTitle>
          <CardDescription>AI-suggested preventive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="font-medium text-yellow-800">Machine A3 - Scheduled Maintenance Due</p>
              <p className="text-sm text-yellow-700">Predicted failure probability: 23% within 5 days</p>
            </div>
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
              <p className="font-medium text-blue-800">Production Line 2 - Optimization Available</p>
              <p className="text-sm text-blue-700">Potential efficiency gain: +7% with parameter adjustment</p>
            </div>
            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
              <p className="font-medium text-green-800">Quality Control - All Systems Normal</p>
              <p className="text-sm text-green-700">No immediate actions required</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictivePage;
