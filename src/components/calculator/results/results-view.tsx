"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvestmentChart } from "@/components/calculator/investment-chart";
import { ResultsTable } from "../results-table";
import { Button } from "@/components/ui/button";
import { Edit2, Table, RefreshCw } from "lucide-react";
import { CalculationResults } from "@/lib/types";

interface ResultsViewProps {
    results: CalculationResults;
    swpStartYear: number;
    currency: string;
    onEdit: () => void;
    onReset: () => void;
}

export function ResultsView({ results, swpStartYear, currency, onEdit, onReset }: ResultsViewProps) {
    const [showTable, setShowTable] = useState(false);

    return (
        <div className="space-y-4 max-w-full">
            <div className="flex justify-between items-center">
                <div className="space-x-2">
                    <Button variant="outline" onClick={onEdit}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Parameters
                    </Button>
                    <Button variant="outline" onClick={onReset}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Start Over
                    </Button>
                </div>
                <Button 
                    variant="outline" 
                    onClick={() => setShowTable(!showTable)}
                >
                    <Table className="mr-2 h-4 w-4" />
                    {showTable ? "Hide Table" : "Show Table"}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full min-h-[500px]">
                <motion.div
                    layout
                    className={`w-full h-[500px] ${showTable ? "" : "md:col-span-2"}`}
                >
                    <InvestmentChart 
                        data={results} 
                        swpStartYear={swpStartYear}
                        currency={currency}
                    />
                </motion.div>

                <AnimatePresence>
                    {showTable && (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className="w-full h-[500px] overflow-auto border rounded-lg"
                        >
                            <ResultsTable 
                                results={results}
                                currency={currency}
                                swpStartYear={swpStartYear}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
} 