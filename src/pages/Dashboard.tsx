
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Calendar, CheckCircle, Clock, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('complianceShieldBusiness');
    if (stored) {
      setBusinessData(JSON.parse(stored));
    } else {
      navigate('/signup');
    }
  }, [navigate]);

  if (!businessData) return null;

  const urgentTasks = [
    {
      id: 1,
      title: "BAS Lodgment Q4 2024",
      status: "overdue",
      dueDate: "2024-01-28",
      overdueDays: 512,
      category: "Tax & Finance",
      penalty: "$1,100 per day after due date"
    },
    {
      id: 2,
      title: "Halal Certification Renewal",
      status: "overdue",
      dueDate: "2024-01-20",
      overdueDays: 520,
      category: "Meat Standards",
      penalty: "Cannot sell halal products"
    },
    {
      id: 3,
      title: "Meat Safety Standards Review",
      status: "pending",
      dueDate: "2024-02-05",
      overdueDays: 504,
      category: "Meat Standards",
      penalty: "$5,000 fine + license suspension"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-2">
            {businessData.businessName} • {businessData.businessType} • {businessData.location}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Overdue Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">7</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Urgent Tasks */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              Urgent: Overdue Tasks Requiring Immediate Attention
            </CardTitle>
            <CardDescription>
              These tasks are overdue and may result in penalties. Take action immediately.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentTasks.map((task) => (
                <div key={task.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <span className="text-sm text-gray-600">Due: {task.dueDate}</span>
                        <span className="text-sm text-red-600 font-medium">
                          🚨 Overdue by {task.overdueDays} days
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>Penalty:</strong> {task.penalty}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button onClick={() => navigate('/tasks')} className="bg-blue-600 hover:bg-blue-700">
                View All Tasks
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Menu Analysis Results */}
        {businessData.menuFile && (
          <Card>
            <CardHeader>
              <CardTitle>Menu Analysis Results</CardTitle>
              <CardDescription>
                Based on your uploaded menu, we've identified the following compliance requirements:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800">Meat Products Detected</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Requires: Halal certification, meat safety standards, temperature monitoring
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Dairy Products Detected</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Requires: Australian dairy regulations compliance, storage temperature logs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
