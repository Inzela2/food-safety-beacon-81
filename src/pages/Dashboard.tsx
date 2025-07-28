
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
      title: "Cal/OSHA Injury & Illness Prevention Program Annual Update",
      status: "overdue",
      dueDate: "2024-12-31",
      overdueDays: 28,
      category: "Cal/OSHA Workplace Safety",
      penalty: "$15,873 + $1,500/day | Risk: Workplace inspection failure"
    },
    {
      id: 2,
      title: "Food Handler Manager Certification Renewal",
      status: "overdue",
      dueDate: "2024-12-15",
      overdueDays: 42,
      category: "County Health Department",
      penalty: "$500-$5,000 + Possible closure | Risk: County health shutdown"
    },
    {
      id: 3,
      title: "Break Period Compliance Audit (CA Labor Law)",
      status: "overdue",
      dueDate: "2024-11-30",
      overdueDays: 58,
      category: "California Labor Board",
      penalty: "$50-$200 per employee per day | Risk: Class action lawsuit"
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
      
      {/* Multi-Agency Alert Feed */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 mt-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800 mb-3">
              Multi-Agency Alert Feed
            </p>
            <div className="space-y-2 text-sm text-red-700">
              <div className="p-2 bg-red-100 rounded">
                <p className="font-medium">[CAL/OSHA ALERT] New Heat Illness Prevention Requirements - Effective Sept 1st</p>
              </div>
              <div className="p-2 bg-orange-100 rounded">
                <p className="font-medium">[COUNTY HEALTH] Food Handler Permit Renewal Reminder - Due in 30 days</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded">
                <p className="font-medium">[CA LABOR] Minimum Wage Increase $18.50/hour - Effective Jan 1st</p>
              </div>
              <div className="p-2 bg-blue-100 rounded">
                <p className="font-medium">[LOCAL FIRE] Kitchen Suppression System Inspection Required - Schedule by Oct 15th</p>
              </div>
              <div className="p-2 bg-purple-100 rounded">
                <p className="font-medium">[CA ABC] Liquor License Renewal Window Opens - Apply 60 days before expiration</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="border-red-400 text-red-800 hover:bg-red-100">
                Emergency Action Plan
              </Button>
              <Button size="sm" variant="outline" className="border-red-400 text-red-800 hover:bg-red-100">
                Schedule Inspector Call
              </Button>
              <Button size="sm" variant="outline" className="border-red-400 text-red-800 hover:bg-red-100">
                Generate Compliance Report
              </Button>
            </div>
          </div>
        </div>
      </div>
      
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
                  <p className="text-sm font-medium text-gray-600">Critical (Multi-Agency Impact)</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Priority (Single Agency)</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Standard Compliance</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed This Month</p>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-1 text-xs">
              <Shield className="h-3 w-3" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="calosha" className="flex items-center space-x-1 text-xs">
              <ShieldCheck className="h-3 w-3" />
              <span>Cal/OSHA</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center space-x-1 text-xs">
              <Thermometer className="h-3 w-3" />
              <span>Health Dept</span>
            </TabsTrigger>
            <TabsTrigger value="labor" className="flex items-center space-x-1 text-xs">
              <Users className="h-3 w-3" />
              <span>Labor</span>
            </TabsTrigger>
            <TabsTrigger value="environmental" className="flex items-center space-x-1 text-xs">
              <AlertTriangle className="h-3 w-3" />
              <span>Environmental</span>
            </TabsTrigger>
            <TabsTrigger value="fire" className="flex items-center space-x-1 text-xs">
              <Shield className="h-3 w-3" />
              <span>Fire Safety</span>
            </TabsTrigger>
            <TabsTrigger value="abc" className="flex items-center space-x-1 text-xs">
              <CheckCircle className="h-3 w-3" />
              <span>ABC Licensing</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center space-x-1 text-xs">
              <Clock className="h-3 w-3" />
              <span>Business</span>
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center space-x-1 text-xs">
              <DollarSign className="h-3 w-3" />
              <span>Tax</span>
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

            {/* Risk Scoring System */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  🎯 Compliance Risk Score: 🔴 HIGH RISK (Score: 78/100)
                </CardTitle>
                <CardDescription>
                  Multi-agency risk assessment based on overdue tasks and inspection history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Risk Factors:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                        <span className="text-sm">🔴 Cal/OSHA: 3 overdue critical tasks</span>
                        <Badge variant="destructive">Critical</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                        <span className="text-sm">🟡 Health Dept: 1 permit expiring in 15 days</span>
                        <Badge variant="secondary">Warning</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                        <span className="text-sm">🟡 Labor Compliance: 2 pending wage audits</span>
                        <Badge variant="secondary">Warning</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="text-sm">🟢 Fire Safety: All current</span>
                        <Badge variant="default">Good</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="text-sm">🟢 ABC Licensing: All current</span>
                        <Badge variant="default">Good</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Recommended Actions:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                      <li>Complete Cal/OSHA ergonomic assessment immediately</li>
                      <li>Schedule health permit renewal appointment</li>
                      <li>Review break period compliance documentation</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Avoidance Dashboard */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  💰 Compliance Shield Value This Month
                </CardTitle>
                <CardDescription>
                  Penalties avoided and value delivered through proactive compliance management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">$47,248</div>
                    <div className="text-sm text-gray-600">Penalties Avoided</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Cal/OSHA: $15,873 • Health: $25,000 • Labor: $6,375
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">32 hrs</div>
                    <div className="text-sm text-gray-600">Time Saved ($1,280 value)</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Consultant fees avoided: $2,500
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">307,798%</div>
                    <div className="text-sm text-gray-600">ROI This Month</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Your investment: $16.58/month
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Menu Analysis Results */}
            {businessData.menuFile && (
              <Card>
                <CardHeader>
                  <CardTitle>Menu Compliance Analysis Results</CardTitle>
                  <CardDescription>
                    Based on your uploaded menu, we've identified the following California compliance requirements:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800">Meat Products Detected</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Cal/OSHA meat handling safety, HACCP plans, temperature logs, supplier verification
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Dairy Products Detected</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        FDA dairy standards, CA health dept storage requirements, allergen labeling (CA Prop 65)
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Alcohol Detected</h4>
                      <p className="text-sm text-purple-700 mt-1">
                        CA ABC licensing required, server training certification, responsible beverage service
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Seafood Items</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Mercury disclosure requirements, sustainable sourcing labels, shellfish tags retention
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800">Nuts/Allergens</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        CA allergen disclosure laws, cross-contamination prevention, staff training requirements
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800">Organic Claims</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        USDA organic certification, CA organic standards, truth-in-advertising compliance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Multi-Agency Inspection Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>📊 Multi-Agency Inspection Summary</CardTitle>
                <CardDescription>
                  Recent inspection activity and compliance rates across all agencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Inspection Results:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">County Health Inspections: 8</span>
                        <Badge variant="default">Pass Rate: 75%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">Cal/OSHA Site Visits: 2</span>
                        <Badge variant="destructive">Compliance Rate: 50%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Fire Department Inspections: 3</span>
                        <Badge variant="default">Pass Rate: 100%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                        <span className="text-sm">ABC Compliance Checks: 1</span>
                        <Badge variant="default">Pass Rate: 100%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                        <span className="text-sm">Building Code Inspections: 2</span>
                        <Badge variant="secondary">Pass Rate: 50%</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Risk Factors This Month:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">Critical Violations: 3</span>
                        <span className="text-xs text-red-600">Immediate correction required</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                        <span className="text-sm">Major Violations: 7</span>
                        <span className="text-xs text-orange-600">30-day correction period</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-sm">Minor Violations: 12</span>
                        <span className="text-xs text-yellow-600">Next inspection cycle</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Warnings Issued: 5</span>
                        <span className="text-xs text-blue-600">Educational, no penalty</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Multi-Agency Area Activity */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>📍 Multi-Agency Area Activity</CardTitle>
                <CardDescription>
                  Recent compliance activity and violations in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-gray-900">Sunset Bistro - 456 Sunset Blvd, West Hollywood (0.3mi away)</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>County Health: 2024-07-15</span>
                        <span className="text-red-600">Critical violations: 2 | Reinspection required</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cal/OSHA: 2024-07-20</span>
                        <span className="text-red-600">Ergonomic violations | $5,000 penalty issued</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-gray-900">Marina Grill - 789 Ocean Ave, Santa Monica (0.8mi away)</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Fire Dept: 2024-07-18</span>
                        <span className="text-orange-600">Suppression system failure | Closure order</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ABC: 2024-07-22</span>
                        <span className="text-orange-600">Underage service violation | License suspended 30 days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-gray-900">Downtown Deli - 321 Spring St, Downtown LA (1.2mi away)</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Building Dept: 2024-07-25</span>
                        <span className="text-yellow-600">ADA compliance issues | 60-day correction period</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Environmental: 2024-07-26</span>
                        <span className="text-yellow-600">Grease disposal violation | $2,500 fine</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calosha">
            <div className="space-y-6">
              {/* Temperature Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🌡️ Temperature Controls
                  </CardTitle>
                  <CardDescription>
                    Critical temperature monitoring and control systems - Legal Ref: FSANZ 3.2.2
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
                        <TableCell className="font-medium">Walk-in cooler temperatures (0-4°C)</TableCell>
                        <TableCell>3x daily</TableCell>
                        <TableCell><Badge variant="destructive">Overdue</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Temperature log screenshot</TableCell>
                        <TableCell><Button size="sm">Record Temp</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Freezer temperatures (-18°C or below)</TableCell>
                        <TableCell>Daily</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Digital sensor log</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Log</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hot holding temperatures (60°C or above)</TableCell>
                        <TableCell>Hourly</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Probe thermometer reading</TableCell>
                        <TableCell><Button size="sm">Check Now</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cold display temperatures (below 5°C)</TableCell>
                        <TableCell>Every 2 hours</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Display unit log</TableCell>
                        <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Dishwasher water temperature (82°C rinse)</TableCell>
                        <TableCell>Daily</TableCell>
                        <TableCell><Badge variant="destructive">Non-Compliant</Badge></TableCell>
                        <TableCell>FSANZ 3.2.3</TableCell>
                        <TableCell>Rinse temperature strip</TableCell>
                        <TableCell><Button size="sm">Test & Fix</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hand wash basin water temperature (38-43°C)</TableCell>
                        <TableCell>Shift start</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>FSANZ 3.2.3</TableCell>
                        <TableCell>Thermometer reading</TableCell>
                        <TableCell><Button size="sm" variant="outline">Verify</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Food Storage & Handling */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🥩 Food Storage & Handling
                  </CardTitle>
                  <CardDescription>
                    Safe food storage practices and contamination prevention - Legal Ref: FSANZ 3.2.2
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
                        <TableCell className="font-medium">Raw meat stored below cooked foods</TableCell>
                        <TableCell>Every delivery</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Storage arrangement photo</TableCell>
                        <TableCell><Button size="sm" variant="outline">Verify</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Food covered and labeled with dates</TableCell>
                        <TableCell>Daily audit</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Label compliance checklist</TableCell>
                        <TableCell><Button size="sm">Audit Labels</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">FIFO (First In, First Out) rotation</TableCell>
                        <TableCell>Each prep session</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Date rotation log</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Rotation</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">No cross-contamination between raw/cooked</TableCell>
                        <TableCell>Continuous</TableCell>
                        <TableCell><Badge variant="destructive">Alert</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Separation protocol checklist</TableCell>
                        <TableCell><Button size="sm">Review Protocol</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Proper thawing procedures</TableCell>
                        <TableCell>As needed</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Thawing method documentation</TableCell>
                        <TableCell><Button size="sm" variant="outline">Log Method</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Use-by date compliance</TableCell>
                        <TableCell>Daily</TableCell>
                        <TableCell><Badge variant="secondary">Due Today</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Expiry date audit report</TableCell>
                        <TableCell><Button size="sm">Check Dates</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Food allergen separation and labeling</TableCell>
                        <TableCell>Per menu item</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>FSANZ 1.2.3</TableCell>
                        <TableCell>Allergen declaration matrix</TableCell>
                        <TableCell><Button size="sm" variant="outline">Update Matrix</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Hygiene & Sanitation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🧼 Hygiene & Sanitation
                  </CardTitle>
                  <CardDescription>
                    Personal hygiene and facility sanitation protocols - Legal Ref: FSANZ 3.2.3
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
                        <TableCell className="font-medium">Handwash station compliance audit</TableCell>
                        <TableCell>Hourly</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>FSANZ 3.2.3</TableCell>
                        <TableCell>Station checklist photo</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Stations</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Staff personal hygiene monitoring</TableCell>
                        <TableCell>Shift start</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                        <TableCell>FSANZ 3.2.3</TableCell>
                        <TableCell>Hygiene compliance form</TableCell>
                        <TableCell><Button size="sm">Inspect Staff</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cleaning schedule verification</TableCell>
                        <TableCell>Daily</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>FSANZ 3.2.3</TableCell>
                        <TableCell>Cleaning log with signatures</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Schedule</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="p-4 bg-teal-50 rounded-lg">
                <p className="text-sm text-teal-800">
                  🔥 Critical Items: 12 | ✅ Completed: 18/28 | ⚠️ Non-Compliant: 2 | ⏳ Next: Hourly temp check (2:00 PM)
                </p>
              </div>
            </div>
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
            <div className="space-y-6">
              {/* Training & Certification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🎓 Training & Certification
                  </CardTitle>
                  <CardDescription>
                    Staff qualifications and mandatory training compliance - Legal Ref: Fair Work Act 2009
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
                        <TableCell className="font-medium">Food handler certificates current</TableCell>
                        <TableCell>Annual renewal</TableCell>
                        <TableCell><Badge variant="destructive">2 Expired</Badge></TableCell>
                        <TableCell>Food Act 2003</TableCell>
                        <TableCell>Certificate scan upload</TableCell>
                        <TableCell><Button size="sm">Renew Certs</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Responsible service of alcohol (RSA) certificates</TableCell>
                        <TableCell>3-year renewal</TableCell>
                        <TableCell><Badge variant="default">Current</Badge></TableCell>
                        <TableCell>Liquor Control Reform Act</TableCell>
                        <TableCell>RSA certificate database</TableCell>
                        <TableCell><Button size="sm" variant="outline">Verify</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">First aid officer certification</TableCell>
                        <TableCell>3-year renewal</TableCell>
                        <TableCell><Badge variant="secondary">Due in 30 days</Badge></TableCell>
                        <TableCell>WHS Act 2011</TableCell>
                        <TableCell>First aid training certificate</TableCell>
                        <TableCell><Button size="sm">Book Training</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Staff induction records</TableCell>
                        <TableCell>Per new hire</TableCell>
                        <TableCell><Badge variant="default">Up to date</Badge></TableCell>
                        <TableCell>Fair Work Act 2009</TableCell>
                        <TableCell>Signed induction checklist</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Records</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Ongoing training documentation</TableCell>
                        <TableCell>Quarterly</TableCell>
                        <TableCell><Badge variant="secondary">Due this month</Badge></TableCell>
                        <TableCell>Hospitality Award 2020</TableCell>
                        <TableCell>Training completion certificates</TableCell>
                        <TableCell><Button size="sm">Schedule Training</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Employment Standards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    ⚖️ Employment Standards
                  </CardTitle>
                  <CardDescription>
                    Fair Work compliance and employment law obligations
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
                        <TableCell className="font-medium">Break time compliance monitoring</TableCell>
                        <TableCell>Per shift</TableCell>
                        <TableCell><Badge variant="secondary">Monitoring</Badge></TableCell>
                        <TableCell>Hospitality Award 2020</TableCell>
                        <TableCell>Timeclock break records</TableCell>
                        <TableCell><Button size="sm" variant="outline">Review Breaks</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Penalty rate audit</TableCell>
                        <TableCell>Weekly</TableCell>
                        <TableCell><Badge variant="destructive">Non-compliant</Badge></TableCell>
                        <TableCell>Fair Work Act 2009</TableCell>
                        <TableCell>Payroll penalty rate report</TableCell>
                        <TableCell><Button size="sm">Fix Rates</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Superannuation guarantee compliance</TableCell>
                        <TableCell>Pay cycle</TableCell>
                        <TableCell><Badge variant="default">Current</Badge></TableCell>
                        <TableCell>Superannuation Guarantee Act</TableCell>
                        <TableCell>STP lodgment confirmation</TableCell>
                        <TableCell><Button size="sm" variant="outline">View STP</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Right-to-work documentation</TableCell>
                        <TableCell>On hire</TableCell>
                        <TableCell><Badge variant="default">Complete</Badge></TableCell>
                        <TableCell>Migration Act 1958</TableCell>
                        <TableCell>VEVO check results</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check VEVO</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Worker Safety */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🦺 Worker Safety
                  </CardTitle>
                  <CardDescription>
                    Workplace health and safety compliance for staff
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
                        <TableCell className="font-medium">Manual handling training</TableCell>
                        <TableCell>Annual</TableCell>
                        <TableCell><Badge variant="secondary">Due in 60 days</Badge></TableCell>
                        <TableCell>WHS Act 2011</TableCell>
                        <TableCell>Training completion certificate</TableCell>
                        <TableCell><Button size="sm">Book Training</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Personal protective equipment provision</TableCell>
                        <TableCell>As required</TableCell>
                        <TableCell><Badge variant="default">Adequate</Badge></TableCell>
                        <TableCell>WHS Regulation 2017</TableCell>
                        <TableCell>PPE issue register</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Stock</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Workplace injury register</TableCell>
                        <TableCell>Ongoing</TableCell>
                        <TableCell><Badge variant="default">Current</Badge></TableCell>
                        <TableCell>WHS Act 2011</TableCell>
                        <TableCell>Injury report forms</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Register</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safety">
            <div className="space-y-6">
              {/* Fire Safety */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🔥 Fire Safety
                  </CardTitle>
                  <CardDescription>
                    Fire prevention, detection, and emergency response systems - Legal Ref: Building Code of Australia
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
                        <TableCell className="font-medium">Fire extinguisher locations and inspections</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell><Badge variant="destructive">2 Overdue</Badge></TableCell>
                        <TableCell>AS 1851</TableCell>
                        <TableCell>Inspection tag photo</TableCell>
                        <TableCell><Button size="sm">Inspect All</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Exit signs illuminated and unobstructed</TableCell>
                        <TableCell>Weekly</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>AS 2293</TableCell>
                        <TableCell>Exit route checklist</TableCell>
                        <TableCell><Button size="sm" variant="outline">Verify Routes</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Emergency exit routes clear</TableCell>
                        <TableCell>Daily</TableCell>
                        <TableCell><Badge variant="default">Clear</Badge></TableCell>
                        <TableCell>BCA Section E</TableCell>
                        <TableCell>Exit walkthrough log</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Routes</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fire suppression system (ansul) serviced</TableCell>
                        <TableCell>6 months</TableCell>
                        <TableCell><Badge variant="secondary">Due in 45 days</Badge></TableCell>
                        <TableCell>AS 1851</TableCell>
                        <TableCell>Service technician report</TableCell>
                        <TableCell><Button size="sm">Book Service</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Smoke detector functionality</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell><Badge variant="default">Tested</Badge></TableCell>
                        <TableCell>AS 1670.1</TableCell>
                        <TableCell>Test button activation log</TableCell>
                        <TableCell><Button size="sm" variant="outline">Test Detectors</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Emergency lighting working</TableCell>
                        <TableCell>6 months</TableCell>
                        <TableCell><Badge variant="destructive">Failed Test</Badge></TableCell>
                        <TableCell>AS 2293</TableCell>
                        <TableCell>Battery backup test report</TableCell>
                        <TableCell><Button size="sm">Replace Batteries</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Maximum occupancy limits posted</TableCell>
                        <TableCell>Annual review</TableCell>
                        <TableCell><Badge variant="default">Current</Badge></TableCell>
                        <TableCell>BCA Section D</TableCell>
                        <TableCell>Occupancy calculation certificate</TableCell>
                        <TableCell><Button size="sm" variant="outline">Review Limits</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Electrical Safety */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    ⚡ Electrical Safety
                  </CardTitle>
                  <CardDescription>
                    Electrical equipment testing and safety compliance
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
                        <TableCell className="font-medium">Portable appliance testing (PAT)</TableCell>
                        <TableCell>12 months</TableCell>
                        <TableCell><Badge variant="secondary">Due next month</Badge></TableCell>
                        <TableCell>AS 3760</TableCell>
                        <TableCell>Test and tag certificate</TableCell>
                        <TableCell><Button size="sm">Book Testing</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">RCD (safety switch) testing</TableCell>
                        <TableCell>3 months</TableCell>
                        <TableCell><Badge variant="default">Tested</Badge></TableCell>
                        <TableCell>AS 3019</TableCell>
                        <TableCell>RCD test log</TableCell>
                        <TableCell><Button size="sm" variant="outline">Test RCDs</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Electrical installation compliance</TableCell>
                        <TableCell>5 years</TableCell>
                        <TableCell><Badge variant="default">Current</Badge></TableCell>
                        <TableCell>AS 3000</TableCell>
                        <TableCell>Electrical certificate</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Certificate</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Slip/Trip/Fall Prevention */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🚶 Slip/Trip/Fall Prevention
                  </CardTitle>
                  <CardDescription>
                    Floor safety and fall prevention measures
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
                        <TableCell className="font-medium">Non-slip surface maintenance</TableCell>
                        <TableCell>Weekly</TableCell>
                        <TableCell><Badge variant="default">Maintained</Badge></TableCell>
                        <TableCell>WHS Regulation 2017</TableCell>
                        <TableCell>Floor condition report</TableCell>
                        <TableCell><Button size="sm" variant="outline">Inspect Floors</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Wet floor signage availability</TableCell>
                        <TableCell>Daily</TableCell>
                        <TableCell><Badge variant="default">Available</Badge></TableCell>
                        <TableCell>WHS Act 2011</TableCell>
                        <TableCell>Signage inventory checklist</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Signs</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Step ladder safety inspection</TableCell>
                        <TableCell>3 months</TableCell>
                        <TableCell><Badge variant="destructive">Damaged</Badge></TableCell>
                        <TableCell>AS 1892.1</TableCell>
                        <TableCell>Ladder condition report</TableCell>
                        <TableCell><Button size="sm">Replace Ladder</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Chemical Safety */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🧪 Chemical Safety
                  </CardTitle>
                  <CardDescription>
                    Cleaning chemicals and hazardous substance management
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
                        <TableCell className="font-medium">Safety Data Sheets (SDS) current</TableCell>
                        <TableCell>Annual review</TableCell>
                        <TableCell><Badge variant="secondary">3 Missing</Badge></TableCell>
                        <TableCell>WHS Regulation 2017</TableCell>
                        <TableCell>SDS register</TableCell>
                        <TableCell><Button size="sm">Update SDS</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Chemical storage compliance</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>Dangerous Goods Code</TableCell>
                        <TableCell>Storage area inspection photo</TableCell>
                        <TableCell><Button size="sm" variant="outline">Inspect Storage</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Spill kit maintenance</TableCell>
                        <TableCell>3 months</TableCell>
                        <TableCell><Badge variant="default">Stocked</Badge></TableCell>
                        <TableCell>WHS Act 2011</TableCell>
                        <TableCell>Spill kit inventory checklist</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Kit</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* New Facility & Equipment Tab */}
          <TabsContent value="facility">
            <div className="space-y-6">
              {/* Kitchen Equipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🍳 Kitchen Equipment
                  </CardTitle>
                  <CardDescription>
                    Commercial kitchen equipment maintenance and safety checks
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
                        <TableCell className="font-medium">Commercial dishwasher functioning</TableCell>
                        <TableCell>Daily</TableCell>
                        <TableCell><Badge variant="default">Operating</Badge></TableCell>
                        <TableCell>FSANZ 3.2.3</TableCell>
                        <TableCell>Daily operation log</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Operation</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Refrigeration unit maintenance</TableCell>
                        <TableCell>6 months</TableCell>
                        <TableCell><Badge variant="secondary">Due in 30 days</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Service technician report</TableCell>
                        <TableCell><Button size="sm">Book Service</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cooking equipment safety checks</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell><Badge variant="destructive">Gas leak detected</Badge></TableCell>
                        <TableCell>AS 5601</TableCell>
                        <TableCell>Safety inspection certificate</TableCell>
                        <TableCell><Button size="sm">Emergency Check</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Exhaust hood cleaning</TableCell>
                        <TableCell>3 months</TableCell>
                        <TableCell><Badge variant="default">Clean</Badge></TableCell>
                        <TableCell>AS 1851.12</TableCell>
                        <TableCell>Cleaning service receipt</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Certificate</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Grease trap maintenance</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell><Badge variant="secondary">Due this week</Badge></TableCell>
                        <TableCell>Trade Waste Agreement</TableCell>
                        <TableCell>Pump-out receipt</TableCell>
                        <TableCell><Button size="sm">Schedule Pump-out</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Water filter changes</TableCell>
                        <TableCell>6 months</TableCell>
                        <TableCell><Badge variant="default">Changed</Badge></TableCell>
                        <TableCell>Water Quality Standards</TableCell>
                        <TableCell>Filter replacement log</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Filters</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Equipment calibration logs</TableCell>
                        <TableCell>Annual</TableCell>
                        <TableCell><Badge variant="secondary">Due in 60 days</Badge></TableCell>
                        <TableCell>Trade Measurement Act</TableCell>
                        <TableCell>Calibration certificates</TableCell>
                        <TableCell><Button size="sm">Book Calibration</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Pest Control */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🐭 Pest Control
                  </CardTitle>
                  <CardDescription>
                    Integrated pest management and monitoring systems
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
                        <TableCell className="font-medium">Professional pest inspection</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell><Badge variant="default">Inspected</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Pest control report</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Report</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bait station monitoring</TableCell>
                        <TableCell>Weekly</TableCell>
                        <TableCell><Badge variant="secondary">Check due</Badge></TableCell>
                        <TableCell>Food Act 2003</TableCell>
                        <TableCell>Bait station log</TableCell>
                        <TableCell><Button size="sm">Check Stations</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Entry point sealing</TableCell>
                        <TableCell>Quarterly</TableCell>
                        <TableCell><Badge variant="destructive">Gaps found</Badge></TableCell>
                        <TableCell>Building Code</TableCell>
                        <TableCell>Sealing inspection photo</TableCell>
                        <TableCell><Button size="sm">Seal Gaps</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Structural & Maintenance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🏗️ Structural & Maintenance
                  </CardTitle>
                  <CardDescription>
                    Building structure and general maintenance compliance
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
                        <TableCell className="font-medium">Building inspection certificate</TableCell>
                        <TableCell>Annual</TableCell>
                        <TableCell><Badge variant="default">Current</Badge></TableCell>
                        <TableCell>Building Code of Australia</TableCell>
                        <TableCell>Building certificate</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Certificate</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Ventilation system maintenance</TableCell>
                        <TableCell>6 months</TableCell>
                        <TableCell><Badge variant="secondary">Due next month</Badge></TableCell>
                        <TableCell>AS 1668.2</TableCell>
                        <TableCell>HVAC service report</TableCell>
                        <TableCell><Button size="sm">Book Service</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Plumbing compliance check</TableCell>
                        <TableCell>2 years</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>Plumbing Code of Australia</TableCell>
                        <TableCell>Plumber compliance certificate</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Plumbing</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* New Licensing & Documentation Tab */}
          <TabsContent value="licensing">
            <div className="space-y-6">
              {/* Required Permits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    📄 Required Permits
                  </CardTitle>
                  <CardDescription>
                    Business licenses and regulatory permits
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
                        <TableCell className="font-medium">Food business license current</TableCell>
                        <TableCell>Annual renewal</TableCell>
                        <TableCell><Badge variant="default">Current</Badge></TableCell>
                        <TableCell>Food Act 2003</TableCell>
                        <TableCell>License certificate</TableCell>
                        <TableCell><Button size="sm" variant="outline">View License</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Liquor license (if applicable)</TableCell>
                        <TableCell>Annual renewal</TableCell>
                        <TableCell><Badge variant="destructive">Expired</Badge></TableCell>
                        <TableCell>Liquor Control Act</TableCell>
                        <TableCell>Liquor license certificate</TableCell>
                        <TableCell><Button size="sm">Renew License</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Music license (APRA/PPCA)</TableCell>
                        <TableCell>Annual</TableCell>
                        <TableCell><Badge variant="secondary">Due in 90 days</Badge></TableCell>
                        <TableCell>Copyright Act 1968</TableCell>
                        <TableCell>APRA/PPCA certificates</TableCell>
                        <TableCell><Button size="sm">Renew Music License</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Development approval compliance</TableCell>
                        <TableCell>Ongoing</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>Planning and Environment Act</TableCell>
                        <TableCell>Development approval letter</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Compliance</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Council permits up to date</TableCell>
                        <TableCell>As required</TableCell>
                        <TableCell><Badge variant="default">Current</Badge></TableCell>
                        <TableCell>Local Government Act</TableCell>
                        <TableCell>Council permit register</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Permits</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Outdoor dining permits</TableCell>
                        <TableCell>Annual</TableCell>
                        <TableCell><Badge variant="secondary">Pending approval</Badge></TableCell>
                        <TableCell>Local Council Regulations</TableCell>
                        <TableCell>Outdoor dining permit</TableCell>
                        <TableCell><Button size="sm">Follow Up Application</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Insurance & Legal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🛡️ Insurance & Legal
                  </CardTitle>
                  <CardDescription>
                    Insurance coverage and legal documentation
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
                        <TableCell className="font-medium">Public liability insurance</TableCell>
                        <TableCell>Annual renewal</TableCell>
                        <TableCell><Badge variant="default">$20M coverage</Badge></TableCell>
                        <TableCell>Trade Practices Act</TableCell>
                        <TableCell>Insurance certificate</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Policy</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Workers compensation insurance</TableCell>
                        <TableCell>Annual</TableCell>
                        <TableCell><Badge variant="default">Current</Badge></TableCell>
                        <TableCell>Workers Compensation Act</TableCell>
                        <TableCell>WorkCover certificate</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Coverage</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Professional indemnity insurance</TableCell>
                        <TableCell>Annual</TableCell>
                        <TableCell><Badge variant="secondary">Renewal due</Badge></TableCell>
                        <TableCell>Professional Standards Act</TableCell>
                        <TableCell>PI insurance certificate</TableCell>
                        <TableCell><Button size="sm">Renew Policy</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Customer-Facing Compliance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    👥 Customer-Facing Compliance
                  </CardTitle>
                  <CardDescription>
                    Customer rights and disclosure requirements
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
                        <TableCell className="font-medium">Menu allergen declarations</TableCell>
                        <TableCell>Menu updates</TableCell>
                        <TableCell><Badge variant="default">Updated</Badge></TableCell>
                        <TableCell>FSANZ 1.2.3</TableCell>
                        <TableCell>Updated menu with allergen info</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Menu</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Price display compliance</TableCell>
                        <TableCell>Daily</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>Competition and Consumer Act</TableCell>
                        <TableCell>Pricing audit checklist</TableCell>
                        <TableCell><Button size="sm" variant="outline">Verify Pricing</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Privacy policy display</TableCell>
                        <TableCell>As required</TableCell>
                        <TableCell><Badge variant="default">Posted</Badge></TableCell>
                        <TableCell>Privacy Act 1988</TableCell>
                        <TableCell>Privacy policy document</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Policy</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* New Daily Operational Checks Tab */}
          <TabsContent value="operations">
            <div className="space-y-6">
              {/* Opening Procedures */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🌅 Opening Procedures
                  </CardTitle>
                  <CardDescription>
                    Daily opening checklist and startup procedures
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
                        <TableCell className="font-medium">Equipment startup checks</TableCell>
                        <TableCell>Daily opening</TableCell>
                        <TableCell><Badge variant="default">Complete</Badge></TableCell>
                        <TableCell>WHS Act 2011</TableCell>
                        <TableCell>Equipment startup checklist</TableCell>
                        <TableCell><Button size="sm" variant="outline">View Checklist</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Temperature readings recorded</TableCell>
                        <TableCell>Daily opening</TableCell>
                        <TableCell><Badge variant="default">Recorded</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>Temperature log book</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Logs</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cleaning verification</TableCell>
                        <TableCell>Daily opening</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                        <TableCell>FSANZ 3.2.3</TableCell>
                        <TableCell>Cleaning verification form</TableCell>
                        <TableCell><Button size="sm">Complete Check</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Staff uniform check</TableCell>
                        <TableCell>Daily opening</TableCell>
                        <TableCell><Badge variant="default">Compliant</Badge></TableCell>
                        <TableCell>Food Act 2003</TableCell>
                        <TableCell>Uniform compliance checklist</TableCell>
                        <TableCell><Button size="sm" variant="outline">Check Staff</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cash register setup</TableCell>
                        <TableCell>Daily opening</TableCell>
                        <TableCell><Badge variant="default">Setup</Badge></TableCell>
                        <TableCell>Fair Trading Act</TableCell>
                        <TableCell>Till reconciliation form</TableCell>
                        <TableCell><Button size="sm" variant="outline">Verify Setup</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Emergency contact numbers posted</TableCell>
                        <TableCell>Daily verification</TableCell>
                        <TableCell><Badge variant="default">Posted</Badge></TableCell>
                        <TableCell>WHS Act 2011</TableCell>
                        <TableCell>Emergency contact list photo</TableCell>
                        <TableCell><Button size="sm" variant="outline">Verify Contacts</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Closing Procedures */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🌙 Closing Procedures
                  </CardTitle>
                  <CardDescription>
                    Daily closing checklist and shutdown procedures
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
                        <TableCell className="font-medium">Equipment shutdown verification</TableCell>
                        <TableCell>Daily closing</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                        <TableCell>WHS Act 2011</TableCell>
                        <TableCell>Shutdown checklist</TableCell>
                        <TableCell><Button size="sm">Complete Shutdown</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Final temperature readings</TableCell>
                        <TableCell>Daily closing</TableCell>
                        <TableCell><Badge variant="secondary">Due</Badge></TableCell>
                        <TableCell>FSANZ 3.2.2</TableCell>
                        <TableCell>End-of-day temp log</TableCell>
                        <TableCell><Button size="sm">Record Temps</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cleaning and sanitizing complete</TableCell>
                        <TableCell>Daily closing</TableCell>
                        <TableCell><Badge variant="secondary">In progress</Badge></TableCell>
                        <TableCell>FSANZ 3.2.3</TableCell>
                        <TableCell>Cleaning completion checklist</TableCell>
                        <TableCell><Button size="sm">Complete Cleaning</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Security system activation</TableCell>
                        <TableCell>Daily closing</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                        <TableCell>Security policy</TableCell>
                        <TableCell>Security activation log</TableCell>
                        <TableCell><Button size="sm">Activate Security</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cash reconciliation</TableCell>
                        <TableCell>Daily closing</TableCell>
                        <TableCell><Badge variant="secondary">Due</Badge></TableCell>
                        <TableCell>Fair Trading Act</TableCell>
                        <TableCell>Daily sales reconciliation</TableCell>
                        <TableCell><Button size="sm">Reconcile Cash</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
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
