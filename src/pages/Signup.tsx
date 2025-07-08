
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { Shield, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    location: "",
    menuFile: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.businessType || !formData.location) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Store the business data in localStorage for the MVP
    localStorage.setItem('complianceShieldBusiness', JSON.stringify(formData));
    
    toast({
      title: "Welcome to Compliance Shield!",
      description: "Your business has been registered successfully."
    });
    
    navigate('/dashboard');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, menuFile: file }));
      toast({
        title: "Menu uploaded successfully",
        description: "We'll analyze your menu items for compliance requirements."
      });
    } else {
      toast({
        title: "Please upload a PDF file",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Compliance Shield</h1>
          </div>
          <CardTitle className="text-3xl">Register Your Business</CardTitle>
          <CardDescription>
            Tell us about your business so we can customize your compliance requirements
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                required
              />
            </div>

            {/* Business Type */}
            <div className="space-y-3">
              <Label>Business Type *</Label>
              <RadioGroup 
                value={formData.businessType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="restaurant" id="restaurant" />
                  <Label htmlFor="restaurant">Restaurant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cafe" id="cafe" />
                  <Label htmlFor="cafe">Cafe</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bakery" id="bakery" />
                  <Label htmlFor="bakery">Bakery</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Physical Shop Location *</Label>
              <Input
                id="location"
                placeholder="Enter your shop address (e.g., 123 Main St, Melbourne VIC)"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>

            {/* Menu Upload */}
            <div className="space-y-2">
              <Label htmlFor="menu">Upload Menu (PDF)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <Label htmlFor="menu" className="cursor-pointer">
                  <span className="text-sm text-gray-600">
                    {formData.menuFile ? formData.menuFile.name : "Click to upload your menu PDF"}
                  </span>
                  <Input
                    id="menu"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </Label>
                <p className="text-xs text-gray-500 mt-2">
                  We'll analyze your menu to determine specific compliance requirements
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              Create Account & Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
