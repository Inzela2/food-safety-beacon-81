import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Share2, Gift } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const PromoBanner = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const referralLink = `https://compliance-shield.com/signup?ref=${user.referralCode}`;

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Referral link copied!",
        description: "Share it with a business owner to get 1 month free when they start using Compliance Shield.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 rounded-lg shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <Gift className="h-3 w-3 mr-1" />
            FREE TRIAL
          </Badge>
          <span className="text-sm font-medium">
            Free trial for 1 month then ONLY $19/month!
          </span>
        </div>
        
        <Button
          onClick={copyReferralLink}
          variant="secondary"
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
        >
          <Share2 className="h-3 w-3 mr-1" />
          {copied ? "Copied!" : "Get 1 Month Free"}
        </Button>
      </div>
      
      <div className="mt-2 text-xs opacity-90">
        Get 1 more month free by recommending it to someone! 
        <span className="font-medium"> Your referral code: {user.referralCode}</span>
      </div>
    </div>
  );
};

export default PromoBanner;