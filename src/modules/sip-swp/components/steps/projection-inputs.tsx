"use client"

import { motion } from "framer-motion";
import { Loader2, TrendingUp } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { CalculatorInputs } from "../../lib/types";
import { NumericInput } from "../numeric-input";

interface ProjectionInputsProps {
    isCalculating: boolean;
    onSubmit: (data: CalculatorInputs) => Promise<void>;
}

export function ProjectionInputs({ isCalculating, onSubmit }: ProjectionInputsProps): JSX.Element {
    const { control, handleSubmit, watch } = useFormContext<CalculatorInputs>();
    
    const projectionYears = watch("projectionYears");

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="space-y-4">
                <NumericInput
                    name="projectionYears"
                    label="Projection Years*"
                    control={control}
                    placeholder="e.g., 30 years"
                />
            </div>
            <Button 
                onClick={handleSubmit(onSubmit)} 
                className="w-full"
                disabled={isCalculating || !projectionYears}
            >
                {isCalculating ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating
                    </>
                ) : (
                    <>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Calculate
                    </>
                )}
            </Button>
        </motion.div>
    );
}