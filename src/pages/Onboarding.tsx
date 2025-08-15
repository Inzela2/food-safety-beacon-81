import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Business Basics
    businessName: "",
    abn: "",
    businessStructure: "",
    yearsInOperation: "",
    businessType: "",
    
    // Location & Size
    state: "",
    council: "",
    address: "",
    floorSpace: "",
    diningSeats: "",
    kitchenSize: "",
    outdoorSeats: "",
    driveThrough: false,
    storageAreas: [] as string[],
    
    // Staff & Operations
    totalEmployees: "",
    fullTimeEmployees: "",
    partTimeEmployees: "",
    casualEmployees: "",
    kitchenStaff: "",
    frontHouseStaff: "",
    juniorsApprenticees: false,
    operatingHours: "",
    operatingDays: "",
    peakPeriods: "",
    seasonalVariations: false,
    
    // Menu & Food Service
    serviceTypes: [] as string[],
    cuisineType: "",
    allergens: [] as string[],
    alcoholLicense: "",
    preparationMethods: [] as string[],
    servesSeafood: false,
    specialDietary: false,
    kidsMenu: false,
    
    // Equipment & Infrastructure
    kitchenEquipment: [] as string[],
    refrigerationEquipment: [] as string[],
    fireSafetyEquipment: [] as string[],
    securitySystem: [] as string[],
    posSystem: "",
    ventilationSystems: false,
    wasteManagement: "",
    
    // Financial & Systems
    annualRevenue: "",
    accountingSoftware: "",
    payrollHandling: "",
    paymentMethods: [] as string[],
    deliveryPlatforms: [] as string[],
    
    // Current Compliance Status
    currentLicenses: [] as string[],
    insuranceCoverage: [] as string[],
    lastInspection: "",
    finesPenalties: "",
    complianceTools: "",
    complianceHandler: "",
    
    // Risk Assessment
    highRiskFoods: false,
    lateNightOperation: false,
    cashHeavy: false,
    multipleLocations: false,
    franchised: false,
    offSiteCatering: false,
    specialEvents: false,
    
    // Business Goals & Concerns
    growthPlans: "",
    complianceWorries: "",
    complianceHours: "",
    complianceBudget: "",
    techComfort: "",
    
    // Technical Integration
    internetReliability: "",
    staffDeviceAccess: false,
    wifiAvailable: false,
    notificationPreference: "",
    
    // Tax Compliance
    gstRegistered: false,
    basFrequency: "",
    paygWithholding: false,
    staffBenefits: false,
    largeCashTransactions: false,
    tipsHandling: "",
    giftCards: false,
    staffMeals: "",
    
    // Food Safety
    foodHandlerCerts: false,
    temperatureMonitoring: "",
    allergenProcedures: "",
    supplierVerification: "",
    cleaningSchedule: false,
    pestControlFrequency: "",
    boreWater: false,
    recallProcedures: false,
    
    // Workplace Laws
    awardClassifications: "",
    penaltyRates: "",
    breakEntitlements: "",
    uniformsEquipment: "",
    rosterNotice: "",
    hoursRecording: "",
    enterpriseAgreements: false,
    bullyingPolicies: false,
    
    // Consumer Protection
    accuratePricing: false,
    surchargeDisclosure: false,
    clearPromotions: false,
    onlineFeeDisclosure: false,
    complaintHandling: "",
    voucherPolicy: "",
    refundPolicy: "",
    
    // Fire & Safety
    evacuationTraining: "",
    fireEquipmentInspection: "",
    firstAidStaff: "",
    incidentReporting: false,
    manualHandlingTraining: false,
    hazardManagement: "",
    chemicalStorage: "",
    equipmentServicing: "",
    
    // Privacy & Data
    customerDataCollection: false,
    cctvSystems: "",
    guestWifi: false,
    staffPersonalInfo: "",
    pciCompliance: false,
    marketingConsent: false,
    dataBreachProcedures: false,
    dataSharing: false,
    
    // High-Risk Flags
    cashPayments: false,
    familyEmployees: false,
    seasonalStaff: false,
    alcoholAfterMidnight: false,
    liveEntertainment: false,
    deliveryDrivers: ""
  });

  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    { title: "Business Basics", icon: "🏢" },
    { title: "Location & Size", icon: "📍" },
    { title: "Staff & Operations", icon: "👥" },
    { title: "Menu & Food Service", icon: "🍽️" },
    { title: "Equipment & Infrastructure", icon: "⚙️" },
    { title: "Financial & Systems", icon: "💰" },
    { title: "Current Compliance", icon: "📋" },
    { title: "Risk Assessment", icon: "⚠️" },
    { title: "Business Goals", icon: "🎯" },
    { title: "Technical Integration", icon: "🔧" },
    { title: "Tax Compliance", icon: "🏛️" },
    { title: "Food Safety", icon: "🍽️" },
    { title: "Workplace Laws", icon: "💼" },
    { title: "Consumer Protection", icon: "🛡️" },
    { title: "Fire & Safety", icon: "🔥" },
    { title: "Privacy & Data", icon: "🔒" },
    { title: "High-Risk Flags", icon: "🚨" }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('onboarding_data', JSON.stringify(formData));
    completeOnboarding();
    toast({
      title: "Onboarding Complete!",
      description: "Welcome to Compliance Shield. Let's keep your business compliant.",
    });
    navigate("/dashboard");
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, item: string) => {
    setFormData(prev => {
      const currentValue = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: currentValue.includes(item)
          ? currentValue.filter(i => i !== item)
          : [...currentValue, item]
      };
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Business Basics
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">What is your business name? *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => updateFormData("businessName", e.target.value)}
                placeholder="Your Business Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="abn">What is your ABN/ACN?</Label>
              <Input
                id="abn"
                value={formData.abn}
                onChange={(e) => updateFormData("abn", e.target.value)}
                placeholder="12 345 678 901"
              />
            </div>

            <div className="space-y-2">
              <Label>What is your business structure?</Label>
              <RadioGroup value={formData.businessStructure} onValueChange={(value) => updateFormData("businessStructure", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pty-ltd" id="pty-ltd" />
                  <Label htmlFor="pty-ltd">Pty Ltd</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partnership" id="partnership" />
                  <Label htmlFor="partnership">Partnership</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sole-trader" id="sole-trader" />
                  <Label htmlFor="sole-trader">Sole Trader</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsInOperation">How many years have you been in operation?</Label>
              <Select value={formData.yearsInOperation} onValueChange={(value) => updateFormData("yearsInOperation", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="more-than-10">More than 10 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>What type of food business are you?</Label>
              <RadioGroup value={formData.businessType} onValueChange={(value) => updateFormData("businessType", value)}>
                {["Restaurant", "Café", "Bakery", "Fast Food", "Food Truck", "Catering", "Bar/Pub", "Takeaway"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.toLowerCase()} id={type.toLowerCase()} />
                    <Label htmlFor={type.toLowerCase()}>{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 1: // Location & Size
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Which state/territory are you located in?</Label>
              <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nsw">NSW</SelectItem>
                  <SelectItem value="vic">VIC</SelectItem>
                  <SelectItem value="qld">QLD</SelectItem>
                  <SelectItem value="wa">WA</SelectItem>
                  <SelectItem value="sa">SA</SelectItem>
                  <SelectItem value="tas">TAS</SelectItem>
                  <SelectItem value="act">ACT</SelectItem>
                  <SelectItem value="nt">NT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="council">Which local council area is your business in?</Label>
              <Input
                id="council"
                value={formData.council}
                onChange={(e) => updateFormData("council", e.target.value)}
                placeholder="Council name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">What is your business address?</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="Full address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="floorSpace">Total floor space (m²)</Label>
                <Input
                  id="floorSpace"
                  type="number"
                  value={formData.floorSpace}
                  onChange={(e) => updateFormData("floorSpace", e.target.value)}
                  placeholder="150"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diningSeats">Dining area seats</Label>
                <Input
                  id="diningSeats"
                  type="number"
                  value={formData.diningSeats}
                  onChange={(e) => updateFormData("diningSeats", e.target.value)}
                  placeholder="40"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kitchenSize">Kitchen size (m²)</Label>
                <Input
                  id="kitchenSize"
                  type="number"
                  value={formData.kitchenSize}
                  onChange={(e) => updateFormData("kitchenSize", e.target.value)}
                  placeholder="30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outdoorSeats">Outdoor dining seats</Label>
                <Input
                  id="outdoorSeats"
                  type="number"
                  value={formData.outdoorSeats}
                  onChange={(e) => updateFormData("outdoorSeats", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="driveThrough"
                checked={formData.driveThrough}
                onCheckedChange={(checked) => updateFormData("driveThrough", checked)}
              />
              <Label htmlFor="driveThrough">Do you have a drive-through facility?</Label>
            </div>

            <div className="space-y-2">
              <Label>What storage areas do you have?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Dry storage", "Cold storage", "Freezer space", "Wine cellar", "Chemical storage"].map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={formData.storageAreas.includes(area)}
                      onCheckedChange={() => toggleArrayItem("storageAreas", area)}
                    />
                    <Label htmlFor={area}>{area}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // Staff & Operations
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalEmployees">How many total employees do you have?</Label>
                <Input
                  id="totalEmployees"
                  type="number"
                  value={formData.totalEmployees}
                  onChange={(e) => updateFormData("totalEmployees", e.target.value)}
                  placeholder="50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullTimeEmployees">How many full-time employees?</Label>
                <Input
                  id="fullTimeEmployees"
                  type="number"
                  value={formData.fullTimeEmployees}
                  onChange={(e) => updateFormData("fullTimeEmployees", e.target.value)}
                  placeholder="30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partTimeEmployees">How many part-time employees?</Label>
                <Input
                  id="partTimeEmployees"
                  type="number"
                  value={formData.partTimeEmployees}
                  onChange={(e) => updateFormData("partTimeEmployees", e.target.value)}
                  placeholder="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="casualEmployees">How many casual employees?</Label>
                <Input
                  id="casualEmployees"
                  type="number"
                  value={formData.casualEmployees}
                  onChange={(e) => updateFormData("casualEmployees", e.target.value)}
                  placeholder="10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kitchenStaff">How many kitchen staff?</Label>
                <Input
                  id="kitchenStaff"
                  type="number"
                  value={formData.kitchenStaff}
                  onChange={(e) => updateFormData("kitchenStaff", e.target.value)}
                  placeholder="15"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frontHouseStaff">How many front-of-house staff?</Label>
                <Input
                  id="frontHouseStaff"
                  type="number"
                  value={formData.frontHouseStaff}
                  onChange={(e) => updateFormData("frontHouseStaff", e.target.value)}
                  placeholder="15"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="juniorsApprenticees"
                checked={formData.juniorsApprenticees}
                onCheckedChange={(checked) => updateFormData("juniorsApprenticees", checked)}
              />
              <Label htmlFor="juniorsApprenticees">Do you employ juniors or apprentices?</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="operatingHours">What are your operating hours?</Label>
              <Input
                id="operatingHours"
                value={formData.operatingHours}
                onChange={(e) => updateFormData("operatingHours", e.target.value)}
                placeholder="e.g. 9am - 9pm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="operatingDays">How many days per week do you operate?</Label>
              <Input
                id="operatingDays"
                type="number"
                value={formData.operatingDays}
                onChange={(e) => updateFormData("operatingDays", e.target.value)}
                placeholder="7"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="peakPeriods">What are your peak trading periods?</Label>
              <Input
                id="peakPeriods"
                value={formData.peakPeriods}
                onChange={(e) => updateFormData("peakPeriods", e.target.value)}
                placeholder="e.g. Lunch, Dinner"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="seasonalVariations"
                checked={formData.seasonalVariations}
                onCheckedChange={(checked) => updateFormData("seasonalVariations", checked)}
              />
              <Label htmlFor="seasonalVariations">Do you have seasonal variations in staffing?</Label>
            </div>
          </div>
        );

      case 3: // Menu & Food Service
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What service types do you offer?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Dine-in", "Takeaway", "Delivery", "Catering"].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.serviceTypes.includes(service)}
                      onCheckedChange={() => toggleArrayItem("serviceTypes", service)}
                    />
                    <Label htmlFor={service}>{service}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cuisineType">What type of cuisine do you serve?</Label>
              <Input
                id="cuisineType"
                value={formData.cuisineType}
                onChange={(e) => updateFormData("cuisineType", e.target.value)}
                placeholder="e.g. Italian, Asian"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="menuUpload">Can you upload your current menu for analysis?</Label>
              <Input
                id="menuUpload"
                type="file"
                onChange={(e) => {
                  // For demo, just store file name
                  if (e.target.files && e.target.files[0]) {
                    updateFormData("menuUpload", e.target.files[0].name);
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Which allergens are present in your food?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Gluten", "Nuts", "Dairy", "Eggs", "Seafood", "Soy"].map((allergen) => (
                  <div key={allergen} className="flex items-center space-x-2">
                    <Checkbox
                      id={allergen}
                      checked={formData.allergens.includes(allergen)}
                      onCheckedChange={() => toggleArrayItem("allergens", allergen)}
                    />
                    <Label htmlFor={allergen}>{allergen}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Do you have an alcohol license?</Label>
              <RadioGroup value={formData.alcoholLicense} onValueChange={(value) => updateFormData("alcoholLicense", value)}>
                {["Full liquor", "Beer & wine", "BYO", "None"].map((license) => (
                  <div key={license} className="flex items-center space-x-2">
                    <RadioGroupItem value={license.toLowerCase().replace(/ /g, "-")} id={license.toLowerCase().replace(/ /g, "-")} />
                    <Label htmlFor={license.toLowerCase().replace(/ /g, "-")}>{license}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>What food preparation methods do you use?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Fresh cooking", "Reheating", "Assembly only"].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      id={method}
                      checked={formData.preparationMethods.includes(method)}
                      onCheckedChange={() => toggleArrayItem("preparationMethods", method)}
                    />
                    <Label htmlFor={method}>{method}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="servesSeafood"
                checked={formData.servesSeafood}
                onCheckedChange={(checked) => updateFormData("servesSeafood", checked)}
              />
              <Label htmlFor="servesSeafood">Do you serve seafood?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="specialDietary"
                checked={formData.specialDietary}
                onCheckedChange={(checked) => updateFormData("specialDietary", checked)}
              />
              <Label htmlFor="specialDietary">Do you offer organic or special dietary options?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="kidsMenu"
                checked={formData.kidsMenu}
                onCheckedChange={(checked) => updateFormData("kidsMenu", checked)}
              />
              <Label htmlFor="kidsMenu">Do you have a kids menu?</Label>
            </div>
          </div>
        );

      case 4: // Equipment & Infrastructure
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What kitchen equipment do you have?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Commercial ovens", "Fryers", "Grills", "Dishwashers"].map((equip) => (
                  <div key={equip} className="flex items-center space-x-2">
                    <Checkbox
                      id={equip}
                      checked={formData.kitchenEquipment.includes(equip)}
                      onCheckedChange={() => toggleArrayItem("kitchenEquipment", equip)}
                    />
                    <Label htmlFor={equip}>{equip}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>What refrigeration equipment do you use?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Walk-in coolers", "Reach-in fridges", "Freezers"].map((equip) => (
                  <div key={equip} className="flex items-center space-x-2">
                    <Checkbox
                      id={equip}
                      checked={formData.refrigerationEquipment.includes(equip)}
                      onCheckedChange={() => toggleArrayItem("refrigerationEquipment", equip)}
                    />
                    <Label htmlFor={equip}>{equip}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>What fire safety equipment is installed?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Suppression system", "Fire extinguishers", "Smoke alarms"].map((equip) => (
                  <div key={equip} className="flex items-center space-x-2">
                    <Checkbox
                      id={equip}
                      checked={formData.fireSafetyEquipment.includes(equip)}
                      onCheckedChange={() => toggleArrayItem("fireSafetyEquipment", equip)}
                    />
                    <Label htmlFor={equip}>{equip}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Do you have a security system?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["CCTV", "Alarms", "Safes"].map((equip) => (
                  <div key={equip} className="flex items-center space-x-2">
                    <Checkbox
                      id={equip}
                      checked={formData.securitySystem.includes(equip)}
                      onCheckedChange={() => toggleArrayItem("securitySystem", equip)}
                    />
                    <Label htmlFor={equip}>{equip}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="posSystem">What POS system do you use?</Label>
              <Input
                id="posSystem"
                value={formData.posSystem}
                onChange={(e) => updateFormData("posSystem", e.target.value)}
                placeholder="Square, Toast, EFTPOS machines"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="ventilationSystems"
                checked={formData.ventilationSystems}
                onCheckedChange={(checked) => updateFormData("ventilationSystems", checked)}
              />
              <Label htmlFor="ventilationSystems">Do you have proper ventilation systems?</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wasteManagement">What waste management setup do you have?</Label>
              <Input
                id="wasteManagement"
                value={formData.wasteManagement}
                onChange={(e) => updateFormData("wasteManagement", e.target.value)}
                placeholder="Description"
              />
            </div>
          </div>
        );

      case 5: // Financial & Systems
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="annualRevenue">What is your annual revenue range?</Label>
              <Input
                id="annualRevenue"
                value={formData.annualRevenue}
                onChange={(e) => updateFormData("annualRevenue", e.target.value)}
                placeholder="e.g. $500k - $1M"
              />
            </div>

            <div className="space-y-2">
              <Label>What accounting software do you use?</Label>
              <RadioGroup value={formData.accountingSoftware} onValueChange={(value) => updateFormData("accountingSoftware", value)}>
                {["Xero", "MYOB", "QuickBooks", "Manual"].map((software) => (
                  <div key={software} className="flex items-center space-x-2">
                    <RadioGroupItem value={software.toLowerCase()} id={software.toLowerCase()} />
                    <Label htmlFor={software.toLowerCase()}>{software}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>How do you handle payroll?</Label>
              <RadioGroup value={formData.payrollHandling} onValueChange={(value) => updateFormData("payrollHandling", value)}>
                {["In-house", "Outsourced", "Software"].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <RadioGroupItem value={method.toLowerCase()} id={method.toLowerCase()} />
                    <Label htmlFor={method.toLowerCase()}>{method}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>What payment methods do you accept?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Cash", "Card", "Digital wallets"].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      id={method}
                      checked={formData.paymentMethods.includes(method)}
                      onCheckedChange={() => toggleArrayItem("paymentMethods", method)}
                    />
                    <Label htmlFor={method}>{method}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Do you partner with delivery platforms?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Uber Eats", "DoorDash"].map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform}
                      checked={formData.deliveryPlatforms.includes(platform)}
                      onCheckedChange={() => toggleArrayItem("deliveryPlatforms", platform)}
                    />
                    <Label htmlFor={platform}>{platform}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 6: // Current Compliance Status
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What licenses do you currently have?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Food business license", "Liquor license", "DA approval"].map((license) => (
                  <div key={license} className="flex items-center space-x-2">
                    <Checkbox
                      id={license}
                      checked={formData.currentLicenses.includes(license)}
                      onCheckedChange={() => toggleArrayItem("currentLicenses", license)}
                    />
                    <Label htmlFor={license}>{license}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>What insurance coverage do you have?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Public liability", "Workers comp", "Business insurance"].map((insurance) => (
                  <div key={insurance} className="flex items-center space-x-2">
                    <Checkbox
                      id={insurance}
                      checked={formData.insuranceCoverage.includes(insurance)}
                      onCheckedChange={() => toggleArrayItem("insuranceCoverage", insurance)}
                    />
                    <Label htmlFor={insurance}>{insurance}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastInspection">When was your last inspection?</Label>
              <Input
                id="lastInspection"
                value={formData.lastInspection}
                onChange={(e) => updateFormData("lastInspection", e.target.value)}
                placeholder="Council, Fair Work, ATO, WorkSafe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="finesPenalties">Have you received any fines or penalties? If yes, what amount and reason?</Label>
              <Textarea
                id="finesPenalties"
                value={formData.finesPenalties}
                onChange={(e) => updateFormData("finesPenalties", e.target.value)}
                placeholder="Details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complianceTools">What compliance tools do you currently use?</Label>
              <Input
                id="complianceTools"
                value={formData.complianceTools}
                onChange={(e) => updateFormData("complianceTools", e.target.value)}
                placeholder="Tools"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complianceHandler">Who handles your compliance?</Label>
              <Input
                id="complianceHandler"
                value={formData.complianceHandler}
                onChange={(e) => updateFormData("complianceHandler", e.target.value)}
                placeholder="Owner, manager, accountant, lawyer"
              />
            </div>
          </div>
        );

      case 7: // Risk Assessment
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="highRiskFoods"
                checked={formData.highRiskFoods}
                onCheckedChange={(checked) => updateFormData("highRiskFoods", checked)}
              />
              <Label htmlFor="highRiskFoods">Do you handle high-risk foods? (Raw meat, seafood, dairy-heavy dishes)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lateNightOperation"
                checked={formData.lateNightOperation}
                onCheckedChange={(checked) => updateFormData("lateNightOperation", checked)}
              />
              <Label htmlFor="lateNightOperation">Do you operate late at night (after 10pm)?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="cashHeavy"
                checked={formData.cashHeavy}
                onCheckedChange={(checked) => updateFormData("cashHeavy", checked)}
              />
              <Label htmlFor="cashHeavy">Is your business cash-heavy?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="multipleLocations"
                checked={formData.multipleLocations}
                onCheckedChange={(checked) => updateFormData("multipleLocations", checked)}
              />
              <Label htmlFor="multipleLocations">Do you have multiple locations?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="franchised"
                checked={formData.franchised}
                onCheckedChange={(checked) => updateFormData("franchised", checked)}
              />
              <Label htmlFor="franchised">Are you a franchised business?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="offSiteCatering"
                checked={formData.offSiteCatering}
                onCheckedChange={(checked) => updateFormData("offSiteCatering", checked)}
              />
              <Label htmlFor="offSiteCatering">Do you provide catering for off-site events?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="specialEvents"
                checked={formData.specialEvents}
                onCheckedChange={(checked) => updateFormData("specialEvents", checked)}
              />
              <Label htmlFor="specialEvents">Do you host special events or functions?</Label>
            </div>
          </div>
        );

      case 8: // Business Goals
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="growthPlans">What are your growth plans?</Label>
              <Input
                id="growthPlans"
                value={formData.growthPlans}
                onChange={(e) => updateFormData("growthPlans", e.target.value)}
                placeholder="Expanding, new locations, menu changes"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complianceWorries">What are your biggest compliance worries?</Label>
              <Input
                id="complianceWorries"
                value={formData.complianceWorries}
                onChange={(e) => updateFormData("complianceWorries", e.target.value)}
                placeholder="Fines, inspections, paperwork"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complianceHours">How many hours per week do you spend on compliance?</Label>
              <Input
                id="complianceHours"
                value={formData.complianceHours}
                onChange={(e) => updateFormData("complianceHours", e.target.value)}
                placeholder="e.g. 5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complianceBudget">What is your annual compliance budget?</Label>
              <Input
                id="complianceBudget"
                value={formData.complianceBudget}
                onChange={(e) => updateFormData("complianceBudget", e.target.value)}
                placeholder="e.g. $10,000"
              />
            </div>

            <div className="space-y-2">
              <Label>What is your technology comfort level?</Label>
              <RadioGroup value={formData.techComfort} onValueChange={(value) => updateFormData("techComfort", value)}>
                {["High", "Medium", "Low"].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem value={level.toLowerCase()} id={level.toLowerCase()} />
                    <Label htmlFor={level.toLowerCase()}>{level}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 9: // Technical Integration
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="internetReliability">How reliable is your internet at the venue?</Label>
              <Input
                id="internetReliability"
                value={formData.internetReliability}
                onChange={(e) => updateFormData("internetReliability", e.target.value)}
                placeholder="e.g. Excellent, Good, Poor"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="staffDeviceAccess"
                checked={formData.staffDeviceAccess}
                onCheckedChange={(checked) => updateFormData("staffDeviceAccess", checked)}
              />
              <Label htmlFor="staffDeviceAccess">Do your staff have access to smartphones/tablets?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="wifiAvailable"
                checked={formData.wifiAvailable}
                onCheckedChange={(checked) => updateFormData("wifiAvailable", checked)}
              />
              <Label htmlFor="wifiAvailable">Do you have Wi-Fi available?</Label>
            </div>

            <div className="space-y-2">
              <Label>How do you prefer to receive notifications?</Label>
              <RadioGroup value={formData.notificationPreference} onValueChange={(value) => updateFormData("notificationPreference", value)}>
                {["Email", "SMS", "App notifications"].map((pref) => (
                  <div key={pref} className="flex items-center space-x-2">
                    <RadioGroupItem value={pref.toLowerCase().replace(/ /g, "-")} id={pref.toLowerCase().replace(/ /g, "-")} />
                    <Label htmlFor={pref.toLowerCase().replace(/ /g, "-")}>{pref}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 10: // Tax Compliance
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="gstRegistered"
                checked={formData.gstRegistered}
                onCheckedChange={(checked) => updateFormData("gstRegistered", checked)}
              />
              <Label htmlFor="gstRegistered">Are you registered for GST?</Label>
            </div>

            <div className="space-y-2">
              <Label>How often do you lodge BAS?</Label>
              <RadioGroup value={formData.basFrequency} onValueChange={(value) => updateFormData("basFrequency", value)}>
                {["Monthly", "Quarterly"].map((freq) => (
                  <div key={freq} className="flex items-center space-x-2">
                    <RadioGroupItem value={freq.toLowerCase()} id={freq.toLowerCase()} />
                    <Label htmlFor={freq.toLowerCase()}>{freq}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="paygWithholding"
                checked={formData.paygWithholding}
                onCheckedChange={(checked) => updateFormData("paygWithholding", checked)}
              />
              <Label htmlFor="paygWithholding">Do you have PAYG withholding obligations?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="staffBenefits"
                checked={formData.staffBenefits}
                onCheckedChange={(checked) => updateFormData("staffBenefits", checked)}
              />
              <Label htmlFor="staffBenefits">Do you provide company cars, meals, or entertainment to staff?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="largeCashTransactions"
                checked={formData.largeCashTransactions}
                onCheckedChange={(checked) => updateFormData("largeCashTransactions", checked)}
              />
              <Label htmlFor="largeCashTransactions">Do you have cash transactions over $10,000?</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipsHandling">How do you handle tips?</Label>
              <Input
                id="tipsHandling"
                value={formData.tipsHandling}
                onChange={(e) => updateFormData("tipsHandling", e.target.value)}
                placeholder="Pooled, individual, electronic"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="giftCards"
                checked={formData.giftCards}
                onCheckedChange={(checked) => updateFormData("giftCards", checked)}
              />
              <Label htmlFor="giftCards">Do you sell gift cards?</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="staffMeals">Do you provide staff meals? How are these handled for tax?</Label>
              <Input
                id="staffMeals"
                value={formData.staffMeals}
                onChange={(e) => updateFormData("staffMeals", e.target.value)}
                placeholder="Details"
              />
            </div>
          </div>
        );

      case 11: // Food Safety
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="foodHandlerCerts"
                checked={formData.foodHandlerCerts}
                onCheckedChange={(checked) => updateFormData("foodHandlerCerts", checked)}
              />
              <Label htmlFor="foodHandlerCerts">Do all your food handlers have current certifications?</Label>
            </div>

            <div className="space-y-2">
              <Label>How do you monitor food temperatures?</Label>
              <Input
                value={formData.temperatureMonitoring}
                onChange={(e) => updateFormData("temperatureMonitoring", e.target.value)}
                placeholder="Manual logs, digital systems"
              />
            </div>

            <div className="space-y-2">
              <Label>What allergen management procedures do you have?</Label>
              <Input
                value={formData.allergenProcedures}
                onChange={(e) => updateFormData("allergenProcedures", e.target.value)}
                placeholder="Procedures"
              />
            </div>

            <div className="space-y-2">
              <Label>How do you verify your suppliers?</Label>
              <Input
                value={formData.supplierVerification}
                onChange={(e) => updateFormData("supplierVerification", e.target.value)}
                placeholder="Verification methods"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="cleaningSchedule"
                checked={formData.cleaningSchedule}
                onCheckedChange={(checked) => updateFormData("cleaningSchedule", checked)}
              />
              <Label htmlFor="cleaningSchedule">Do you have a cleaning schedule in place?</Label>
            </div>

            <div className="space-y-2">
              <Label>How often does your pest control contractor inspect?</Label>
              <Input
                value={formData.pestControlFrequency}
                onChange={(e) => updateFormData("pestControlFrequency", e.target.value)}
                placeholder="Frequency"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="boreWater"
                checked={formData.boreWater}
                onCheckedChange={(checked) => updateFormData("boreWater", checked)}
              />
              <Label htmlFor="boreWater">Do you use bore water? If yes, do you test water quality?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="recallProcedures"
                checked={formData.recallProcedures}
                onCheckedChange={(checked) => updateFormData("recallProcedures", checked)}
              />
              <Label htmlFor="recallProcedures">Do you have food recall procedures in place?</Label>
            </div>
          </div>
        );

      case 12: // Workplace Laws
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="awardClassifications">What award classifications apply to your staff roles?</Label>
              <Input
                id="awardClassifications"
                value={formData.awardClassifications}
                onChange={(e) => updateFormData("awardClassifications", e.target.value)}
                placeholder="Classifications"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="penaltyRates">How do you handle penalty rates for weekends and holidays?</Label>
              <Input
                id="penaltyRates"
                value={formData.penaltyRates}
                onChange={(e) => updateFormData("penaltyRates", e.target.value)}
                placeholder="Details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="breakEntitlements">How do you manage staff break entitlements?</Label>
              <Input
                id="breakEntitlements"
                value={formData.breakEntitlements}
                onChange={(e) => updateFormData("breakEntitlements", e.target.value)}
                placeholder="Details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uniformsEquipment">Who pays for uniforms and equipment?</Label>
              <Input
                id="uniformsEquipment"
                value={formData.uniformsEquipment}
                onChange={(e) => updateFormData("uniformsEquipment", e.target.value)}
                placeholder="Details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rosterNotice">How much notice do you give for roster changes?</Label>
              <Input
                id="rosterNotice"
                value={formData.rosterNotice}
                onChange={(e) => updateFormData("rosterNotice", e.target.value)}
                placeholder="e.g. 1 week"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoursRecording">How do you record staff working hours?</Label>
              <Input
                id="hoursRecording"
                value={formData.hoursRecording}
                onChange={(e) => updateFormData("hoursRecording", e.target.value)}
                placeholder="Manual timesheets, digital"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="enterpriseAgreements"
                checked={formData.enterpriseAgreements}
                onCheckedChange={(checked) => updateFormData("enterpriseAgreements", checked)}
              />
              <Label htmlFor="enterpriseAgreements">Do you have any enterprise agreements in place?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="bullyingPolicies"
                checked={formData.bullyingPolicies}
                onCheckedChange={(checked) => updateFormData("bullyingPolicies", checked)}
              />
              <Label htmlFor="bullyingPolicies">Do you have workplace bullying policies?</Label>
            </div>
          </div>
        );

      case 13: // Consumer Protection
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="accuratePricing"
                checked={formData.accuratePricing}
                onCheckedChange={(checked) => updateFormData("accuratePricing", checked)}
              />
              <Label htmlFor="accuratePricing">Are your menu prices accurate for dine-in vs takeaway?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="surchargeDisclosure"
                checked={formData.surchargeDisclosure}
                onCheckedChange={(checked) => updateFormData("surchargeDisclosure", checked)}
              />
              <Label htmlFor="surchargeDisclosure">Do you clearly disclose all surcharges?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="clearPromotions"
                checked={formData.clearPromotions}
                onCheckedChange={(checked) => updateFormData("clearPromotions", checked)}
              />
              <Label htmlFor="clearPromotions">Are your promotional terms and conditions clear?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="onlineFeeDisclosure"
                checked={formData.onlineFeeDisclosure}
                onCheckedChange={(checked) => updateFormData("onlineFeeDisclosure", checked)}
              />
              <Label htmlFor="onlineFeeDisclosure">Do you disclose online platform fees to customers?</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="complaintHandling">How do you handle customer complaints?</Label>
              <Input
                id="complaintHandling"
                value={formData.complaintHandling}
                onChange={(e) => updateFormData("complaintHandling", e.target.value)}
                placeholder="Details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="voucherPolicy">What is your gift voucher expiry policy?</Label>
              <Input
                id="voucherPolicy"
                value={formData.voucherPolicy}
                onChange={(e) => updateFormData("voucherPolicy", e.target.value)}
                placeholder="Policy details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="refundPolicy">What are your refund and exchange policies?</Label>
              <Input
                id="refundPolicy"
                value={formData.refundPolicy}
                onChange={(e) => updateFormData("refundPolicy", e.target.value)}
                placeholder="Policy details"
              />
            </div>
          </div>
        );

      case 14: // Fire & Safety
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="evacuationTraining">How often do you conduct emergency evacuation training?</Label>
              <Input
                id="evacuationTraining"
                value={formData.evacuationTraining}
                onChange={(e) => updateFormData("evacuationTraining", e.target.value)}
                placeholder="Frequency"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fireEquipmentInspection">When were your fire equipment last inspected?</Label>
              <Input
                id="fireEquipmentInspection"
                value={formData.fireEquipmentInspection}
                onChange={(e) => updateFormData("fireEquipmentInspection", e.target.value)}
                placeholder="Date"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstAidStaff">How many first aid trained staff do you have?</Label>
              <Input
                id="firstAidStaff"
                value={formData.firstAidStaff}
                onChange={(e) => updateFormData("firstAidStaff", e.target.value)}
                placeholder="Number"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="incidentReporting"
                checked={formData.incidentReporting}
                onCheckedChange={(checked) => updateFormData("incidentReporting", checked)}
              />
              <Label htmlFor="incidentReporting">Do you have incident reporting procedures?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="manualHandlingTraining"
                checked={formData.manualHandlingTraining}
                onCheckedChange={(checked) => updateFormData("manualHandlingTraining", checked)}
              />
              <Label htmlFor="manualHandlingTraining">Have staff received manual handling training?</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hazardManagement">How do you manage slip and trip hazards?</Label>
              <Input
                id="hazardManagement"
                value={formData.hazardManagement}
                onChange={(e) => updateFormData("hazardManagement", e.target.value)}
                placeholder="Details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chemicalStorage">How do you store cleaning products and chemicals?</Label>
              <Input
                id="chemicalStorage"
                value={formData.chemicalStorage}
                onChange={(e) => updateFormData("chemicalStorage", e.target.value)}
                placeholder="Details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipmentServicing">When was your equipment last serviced?</Label>
              <Input
                id="equipmentServicing"
                value={formData.equipmentServicing}
                onChange={(e) => updateFormData("equipmentServicing", e.target.value)}
                placeholder="Date"
              />
            </div>
          </div>
        );

      case 15: // Privacy & Data
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="customerDataCollection"
                checked={formData.customerDataCollection}
                onCheckedChange={(checked) => updateFormData("customerDataCollection", checked)}
              />
              <Label htmlFor="customerDataCollection">Do you collect customer data through loyalty programs or online orders?</Label>
            </div>

            <div className="space-y-2">
              <Label>Do you have CCTV systems? Where are cameras located and how long do you keep footage?</Label>
              <Input
                value={formData.cctvSystems}
                onChange={(e) => updateFormData("cctvSystems", e.target.value)}
                placeholder="Details"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="guestWifi"
                checked={formData.guestWifi}
                onCheckedChange={(checked) => updateFormData("guestWifi", checked)}
              />
              <Label htmlFor="guestWifi">Do you offer guest Wi-Fi access?</Label>
            </div>

            <div className="space-y-2">
              <Label>How do you handle staff personal information?</Label>
              <Input
                value={formData.staffPersonalInfo}
                onChange={(e) => updateFormData("staffPersonalInfo", e.target.value)}
                placeholder="Details"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="pciCompliance"
                checked={formData.pciCompliance}
                onCheckedChange={(checked) => updateFormData("pciCompliance", checked)}
              />
              <Label htmlFor="pciCompliance">Are you PCI DSS compliant for card payments?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketingConsent"
                checked={formData.marketingConsent}
                onCheckedChange={(checked) => updateFormData("marketingConsent", checked)}
              />
              <Label htmlFor="marketingConsent">Do you have consent for marketing communications?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="dataBreachProcedures"
                checked={formData.dataBreachProcedures}
                onCheckedChange={(checked) => updateFormData("dataBreachProcedures", checked)}
              />
              <Label htmlFor="dataBreachProcedures">Do you have procedures for data breaches?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="dataSharing"
                checked={formData.dataSharing}
                onCheckedChange={(checked) => updateFormData("dataSharing", checked)}
              />
              <Label htmlFor="dataSharing">Do you share data with third parties like delivery platforms?</Label>
            </div>
          </div>
        );

      case 16: // High-Risk Flags
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cashPayments"
                checked={formData.cashPayments}
                onCheckedChange={(checked) => updateFormData("cashPayments", checked)}
              />
              <Label htmlFor="cashPayments">Do you pay any staff in cash?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="familyEmployees"
                checked={formData.familyEmployees}
                onCheckedChange={(checked) => updateFormData("familyEmployees", checked)}
              />
              <Label htmlFor="familyEmployees">Do you employ family members?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="seasonalStaff"
                checked={formData.seasonalStaff}
                onCheckedChange={(checked) => updateFormData("seasonalStaff", checked)}
              />
              <Label htmlFor="seasonalStaff">Do staff numbers vary significantly by season?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="alcoholAfterMidnight"
                checked={formData.alcoholAfterMidnight}
                onCheckedChange={(checked) => updateFormData("alcoholAfterMidnight", checked)}
              />
              <Label htmlFor="alcoholAfterMidnight">Do you serve alcohol after midnight?</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="liveEntertainment"
                checked={formData.liveEntertainment}
                onCheckedChange={(checked) => updateFormData("liveEntertainment", checked)}
              />
              <Label htmlFor="liveEntertainment">Do you have live entertainment?</Label>
            </div>

            <div className="space-y-2">
              <Label>Are your delivery drivers employees or contractors?</Label>
              <Input
                value={formData.deliveryDrivers}
                onChange={(e) => updateFormData("deliveryDrivers", e.target.value)}
                placeholder="Employees or contractors"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-4">Step {currentStep + 1} Content Coming Soon</h3>
            <p className="text-muted-foreground">This step is being developed. Click Next to continue.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Compliance Shield Onboarding</h1>
          <p className="text-muted-foreground">Let's get your business set up for success</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </span>
            <Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">{steps[currentStep].icon}</span>
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription>
              Please provide the following information about your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button onClick={handleNext}>
                {currentStep === steps.length - 1 ? "Complete Setup" : "Next"}
                {currentStep !== steps.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
