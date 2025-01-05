"use client"

import { Control, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { CalculatorInputs } from "../lib/types";

interface NumericInputProps {
    name: string;
    label: string;
    control: Control<CalculatorInputs>;
    placeholder?: string;
    showZero?: boolean;
}

export function NumericInput({ name, label, control, placeholder, showZero = false }: NumericInputProps): JSX.Element {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <Controller
                name={name as keyof CalculatorInputs}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <div>
                        <Input
                            {...field}
                            type="number"
                            placeholder={placeholder}
                            value={field.value === 0 && !showZero ? '' : field.value}
                            onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === '' ? 0 : Number(value));
                            }}
                            min={0}
                            step="any"
                            className={`${error ? "border-red-500" : ""} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                        />
                        {error && (
                            <p className="text-sm text-red-500 mt-1">{error.message}</p>
                        )}
                    </div>
                )}
            />
        </div>
    );
} 