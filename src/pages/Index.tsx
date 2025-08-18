
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Shield, Check, AlertTriangle, Building2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleSkipSignIn = () => {
    // Set demo business data for MVP viewing
    const demoData = {
      businessName: "Demo Cafe Melbourne",
      businessType: "cafe",
      location: "123 Collins Street, Melbourne VIC 3000",
      menuFile: { name: "demo-menu.pdf" }
    };
    localStorage.setItem('complianceShieldBusiness', JSON.stringify(demoData));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Compliance Shield</h1>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={handleSkipSignIn} 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Skip Sign In to View MVP
              </Button>
              <Button onClick={() => navigate('/signup')} className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Never Miss a Compliance Deadline Again
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Automated compliance tracking for restaurants, cafes, and bakeries. Stay ahead of inspections, 
            regulations, and penalties with our intelligent monitoring system.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => navigate('/signup')} 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              Start Free Trial
            </Button>
            <Button 
              onClick={handleSkipSignIn} 
              size="lg" 
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Stay Compliant</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-yellow-600 mb-2" />
                <CardTitle>Smart Task Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">AI-powered task scheduling based on your menu and business type. Never miss critical deadlines.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Building2 className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Local Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Real-time alerts about inspections and compliance issues in your area.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Check className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Menu Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Upload your menu and get customized compliance requirements based on your ingredients.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free Trial</CardTitle>
                <CardDescription>Try all features risk-free</CardDescription>
                <div className="text-4xl font-bold text-green-600 mt-4">Free<span className="text-lg text-gray-600"> for 30 days</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Full feature access</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Compliance tracking</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Menu analysis</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Local alerts</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Email support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardHeader className="text-center">
                <Badge className="mb-2 bg-blue-100 text-blue-800">Most Popular</Badge>
                <CardTitle className="text-2xl">Monthly Plan</CardTitle>
                <CardDescription>Perfect for ongoing compliance</CardDescription>
                <div className="text-4xl font-bold text-blue-600 mt-4">$19<span className="text-lg text-gray-600">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Single location</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Compliance tracking</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Menu analysis</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Local alerts</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Priority support</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-200">
              <CardHeader className="text-center">
                <Badge className="mb-2 bg-purple-100 text-purple-800">Best Value</Badge>
                <CardTitle className="text-2xl">Annual Plan</CardTitle>
                <CardDescription>Save with yearly billing</CardDescription>
                <div className="text-4xl font-bold text-purple-600 mt-4">$199<span className="text-lg text-gray-600">/year</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Save up to 30%</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Advanced analytics</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Priority support</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Custom integrations</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Account manager</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
