"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface NisabCalculatorProps {
    setNisabThreshold: (value: number) => void;
    currency: string;
    onNext: () => void;
}

type CalculationMethod = "direct" | "gold" | "silver";

const GOLD_NISAB_GRAMS = 87.48; // 7.5 tola = 87.48 grams
const SILVER_NISAB_GRAMS = 612.36; // 52.5 tola = 612.36 grams

export function NisabCalculator({ setNisabThreshold, currency, onNext }: NisabCalculatorProps): React.ReactNode {
    const [method, setMethod] = useState<CalculationMethod>("direct");
    const [goldRate, setGoldRate] = useState<number>(0);
    const [silverRate, setSilverRate] = useState<number>(0);
    const [directNisab, setDirectNisab] = useState<number>(0);

    const calculateNisab = (): void => {
        let nisabValue = 0;
        
        switch (method) {
            case "gold":
                nisabValue = GOLD_NISAB_GRAMS * goldRate;
                break;
            case "silver":
                nisabValue = SILVER_NISAB_GRAMS * silverRate;
                break;
            case "direct":
                nisabValue = directNisab;
                break;
        }

        setNisabThreshold(nisabValue);
        onNext();
    };

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const handleMethodChange = (value: string): void => {
        setMethod(value as CalculationMethod);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Calculate Nisab Threshold</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Nisab is the minimum amount of wealth a Muslim must possess before being obligated to pay Zakat.
                            You can either enter the Nisab value directly or calculate it based on current gold or silver rates.
                        </p>

                        <RadioGroup
                            defaultValue="direct"
                            onValueChange={handleMethodChange}
                            className="space-y-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="direct" id="direct" />
                                <Label htmlFor="direct">Enter Nisab value directly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="gold" id="gold" />
                                <Label htmlFor="gold">Calculate based on gold rate ({GOLD_NISAB_GRAMS}g)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="silver" id="silver" />
                                <Label htmlFor="silver">Calculate based on silver rate ({SILVER_NISAB_GRAMS}g)</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        {method === "direct" && (
                            <div>
                                <Label>Nisab Value ({currency})</Label>
                                <Input
                                    type="number"
                                    placeholder={`Enter Nisab value in ${currency}`}
                                    onChange={(e) => setDirectNisab(Number(e.target.value))}
                                />
                            </div>
                        )}

                        {method === "gold" && (
                            <div>
                                <Label>Gold Rate per gram ({currency})</Label>
                                <Input
                                    type="number"
                                    placeholder={`Enter gold rate per gram in ${currency}`}
                                    onChange={(e) => setGoldRate(Number(e.target.value))}
                                />
                                {goldRate > 0 && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Calculated Nisab: {formatCurrency(GOLD_NISAB_GRAMS * goldRate)}
                                    </p>
                                )}
                            </div>
                        )}

                        {method === "silver" && (
                            <div>
                                <Label>Silver Rate per gram ({currency})</Label>
                                <Input
                                    type="number"
                                    placeholder={`Enter silver rate per gram in ${currency}`}
                                    onChange={(e) => setSilverRate(Number(e.target.value))}
                                />
                                {silverRate > 0 && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Calculated Nisab: {formatCurrency(SILVER_NISAB_GRAMS * silverRate)}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={calculateNisab}
                        className="w-full"
                        disabled={
                            (method === "direct" && directNisab <= 0) ||
                            (method === "gold" && goldRate <= 0) ||
                            (method === "silver" && silverRate <= 0)
                        }
                    >
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
} 