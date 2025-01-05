import { Calculator } from "lucide-react";
import Link from "next/link";

export default function CalculatorsPage(): JSX.Element {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Financial Calculators</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Link 
          href="/calculators/sip-swp" 
          className="p-6 border rounded-lg hover:border-primary transition-colors"
        >
          <Calculator className="w-12 h-12 mb-4" />
          <h2 className="text-lg font-semibold mb-2">SIP to SWP Calculator</h2>
          <p className="text-sm text-muted-foreground">
            Plan your investment journey from SIP to SWP with our advanced calculator
          </p>
        </Link>
        {/* More calculators to be added */}
      </div>
    </div>
  );
} 