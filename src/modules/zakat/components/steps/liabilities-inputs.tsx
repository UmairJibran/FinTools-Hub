"use client";

import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { NumericInput } from "@/modules/sip-swp/components/numeric-input";
import { CalculatorInputs } from "@/modules/sip-swp/lib/types";

interface LiabilitiesInputsProps {
    currency: string;
    onSubmit: (values: unknown) => void;
}

export function LiabilitiesInputs({ currency, onSubmit }: LiabilitiesInputsProps): React.ReactNode {
    const { control, handleSubmit, } = useFormContext<CalculatorInputs>();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <NumericInput
                    showZero
                    name="debts"
                    label={`Total Debts Owed By You to Others(${currency})`}
                    control={control}
                    placeholder="0.00"
                />
                <Button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full"
                >
                    Calculate Zakat
                </Button>
            </form>
        </motion.div>
    );
}