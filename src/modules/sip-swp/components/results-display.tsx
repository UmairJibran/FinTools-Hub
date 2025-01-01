import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationResults } from "@/lib/types";
import { InvestmentChart } from "@/components/calculator/investment-chart";
import { motion } from "framer-motion";
import { ResultsSummary } from "@/components/calculator/results-summary";

interface ResultsDisplayProps {
    results: CalculationResults;
    swpStartYear: number;
    currency: string;
}

export function ResultsDisplay({ results, swpStartYear, currency }: ResultsDisplayProps) {
    if (!results.length) return null;

    const lastResult = results[results.length - 1];
    const isViable = results[0].year !== 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8"
        >
            <Card>
                <CardHeader>
                    <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <ResultsSummary 
                            isViable={isViable}
                            lastResult={lastResult}
                            swpStartYear={swpStartYear}
                            currency={currency}
                        />
                        {isViable && (
                            <>
                                <p>Final portfolio value: {lastResult.total}</p>
                                <InvestmentChart 
                                    data={results} 
                                    swpStartYear={swpStartYear} 
                                    currency={currency}
                                />
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
} 