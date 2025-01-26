"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

interface ZakatResultsProps {
    amount: number;
    netWorth: number;
    currency: string;
    nisabThreshold: number;
    onEdit: () => void;
    onReset: () => void;
}

export function ZakatResults({ amount, netWorth, currency, nisabThreshold, onEdit, onReset }: ZakatResultsProps): React.ReactNode {
    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto"
        >
            <div className="space-y-6">
                    <div className="text-center space-y-6">
                        <div>
                            <p className="text-lg mb-2">Your Annual Zakat Amount:</p>
                            <p className="text-4xl font-bold text-primary">
                                {formatCurrency(amount)}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Nisab Threshold</p>
                                <p className="text-xl font-semibold">{formatCurrency(nisabThreshold)}</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Your Net Worth</p>
                                <p className="text-xl font-semibold">{formatCurrency(netWorth)}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>
                                {netWorth >= nisabThreshold
                                    ? `Based on your net worth of ${formatCurrency(netWorth)}, which is above the Nisab threshold of ${formatCurrency(nisabThreshold)}, you are required to pay Zakat.`
                                    : `Your net worth of ${formatCurrency(netWorth)} is below the Nisab threshold of ${formatCurrency(nisabThreshold)}. Therefore, you are not required to pay Zakat this year.`
                                }
                            </p>
                            <p>
                                {netWorth >= nisabThreshold
                                    ? `Your Zakat amount is calculated as 2.5% of your total net worth, which comes to ${formatCurrency(amount)}.`
                                    : "Zakat becomes obligatory only when your wealth exceeds the Nisab threshold."}
                            </p>
                            <br />
                            <em>
                                This calculation is based on the lunar calendar year. For the most accurate guidance on your Zakat obligations, please consult with a qualified Islamic scholar who can consider your specific circumstances.
                            </em>
                        </div>

                        <div className="flex justify-center gap-4 pt-4">
                            <Button variant="outline" onClick={onEdit}>
                                Edit Values
                            </Button>
                            <Button variant="outline" onClick={onReset}>
                                Start Over
                            </Button>
                        </div>
                    </div>
            </div>
        </motion.div>
    );
}