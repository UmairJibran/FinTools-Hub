"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, TrendingUp } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { CurrencySelect } from "./currency-select";
import { NumericInput } from "./numeric-input";
import { calculatorSchema } from "../lib/schemas";
import { CalculatorInputs } from "../lib/types";

interface CalculatorFormProps {
    onCalculate: (values: CalculatorInputs) => Promise<void>;
    isCalculating: boolean;
    onSwpYearChange: (year: number) => void;
    onCurrencyChange: (currency: string) => void;
}

export function CalculatorForm({ onCalculate, isCalculating, onSwpYearChange, onCurrencyChange }: CalculatorFormProps): JSX.Element {
    const form = useForm<CalculatorInputs>({
        resolver: zodResolver(calculatorSchema),
        defaultValues: {
            initialInvestment: 0,
            monthlyContribution: undefined,
            annualInterestRate: undefined,
            swpStartYear: undefined,
            monthlyWithdrawal: undefined,
            projectionYears: undefined,
            swpAnnualIncrease: 5,
            currency: "PKR"
        },
    });

    const swpStartYear = form.watch("swpStartYear");
    const currency = form.watch("currency");

    React.useEffect(() => {
        onSwpYearChange(swpStartYear);
    }, [swpStartYear, onSwpYearChange]);

    React.useEffect(() => {
        onCurrencyChange(currency);
    }, [currency, onCurrencyChange]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NumericInput
                        name="initialInvestment"
                        label={`Initial Investment (${form.watch("currency")})`}
                        control={form.control}
                    />
                    <NumericInput
                        name="monthlyContribution"
                        label={`Monthly SIP Amount (${form.watch("currency")})`}
                        control={form.control}
                        placeholder="Enter monthly SIP amount"
                    />
                    <NumericInput
                        name="annualInterestRate"
                        label="Expected Annual Return (%)"
                        control={form.control}
                        placeholder="Enter expected return"
                    />
                    <NumericInput
                        name="swpStartYear"
                        label="SWP Start Year"
                        control={form.control}
                        placeholder="e.g., 25"
                    />
                    <NumericInput
                        name="monthlyWithdrawal"
                        label={`Monthly Withdrawal Amount (${form.watch("currency")})`}
                        control={form.control}
                        placeholder="Enter monthly withdrawal"
                    />
                    <NumericInput
                        name="projectionYears"
                        label="Projection Years"
                        control={form.control}
                        placeholder="e.g., 60"
                    />
                    <NumericInput
                        name="swpAnnualIncrease"
                        label="SWP Annual Increase (%)"
                        control={form.control}
                    />
                    <CurrencySelect control={form.control} />
                </div>
                <Button type="submit" disabled={isCalculating}>
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
            </form>
            <input type="hidden" value={swpStartYear} onChange={() => { }} />
        </Form>
    );
} 