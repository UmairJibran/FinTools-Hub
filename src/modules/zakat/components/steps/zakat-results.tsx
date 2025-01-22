"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ZakatResultsProps {
    amount: number;
    netWorth: number;
    currency: string;
    onEdit: () => void;
    onReset: () => void;
}

export function ZakatResults({ amount, netWorth, currency, onEdit, onReset }: ZakatResultsProps): React.ReactNode {
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
            <Card>
                <CardHeader>
                    <CardTitle>Your Zakat Calculation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center space-y-6">
                        <div>
                            <p className="text-lg mb-2">Your Annual Zakat Amount:</p>
                            <p className="text-4xl font-bold text-primary">
                                {formatCurrency(amount)}
                            </p>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>
                                This amount represents 2.5% of your net worth above the Nisab threshold. Nisab is {formatCurrency(netWorth)}
                            </p>
                            <p>
                                The Nisab is the minimum amount of wealth a Muslim must possess before being obligated to pay Zakat.
                            </p>
                            <br />
                            <em>
                                Please note that this is a simplified calculation and may not reflect the exact requirements of Islamic law, please consult a scholar for more information.
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
                </CardContent>
            </Card>
        </motion.div>
    );
} 