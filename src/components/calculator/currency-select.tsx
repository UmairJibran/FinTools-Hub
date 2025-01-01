"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { CalculatorInputs } from "@/lib/types";

interface CurrencySelectProps {
    control: Control<CalculatorInputs>;
}

export function CurrencySelect({ control }: CurrencySelectProps) {
    return (
        <FormField
            control={control}
            name="currency"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                        <select
                            {...field}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="PKR">Pakistani Rupee (PKR)</option>
                            <option value="USD">US Dollar (USD)</option>
                            <option value="INR">Indian Rupee (INR)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="GBP">British Pound (GBP)</option>
                        </select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
} 