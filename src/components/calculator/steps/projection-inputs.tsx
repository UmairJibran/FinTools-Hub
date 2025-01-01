"use client"

import { motion } from "framer-motion";
import { NumericInput } from "../numeric-input";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CalculatorInputs } from "@/lib/types";

interface ProjectionInputsProps {
    isCalculating: boolean;
    onSubmit: (data: CalculatorInputs) => Promise<void>;
}

export function ProjectionInputs({ isCalculating, onSubmit }: ProjectionInputsProps) {
    const { control, handleSubmit, watch } = useFormContext<CalculatorInputs>();
    
    const projectionYears = watch("projectionYears");
    const hasRequiredFields = projectionYears > 0;

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
                    placeholder="e.g., 60"
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