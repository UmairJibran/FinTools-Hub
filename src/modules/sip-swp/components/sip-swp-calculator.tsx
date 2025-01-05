"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { ResultsView } from "./results/results-view";
import { CurrencySelector } from "./steps/currency-selector";
import { ProjectionInputs } from "./steps/projection-inputs";
import { SIPInputs } from "./steps/sip-inputs";
import { SWPInputs } from "./steps/swp-inputs";
import { useCalculator } from "../hooks/use-calculator";
import { calculatorSchema } from "../lib/schemas";
import { CalculatorInputs, SupportedCurrency } from "../lib/types";

type Step = "currency" | "sip" | "swp" | "projection" | "results";

export function SIPSWPCalculator(): JSX.Element {
    const [step, setStep] = useState<Step>("currency");
    const { isCalculating, results, calculate } = useCalculator();
    const methods = useForm<CalculatorInputs>({
        resolver: zodResolver(calculatorSchema),
        defaultValues: {
            initialInvestment: 0,
            monthlyContribution: 0,
            annualInterestRate: 0,
            swpStartYear: 25,
            monthlyWithdrawal: 0,
            projectionYears: 0,
            sipAnnualIncrease: 5,
            swpAnnualIncrease: 5,
            currency: "PKR"
        },
        mode: "onChange"
    });

    const handleCurrencySelect = (currency: SupportedCurrency): void => {
        methods.setValue("currency", currency);
        setStep("sip");
    };

    const handleCalculate = async (data: CalculatorInputs): Promise<void> => {
        await calculate(data);
        setStep("results");
    };

    return (
        <div className="container py-10">
            <FormProvider {...methods}>
                <AnimatePresence mode="wait">
                    <div className={step === "results" ? "max-w-full px-4" : "max-w-4xl mx-auto"}>
                        {step === "currency" && (
                            <CurrencySelector onSelect={handleCurrencySelect} />
                        )}
                        {step === "sip" && (
                            <SIPInputs 
                                currency={methods.watch("currency")}
                                onNext={() => setStep("swp")}
                            />
                        )}
                        {step === "swp" && (
                            <SWPInputs 
                                currency={methods.watch("currency")}
                                onNext={() => setStep("projection")}
                            />
                        )}
                        {step === "projection" && (
                            <ProjectionInputs 
                                isCalculating={isCalculating}
                                onSubmit={handleCalculate}
                            />
                        )}
                        {step === "results" && results && (
                            <ResultsView
                                results={results}
                                swpStartYear={methods.watch("swpStartYear")}
                                currency={methods.watch("currency")}
                                onEdit={() => setStep("sip")}
                                onReset={() => {
                                    methods.reset();
                                    setStep("currency");
                                }}
                            />
                        )}
                    </div>
                </AnimatePresence>
            </FormProvider>
        </div>
    );
} 