"use client"

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { CalculatorInputs } from "../../lib/types";
import { NumericInput } from "../numeric-input";

interface SWPInputsProps {
    currency: string;
    onNext: () => void;
}

export function SWPInputs({ currency, onNext }: SWPInputsProps): JSX.Element {
    const { control, trigger, watch } = useFormContext<CalculatorInputs>();

    const swpStartYear = watch("swpStartYear");
    const monthlyWithdrawal = watch("monthlyWithdrawal");
    const hasRequiredFields = swpStartYear > 0 && monthlyWithdrawal > 0;

    const handleNext = async (): Promise<void> => {
        const isValid = await trigger(["swpStartYear", "monthlyWithdrawal"]);
        if (isValid) {
            onNext();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="space-y-4">
                <NumericInput
                    name="swpStartYear"
                    label="SWP Start Year*"
                    control={control}
                    placeholder="e.g., 25 years"
                />
                <NumericInput
                    name="monthlyWithdrawal"
                    label={`Monthly Withdrawal Amount (${currency})*`}
                    control={control}
                    placeholder="Enter monthly withdrawal"
                />
                <NumericInput
                    name="swpAnnualIncrease"
                    label="SWP Annual Increase (%)"
                    control={control}
                    placeholder="Default: 5%"
                    showZero={true}
                />
            </div>
            <Button 
                onClick={handleNext} 
                className="w-full"
                disabled={!hasRequiredFields}
            >
                Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </motion.div>
    );
} 