import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ShiftRunthrough = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shift Runthrough</h1>
          <p className="text-gray-600">Complete your daily compliance checks throughout your shift</p>
        </div>

        {/* START OF SHIFT */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-green-800">
              📋 START OF SHIFT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-green-200">
                    <th className="text-left py-3 px-4 font-semibold text-green-800">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-green-800">Essential Checks</th>
                    <th className="text-left py-3 px-4 font-semibold text-green-800">Proof Method</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-green-100">
                    <td className="py-4 px-4 font-medium text-green-700">Food Safety</td>
                    <td className="py-4 px-4">
                      • Fridge/freezer temps (0-5°C/-18°C)<br/>
                      • Ready-to-eat food covered (prevent airborne contamination)
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-green-300 text-green-700">IoT sensor/photo</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-4 px-4 font-medium text-green-700">Fire & Safety</td>
                    <td className="py-4 px-4">
                      • Emergency exits/pathways clear<br/>
                      • Fire extinguisher accessible (visual check only)
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-green-300 text-green-700">10-sec visual scan</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-4 px-4 font-medium text-green-700">Workplace Laws</td>
                    <td className="py-4 px-4">
                      • Under-18 staff end times logged<br/>
                      • First aid kit stocked & accessible
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-green-300 text-green-700">Roster cross-check</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-4 px-4 font-medium text-green-700">Privacy & Data</td>
                    <td className="py-4 px-4">
                      • Shared devices logged out<br/>
                      • POS system session timeout enabled
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-green-300 text-green-700">System auto-check</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-green-700">Premises</td>
                    <td className="py-4 px-4">
                      • Pest traps checked<br/>
                      • Waste bin lids closed (no overflow risk)
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-green-300 text-green-700">Photo</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* MID-SHIFT */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-blue-800">
              🔄 MID-SHIFT (Every 2-4 Hours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left py-3 px-4 font-semibold text-blue-800">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-800">Essential Checks</th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-800">Automation</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-blue-100">
                    <td className="py-4 px-4 font-medium text-blue-700">Food Safety</td>
                    <td className="py-4 px-4">
                      • Hot-held food ≥60°C<br/>
                      • Raw/RTE color-coded utensils separated
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Temp gun + photo</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-4 px-4 font-medium text-blue-700">Tax Compliance</td>
                    <td className="py-4 px-4">
                      • GST applied to new orders<br/>
                      • Sales receipts matched to POS entries
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">POS auto-flag</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-4 px-4 font-medium text-blue-700">Consumer Safety</td>
                    <td className="py-4 px-4">
                      • Allergen board updated<br/>
                      • Expired products removed from display
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Photo log</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-4 px-4 font-medium text-blue-700">Workplace Laws</td>
                    <td className="py-4 px-4">
                      • Break compliance alerts (staff paused at 4h 45m)<br/>
                      • No unpaid overtime
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">System lock</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-blue-700">Premises</td>
                    <td className="py-4 px-4">
                      • Floor dry/no tripping hazards<br/>
                      • Chemical storage locked
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Attestation</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* END OF SHIFT */}
        <Card className="mb-8 border-purple-200 bg-purple-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-purple-800">
              📦 END OF SHIFT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-200">
                    <th className="text-left py-3 px-4 font-semibold text-purple-800">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-purple-800">Essential Checks</th>
                    <th className="text-left py-3 px-4 font-semibold text-purple-800">Auto-Output</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-purple-100">
                    <td className="py-4 px-4 font-medium text-purple-700">Tax Compliance</td>
                    <td className="py-4 px-4">
                      • Daily GST reconciliation<br/>
                      • Cash drawer variance &lt;2%
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-purple-300 text-purple-700">BAS-ready file</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-4 px-4 font-medium text-purple-700">Workplace Laws</td>
                    <td className="py-4 px-4">
                      • All breaks logged<br/>
                      • Incident/near-miss reports filed
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-purple-300 text-purple-700">Fair Work cert</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-4 px-4 font-medium text-purple-700">Food Safety</td>
                    <td className="py-4 px-4">
                      • Waste log (reason/weight)<br/>
                      • Sanitizer concentration tested
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-purple-300 text-purple-700">Council report</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-purple-700">Privacy & Data</td>
                    <td className="py-4 px-4">
                      • Transaction data encrypted/backed up<br/>
                      • Customer data purged (non-essential)
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="border-purple-300 text-purple-700">Audit trail</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShiftRunthrough;