
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Surprise Food Safety Inspection at Café 800m Away",
      description: "Health inspectors conducted an unscheduled inspection at 'Corner Café' on Collins Street. Found minor violations including temperature log discrepancies.",
      location: "800m from your location",
      time: "12 hours ago",
      severity: "medium",
      category: "Food Safety Inspection"
    },
    {
      id: 2,
      title: "New Meat Safety Regulations Announced",
      description: "Victorian Government announces stricter meat handling requirements effective March 2024. All businesses serving meat products must update their safety protocols.",
      location: "State-wide announcement",
      time: "2 days ago",
      severity: "high",
      category: "Regulatory Update"
    },
    {
      id: 3,
      title: "Restaurant Fined $15,000 for Expired Halal Certificate",
      description: "'Mediterranean Grill' received significant penalty for operating with expired halal certification. Business temporarily closed until compliance restored.",
      location: "1.2km from your location",
      time: "4 days ago",
      severity: "high",
      category: "Compliance Violation"
    },
    {
      id: 4,
      title: "Local Bakery Passes Surprise Health Inspection",
      description: "'Artisan Breads' received perfect score during unannounced inspection. Praised for excellent food safety documentation and temperature monitoring.",
      location: "650m from your location",
      time: "1 week ago",
      severity: "low",
      category: "Positive News"
    },
    {
      id: 5,
      title: "Dairy Compliance Changes Coming Next Month",
      description: "Food Standards Australia New Zealand (FSANZ) implementing new dairy storage requirements. Temperature logging intervals reduced to 2-hour checks.",
      location: "National update",
      time: "1 week ago",
      severity: "medium",
      category: "Regulatory Update"
    },
    {
      id: 6,
      title: "Coffee Shop Closure Due to Fire Safety Violations",
      description: "'Daily Grind Café' forced to close after failing fire safety inspection. Issues included blocked exits and faulty smoke detection systems.",
      location: "2.1km from your location",
      time: "2 weeks ago",
      severity: "high",
      category: "Safety Violation"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Local Compliance News</h1>
          <p className="text-gray-600 mt-2">
            Stay informed about inspections, violations, and regulatory changes in your area
          </p>
        </div>

        {/* Alert Banner */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-900">High Alert: Increased Inspection Activity</h3>
                <p className="text-red-700 mt-1">
                  Health department conducting surprise inspections in your area. Ensure all compliance documentation is current.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News Feed */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main News */}
          <div className="lg:col-span-2 space-y-6">
            {newsItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="outline" className={getSeverityColor(item.severity)}>
                          {getSeverityIcon(item.severity)}
                          <span className="ml-1 capitalize">{item.severity} Priority</span>
                        </Badge>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {item.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {item.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.time}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week's Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Inspections nearby</span>
                    <span className="font-semibold">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Violations reported</span>
                    <span className="font-semibold text-red-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New regulations</span>
                    <span className="font-semibold text-yellow-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success stories</span>
                    <span className="font-semibold text-green-600">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inspection Radius */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inspection Radius</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Within 500m</span>
                    <span className="font-medium">2 inspections</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Within 1km</span>
                    <span className="font-medium">5 inspections</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Within 2km</span>
                    <span className="font-medium">12 inspections</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">News Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Food Safety Inspection', 'Regulatory Update', 'Compliance Violation', 'Safety Violation', 'Positive News'].map((category) => (
                    <div key={category} className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span className="text-gray-500">
                        {newsItems.filter(item => item.category === category).length}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
