import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Calendar, Clock, AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Tasks = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const allTasks = [
    // Food Safety & Hygiene
    {
      id: 1,
      title: "Pest Control Records",
      description: "Maintain recent pest treatment documentation (usually quarterly)",
      status: "overdue",
      dueDate: "2024-01-15",
      estimatedHours: 1,
      category: "Food Safety & Hygiene",
      lastCompleted: "2023-10-15",
      penalty: "$2,000 fine + potential closure",
      overdueDays: 525
    },
    {
      id: 2,
      title: "Food Handler Training Logs",
      description: "Evidence of completed food safety training for all kitchen staff",
      status: "overdue",
      dueDate: "2024-01-20",
      estimatedHours: 4,
      category: "Food Safety & Hygiene",
      lastCompleted: "2023-01-20",
      penalty: "$5,000 fine + staff restrictions",
      overdueDays: 520
    },
    {
      id: 3,
      title: "Chemical Storage Compliance",
      description: "Segregated storage of cleaning chemicals, correct labeling, MSDS sheets",
      status: "pending",
      dueDate: "2024-02-05",
      estimatedHours: 2,
      category: "Food Safety & Hygiene",
      lastCompleted: "2023-02-03",
      penalty: "$3,000 fine + safety violation",
      overdueDays: 504
    },
    {
      id: 4,
      title: "Temperature Monitoring Devices",
      description: "Evidence of calibrated digital devices for fridge/freezer logs",
      status: "pending",
      dueDate: "2024-02-10",
      estimatedHours: 1,
      category: "Food Safety & Hygiene",
      lastCompleted: "2023-02-08",
      penalty: "$1,500 fine + food safety breach",
      overdueDays: 499
    },
    {
      id: 5,
      title: "Grease Trap Maintenance Records",
      description: "Maintenance log and council-compliant frequency (especially in urban areas)",
      status: "upcoming",
      dueDate: "2024-03-15",
      estimatedHours: 2,
      category: "Food Safety & Hygiene",
      lastCompleted: "2023-03-12",
      penalty: "$4,000 fine + environmental violation",
      overdueDays: 465
    },
    // ACCC / Consumer & Business Practices
    {
      id: 6,
      title: "Surcharge Disclosure Compliance",
      description: "Surcharging for card payments must be disclosed and not exceed cost",
      status: "pending",
      dueDate: "2024-01-25",
      estimatedHours: 1,
      category: "ACCC / Consumer & Business",
      lastCompleted: "2023-01-25",
      penalty: "$10,000+ ACCC penalty",
      overdueDays: 515
    },
    {
      id: 7,
      title: "Misleading Menu Items",
      description: "'Freshly squeezed' or 'gluten-free' must meet legal definitions",
      status: "upcoming",
      dueDate: "2024-04-01",
      estimatedHours: 2,
      category: "ACCC / Consumer & Business",
      lastCompleted: "2023-04-01",
      penalty: "$25,000+ consumer law breach",
      overdueDays: 448
    },
    // Fire Safety & Council Regulations
    {
      id: 8,
      title: "Fire Exit Clearance Checks",
      description: "Ensure no blockage of fire exits, and signage is illuminated",
      status: "overdue",
      dueDate: "2024-01-30",
      estimatedHours: 1,
      category: "Fire Safety & Council",
      lastCompleted: "2023-01-30",
      penalty: "$5,000 fine + immediate closure risk",
      overdueDays: 510
    },
    {
      id: 9,
      title: "Hood/Canopy Cleaning",
      description: "Must be cleaned every 6 months with contractor invoice proof",
      status: "pending",
      dueDate: "2024-02-15",
      estimatedHours: 4,
      category: "Fire Safety & Council",
      lastCompleted: "2023-08-15",
      penalty: "$3,000 fine + fire hazard citation",
      overdueDays: 494
    },
    {
      id: 10,
      title: "Council Outdoor Seating Permit",
      description: "Valid license for footpath/outdoor seating (many get fined for expired permits)",
      status: "overdue",
      dueDate: "2024-01-01",
      estimatedHays: 2,
      category: "Fire Safety & Council",
      lastCompleted: "2023-01-01",
      penalty: "$500 per day + permit revocation",
      overdueDays: 540
    },
    {
      id: 11,
      title: "Bin Storage & Waste Removal Contracts",
      description: "Confirm secure, council-approved garbage removal processes",
      status: "upcoming",
      dueDate: "2024-03-01",
      estimatedHours: 1,
      category: "Fire Safety & Council",
      lastCompleted: "2023-03-01",
      penalty: "$2,000 fine + health violation",
      overdueDays: 479
    },
    // Insurance & Legal Exposure
    {
      id: 12,
      title: "Lease Compliance with Zoning Laws",
      description: "Confirm premises is legally zoned for food service, with approved kitchen",
      status: "pending",
      dueDate: "2024-02-20",
      estimatedHours: 3,
      category: "Insurance & Legal",
      lastCompleted: "2023-02-20",
      penalty: "$10,000+ fine + operating license revocation",
      overdueDays: 489
    },
    {
      id: 13,
      title: "Cybersecurity for POS Systems",
      description: "Check if payment terminals and databases are PCI-DSS compliant",
      status: "upcoming",
      dueDate: "2024-03-10",
      estimatedHours: 4,
      category: "Insurance & Legal",
      lastCompleted: "2023-03-10",
      penalty: "$50,000+ data breach penalties",
      overdueDays: 470
    }
  ];

  const quickAddTasks = [
    "Schedule Pest Control Inspection",
    "Update Food Handler Certificates",
    "Check Chemical Storage Labels",
    "Calibrate Temperature Monitors",
    "Review Card Surcharge Policies",
    "Verify Fire Exit Signage"
  ];

  const filteredTasks = allTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const markComplete = (taskId: number) => {
    toast({
      title: "Task marked as complete!",
      description: "Great job staying compliant!"
    });
  };

  const addQuickTask = (taskName: string) => {
    toast({
      title: "Task added successfully!",
      description: `"${taskName}" has been added to your task list.`
    });
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
            <Badge className={`${getStatusColor(task.status)} mt-2`}>
              {task.status}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">View Details</Button>
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => markComplete(task.id)}
            >
              Mark Complete
            </Button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{task.description}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Due:</span>
            <p className="font-medium">{task.dueDate}</p>
          </div>
          <div>
            <span className="text-gray-500">Est:</span>
            <p className="font-medium">{task.estimatedHours} hours</p>
          </div>
          <div>
            <span className="text-gray-500">Category:</span>
            <p className="font-medium">{task.category}</p>
          </div>
          <div>
            <span className="text-gray-500">Last:</span>
            <p className="font-medium">{task.lastCompleted}</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <p className="text-sm">
            <strong>Penalty:</strong> {task.penalty}
          </p>
          {task.status === 'overdue' && (
            <p className="text-sm text-red-600 font-medium mt-1">
              🚨 Overdue by {task.overdueDays} days
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Tasks */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="overdue">Overdue ({getTasksByStatus('overdue').length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({getTasksByStatus('pending').length})</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming ({getTasksByStatus('upcoming').length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Tasks ({filteredTasks.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {filteredTasks.map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="overdue" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Overdue Tasks ({getTasksByStatus('overdue').length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getTasksByStatus('overdue').map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pending" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-yellow-600">Pending Tasks ({getTasksByStatus('pending').length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getTasksByStatus('pending').map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="upcoming" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">Upcoming Tasks ({getTasksByStatus('upcoming').length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getTasksByStatus('upcoming').map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm p-2 bg-red-50 rounded">
                    Food Safety & Hygiene (5)
                  </div>
                  <div className="text-sm p-2 bg-yellow-50 rounded">
                    ACCC / Consumer & Business (2)
                  </div>
                  <div className="text-sm p-2 bg-blue-50 rounded">
                    Fire Safety & Council (4)
                  </div>
                  <div className="text-sm p-2 bg-green-50 rounded">
                    Insurance & Legal (2)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Add */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Add Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickAddTasks.map((taskName, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left"
                      onClick={() => addQuickTask(taskName)}
                    >
                      <Plus className="h-3 w-3 mr-2" />
                      {taskName}
                    </Button>
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

export default Tasks;
