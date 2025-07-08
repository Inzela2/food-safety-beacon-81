
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Calendar, CheckCircle, Clock, Shield, Thermometer, DollarSign, Users, ShieldCheck, Lock } from "lucide-react";
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

        {/* Compliance Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="haccp" className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4" />
              <span>HACCP</span>
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Tax</span>
            </TabsTrigger>
            <TabsTrigger value="workplace" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Workplace</span>
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Safety</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
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
          </TabsContent>

          <TabsContent value="haccp">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🍔 Daily Food Safety Command Center • Updated: Real-Time
                </CardTitle>
                <CardDescription>
                  Critical food safety protocols and temperature monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Penalty Risk</TableHead>
                      <TableHead>Proof Required</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Temperature Checks - Coolroom (0-5°C)</TableCell>
                      <TableCell>6AM, 2PM, 10PM</TableCell>
                      <TableCell><Badge variant="destructive">Overdue</Badge></TableCell>
                      <TableCell>$10k fine</TableCell>
                      <TableCell>📸 Photo + digital log</TableCell>
                      <TableCell><Button size="sm">Log Now</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Meat expiry verification</TableCell>
                      <TableCell>Pre-service</TableCell>
                      <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                      <TableCell>$7k penalty</TableCell>
                      <TableCell>📆 System alert</TableCell>
                      <TableCell><Button size="sm" variant="outline">Check</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Handwash station audit</TableCell>
                      <TableCell>Hourly</TableCell>
                      <TableCell><Badge variant="default">Complete</Badge></TableCell>
                      <TableCell>Health shutdown</TableCell>
                      <TableCell>🚰 Water temp log</TableCell>
                      <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                  <p className="text-sm text-teal-800">
                    🔥 Critical Items: 3 | ✅ Completed: 8/15 | ⏳ Next: Delivery inspection (11AM)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  💼 Tax Obligations • BAS Cycle: Current Quarter
                </CardTitle>
                <CardDescription>
                  Australian tax compliance and filing requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Late Penalty</TableHead>
                      <TableHead>Auto-File</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">BAS Lodgment</TableCell>
                      <TableCell>Quarterly</TableCell>
                      <TableCell><Badge variant="destructive">Overdue</Badge></TableCell>
                      <TableCell>$1,100/day</TableCell>
                      <TableCell>🚀 ATO API</TableCell>
                      <TableCell><Button size="sm">File Now</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">GST Reconciliation</TableCell>
                      <TableCell>Weekly</TableCell>
                      <TableCell><Badge variant="secondary">Due Today</Badge></TableCell>
                      <TableCell>2% of owed</TableCell>
                      <TableCell>🧾 POS sync</TableCell>
                      <TableCell><Button size="sm" variant="outline">Process</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PAYG Withholding</TableCell>
                      <TableCell>Monthly</TableCell>
                      <TableCell><Badge variant="default">Current</Badge></TableCell>
                      <TableCell>$210/day</TableCell>
                      <TableCell>👨‍💼 Payroll link</TableCell>
                      <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ⚠️ Outstanding: PAYG (Due TODAY) | 💰 Saved this quarter: $2,800
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workplace">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  👩‍⚖️ Fair Work Sentinel • Current Award Version
                </CardTitle>
                <CardDescription>
                  Australian workplace law compliance and Fair Work Act requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Auto-Check</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Break time compliance</TableCell>
                      <TableCell>Per shift</TableCell>
                      <TableCell><Badge variant="secondary">Monitoring</Badge></TableCell>
                      <TableCell>$12k penalty</TableCell>
                      <TableCell>⏱️ Timeclock</TableCell>
                      <TableCell><Button size="sm" variant="outline">Review</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Penalty rate audit</TableCell>
                      <TableCell>Weekly</TableCell>
                      <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                      <TableCell>Backpay owed</TableCell>
                      <TableCell>💵 Award scanner</TableCell>
                      <TableCell><Button size="sm">Audit</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Super guarantee</TableCell>
                      <TableCell>Pay cycle</TableCell>
                      <TableCell><Badge variant="default">Current</Badge></TableCell>
                      <TableCell>200% fine</TableCell>
                      <TableCell>🏦 STP sync</TableCell>
                      <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🧯 Safety War Room • Last Drill: January 15th
                </CardTitle>
                <CardDescription>
                  Workplace Health & Safety compliance and OH&S requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Legal Ref</TableHead>
                      <TableHead>Proof</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Fire extinguisher check</TableCell>
                      <TableCell>Monthly</TableCell>
                      <TableCell><Badge variant="secondary">Due Soon</Badge></TableCell>
                      <TableCell>AS 1851</TableCell>
                      <TableCell>🔥 Pressure gauge photo</TableCell>
                      <TableCell><Button size="sm">Inspect</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">First aid kit restock</TableCell>
                      <TableCell>Weekly</TableCell>
                      <TableCell><Badge variant="default">Complete</Badge></TableCell>
                      <TableCell>WHS Act</TableCell>
                      <TableCell>🩹 Expiry log</TableCell>
                      <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Electrical tag testing</TableCell>
                      <TableCell>6 months</TableCell>
                      <TableCell><Badge variant="destructive">Overdue</Badge></TableCell>
                      <TableCell>$90k fine</TableCell>
                      <TableCell>🔌 Contractor cert</TableCell>
                      <TableCell><Button size="sm">Book Test</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🔒 Data Fortress • 12 Days Since Last Audit
                </CardTitle>
                <CardDescription>
                  Privacy Act compliance and data protection requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Breach Cost</TableHead>
                      <TableHead>Tool</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">POS data purge</TableCell>
                      <TableCell>Weekly</TableCell>
                      <TableCell><Badge variant="default">Complete</Badge></TableCell>
                      <TableCell>$2.1m max</TableCell>
                      <TableCell>🗑️ Auto-wipe</TableCell>
                      <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Password rotation</TableCell>
                      <TableCell>90 days</TableCell>
                      <TableCell><Badge variant="secondary">Due in 7 days</Badge></TableCell>
                      <TableCell>$50k</TableCell>
                      <TableCell>🔑 Manager override</TableCell>
                      <TableCell><Button size="sm">Rotate</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
