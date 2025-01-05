import { CalculationResult } from "../lib/types";

interface ResultsSummaryProps {
    isViable: boolean;
    lastResult: CalculationResult;
    swpStartYear: number;
    currency: string;
}

export function ResultsSummary({ isViable, lastResult, swpStartYear }: ResultsSummaryProps): JSX.Element {
    return (
        <p className="text-lg font-medium">
            {!isViable ? (
                <span className="text-destructive">
                    Your investment will not sustain any withdrawals with current parameters
                </span>
            ) : (
                <>
                    After SWP starts, your investment will last{" "}
                    <span className="text-primary">
                        {lastResult.month === 12 
                            ? lastResult.year - swpStartYear + 1 
                            : lastResult.year - swpStartYear} years
                        {lastResult.month !== 12 && 
                            ` and ${lastResult.month} months`}
                    </span>
                </>
            )}
        </p>
    );
} 