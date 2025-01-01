import { useState } from "react";
import { CalculatorInputs, CalculationResults } from "../lib/types";
import { calculateSIPSWP } from "../lib/calculator";

export function useCalculator() {
    const [isCalculating, setIsCalculating] = useState(false);
    const [results, setResults] = useState<CalculationResults | null>(null);
    const [error, setError] = useState<string | null>(null);

    const calculate = async (values: CalculatorInputs) => {
        setIsCalculating(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const results = calculateSIPSWP(values);
            setResults(results);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Calculation failed");
            console.error(err);
        } finally {
            setIsCalculating(false);
        }
    };

    return {
        isCalculating,
        results,
        error,
        calculate
    };
} 