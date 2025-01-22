"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { NumericInput } from "@/modules/sip-swp/components/numeric-input";
import { CalculatorInputs } from "@/modules/sip-swp/lib/types";

interface AssetsInputsProps {
    currency: string;
    onNext: () => void;
}

export function AssetsInputs({ currency, onNext }: AssetsInputsProps): React.ReactNode {
    const { control } = useFormContext<CalculatorInputs>();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <NumericInput
                        showZero
                        name="cashInHand"
                        label={`Cash in Hand (${currency})`}
                        control={control}
                        placeholder="The amount of cash you have in hand"
                    />
                    <NumericInput
                        showZero
                        name="bankBalance"
                        label={`Bank Balance (${currency})`}
                        control={control}
                        placeholder="The amount of cash you have in your bank account"
                    />
                    <NumericInput
                        showZero
                        name="goldValue"
                        label={`Gold Value (${currency})`}
                        control={control}
                        placeholder="The value of your gold assets"
                    />

                    <NumericInput
                        showZero
                        name="silverValue"
                        label={`Silver Value (${currency})`}
                        control={control}
                        placeholder="The value of your silver assets"
                    />

                    <NumericInput
                        name="debtOwed"
                        label={`Debt Owed (${currency})`}
                        control={control}
                        placeholder="The value of debt owed by others to you"
                    />

                    <NumericInput
                        name="propertyValue"
                        label={`Property Value (${currency})`}
                        control={control}
                        placeholder="The value of your property assets"
                    />

                    <NumericInput
                        name="businessAssets"
                        label={`Business Assets (${currency})`}
                        control={control}
                        placeholder="The value of your business assets"
                    />

                    <NumericInput
                        name="investments"
                        label={`Investments (${currency})`}
                        control={control}
                        placeholder="Your investments (Stocks, Bonds, Mutual Funds, etc.)"
                    />

                </div>
                <div className="grid gap-4">
                    <NumericInput
                        name="otherAssets"
                        label={`Other Assets (${currency})`}
                        control={control}
                        placeholder="The value of your other assets"
                    />
                </div>
                <Button
                    onClick={onNext}
                    className="w-full"
                >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    );
} 