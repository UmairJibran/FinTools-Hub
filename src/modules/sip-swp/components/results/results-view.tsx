"use client"

import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Table, RefreshCw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CalculationResults } from "../../lib/types";
import { InvestmentChart } from "../investment-chart";
import { ResultsTable } from "../results-table";

interface ResultsViewProps {
    results: CalculationResults;
    swpStartYear: number;
    currency: string;
    onEdit: () => void;
    onReset: () => void;
}

export function ResultsView({ results, swpStartYear, currency, onEdit, onReset }: ResultsViewProps): JSX.Element {
    const [showTable, setShowTable] = useState(false);

    return (
        <div className="-mx-4 sm:mx-0 space-y-4">
            <div className="px-2 sm:px-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" onClick={onEdit} className="flex-1 sm:flex-none">
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Params
                    </Button>
                    <Button variant="outline" onClick={onReset} className="flex-1 sm:flex-none">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                </div>
                <Button 
                    variant="outline" 
                    onClick={() => setShowTable(!showTable)}
                    className="w-full sm:w-auto"
                >
                    <Table className="mr-2 h-4 w-4" />
                    {showTable ? "Hide Table" : "Show Table"}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
                <motion.div
                    layout
                    className={`w-full h-[300px] sm:h-[500px] ${showTable ? "" : "md:col-span-2"}`}
                >
                    <div className="-mx-4 sm:mx-0 h-full">
                        <div className="h-full w-full">
                            <InvestmentChart 
                                data={results} 
                                swpStartYear={swpStartYear}
                                currency={currency}
                            />
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {showTable && (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className="w-full h-[300px] sm:h-[500px] overflow-auto border rounded-lg"
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