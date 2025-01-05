"use client"

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { CalculatorInputs } from "../../lib/types";
import { NumericInput } from "../numeric-input";

interface SIPInputsProps {
    currency: string;
    onNext: () => void;
}

export function SIPInputs({ currency, onNext }: SIPInputsProps): JSX.Element {
    const { control, trigger, watch } = useFormContext<CalculatorInputs>();

    const monthlyContribution = watch("monthlyContribution");
    const annualInterestRate = watch("annualInterestRate");
    const hasRequiredFields = monthlyContribution > 0 && annualInterestRate >= 0;

    const handleNext = async (): Promise<void> => {
        const isValid = await trigger(["monthlyContribution", "annualInterestRate", "sipAnnualIncrease"]);
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
                    name="initialInvestment"
                    label={`Initial Investment (${currency})`}
                    control={control}
                    placeholder="Enter initial amount (optional)"
                />
                <NumericInput
                    name="monthlyContribution"
                    label={`Monthly SIP Amount (${currency})*`}
                    control={control}
                    placeholder="Enter monthly investment"
                />
                <NumericInput
                    name="annualInterestRate"
                    label="Expected Annual Return (%)"
                    control={control}
                    placeholder="Enter expected return (e.g., 12)"
                />
                <NumericInput
                    name="sipAnnualIncrease"
                    label="SIP Annual Increase (%)"
                    control={control}
                    placeholder="Default: 5%"
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