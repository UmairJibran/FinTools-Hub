import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage(): JSX.Element {
    return (
        <div className="py-20">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-6">
                        Smart Financial Tools for Better Decisions
                    </h1>
                    <p className="text-xl text-muted-foreground mb-10">
                        Access powerful calculators and resources to plan your financial future.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/calculators" className="group p-6 border rounded-lg hover:border-primary">
                            <Calculator className="w-12 h-12 mb-4 mx-auto" />
                            <h2 className="text-lg font-semibold mb-2">Calculators</h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Financial calculators for investment planning
                            </p>
                            <Button variant="ghost" className="group-hover:text-primary">
                                Explore <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        {/* Similar cards for Blog and Resources */}
                    </div>
                </div>
            </div>
        </div>
    );
} 