
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Calendar, Plus, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Inspections = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    location: "",
    inspectionType: "",
    inspectionDate: "",
    inspector: "",
    result: "",
    violations: "",
    notes: ""
  });

  const recentInspections = [
    {
      id: 1,
      businessName: "Corner Café",
      location: "123 Collins Street, Melbourne",
      inspectionType: "Food Safety",
      date: "2024-06-22",
      result: "Minor Violations",
      inspector: "Sarah Johnson",
      violations: "Temperature log discrepancies, missing date on one cleaning schedule",
      distance: "800m"
    },
    {
      id: 2,
      businessName: "Mediterranean Grill",
      location: "45 Bourke Street, Melbourne",
      inspectionType: "Halal Certification",
      date: "2024-06-19",
      result: "Major Violations",
      inspector: "Ahmed Hassan",
      violations: "Expired halal certificate, mixed storage of halal/non-halal items",
      distance: "1.2km"
    },
    {
      id: 3,
      businessName: "Artisan Breads",
      location: "78 Chapel Street, Melbourne",
      inspectionType: "Health Department",
      date: "2024-06-15",
      result: "Passed",
      inspector: "Michael Chen",
      violations: "None",
      distance: "650m"
    },
    {
      id: 4,
      businessName: "Daily Grind Café",
      location: "156 Flinders Lane, Melbourne",
      inspectionType: "Fire Safety",
      date: "2024-06-08",
      result: "Failed",
      inspector: "Robert Taylor",
      violations: "Blocked emergency exits, faulty smoke detectors",
      distance: "2.1km"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.location || !formData.inspectionType) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Inspection report submitted!",
      description: "Thank you for contributing to the compliance community."
    });

    setFormData({
      businessName: "",
      location: "",
      inspectionType: "",
      inspectionDate: "",
      inspector: "",
      result: "",
      violations: "",
      notes: ""
    });
    setShowForm(false);
  };

  const getResultColor = (result: string) => {
    switch (result.toLowerCase()) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'minor violations': return 'bg-yellow-100 text-yellow-800';
      case 'major violations': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inspection Reports</h1>
            <p className="text-gray-600 mt-2">
              Track and report inspection results in your area
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Report Inspection
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Add Inspection Form */}
            {showForm && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Report an Inspection</CardTitle>
                  <CardDescription>
                    Help the community by sharing inspection results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="inspectionType">Inspection Type *</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, inspectionType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inspection type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="food-safety">Food Safety</SelectItem>
                            <SelectItem value="health-department">Health Department</SelectItem>
                            <SelectItem value="fire-safety">Fire Safety</SelectItem>
                            <SelectItem value="halal-certification">Halal Certification</SelectItem>
                            <SelectItem value="kosher-certification">Kosher Certification</SelectItem>
                            <SelectItem value="liquor-license">Liquor License</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="inspectionDate">Inspection Date</Label>
                        <Input
                          id="inspectionDate"
                          type="date"
                          value={formData.inspectionDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, inspectionDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="inspector">Inspector Name</Label>
                        <Input
                          id="inspector"
                          value={formData.inspector}
                          onChange={(e) => setFormData(prev => ({ ...prev, inspector: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="result">Result</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, result: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select result" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="passed">Passed</SelectItem>
                            <SelectItem value="minor-violations">Minor Violations</SelectItem>
                            <SelectItem value="major-violations">Major Violations</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="violations">Violations Found</Label>
                      <Textarea
                        id="violations"
                        placeholder="Describe any violations or issues found..."
                        value={formData.violations}
                        onChange={(e) => setFormData(prev => ({ ...prev, violations: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information..."
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Submit Report
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Recent Inspections */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Inspections in Your Area</CardTitle>
                <CardDescription>
                  Stay informed about nearby inspection results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentInspections.map((inspection) => (
                    <div key={inspection.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{inspection.businessName}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {inspection.location} ({inspection.distance} away)
                          </div>
                        </div>
                        <Badge className={getResultColor(inspection.result)}>
                          {inspection.result}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <p className="font-medium">{inspection.inspectionType}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Date:</span>
                          <p className="font-medium">{inspection.date}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Inspector:</span>
                          <p className="font-medium">{inspection.inspector}</p>
                        </div>
                      </div>
                      
                      {inspection.violations !== "None" && (
                        <div className="mt-3 p-3 bg-white rounded border">
                          <span className="text-sm text-gray-500">Violations Found:</span>
                          <p className="text-sm mt-1">{inspection.violations}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inspection Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold">24 inspections</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pass Rate</span>
                    <span className="font-semibold text-green-600">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minor Violations</span>
                    <span className="font-semibold text-yellow-600">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Major Violations</span>
                    <span className="font-semibold text-red-600">8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Violations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Violations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Temperature logs</span>
                    <Badge variant="secondary">42%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cleaning schedules</span>
                    <Badge variant="secondary">31%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Food storage</span>
                    <Badge variant="secondary">28%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Documentation</span>
                    <Badge variant="secondary">23%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Staff training</span>
                    <Badge variant="secondary">19%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inspection Types */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inspection Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Food Safety', 'Health Department', 'Fire Safety', 'Halal Certification', 'Kosher Certification', 'Liquor License'].map((type, index) => (
                    <div key={type} className="flex justify-between text-sm">
                      <span>{type}</span>
                      <span className="text-gray-500">{Math.floor(Math.random() * 10) + 1}</span>
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

export default Inspections;
