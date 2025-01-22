"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";

import { CurrencySelector } from "@/modules/sip-swp/components/steps/currency-selector";
import { SupportedCurrency } from "@/modules/sip-swp/lib/types";
import { AssetsInputs } from "@/modules/zakat/components/steps/assets-inputs";
import { LiabilitiesInputs } from "@/modules/zakat/components/steps/liabilities-inputs";
import { NisabCalculator } from "@/modules/zakat/components/steps/nisab-calculator";
import { ZakatResults } from "@/modules/zakat/components/steps/zakat-results";

type Step = "nisab" | "currency" | "assets" | "liabilities" | "results";

const formSchema = z.object({
    currency: z.enum(["PKR", "USD", "GBP", "EUR", "INR"] as const),
    cashInHand: z.coerce.number().default(0),
    bankBalance: z.coerce.number().default(0),
    goldValue: z.coerce.number().default(0),
    silverValue: z.coerce.number().default(0),
    investments: z.coerce.number().default(0),
    propertyValue: z.coerce.number().default(0),
    businessAssets: z.coerce.number().default(0),
    otherAssets: z.coerce.number().default(0),
    debts: z.coerce.number().default(0),
    debtOwed: z.coerce.number().default(0),
});

type ZakatInputs = z.infer<typeof formSchema>;

export function ZakatCalculator(): React.ReactNode {
    const [step, setStep] = useState<Step>("currency");
    const [zakatAmount, setZakatAmount] = useState<number | null>(null);
    const [nisabThreshold, setNisabThreshold] = useState<number>(0);
    const [netWorth, setNetWorth] = useState<number | null>(null);

    const methods = useForm<ZakatInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currency: "PKR",
            cashInHand: 0,
            bankBalance: 0,
            goldValue: 0,
            silverValue: 0,
            investments: 0,
            propertyValue: 0,
            businessAssets: 0,
            otherAssets: 0,
            debts: 0,
            debtOwed: 0,
        },
        mode: "onChange"
    });

    const handleCurrencySelect = (currency: SupportedCurrency): void => {
        methods.setValue("currency", currency);
        setStep("nisab");
    };

    function calculateZakat(values: unknown): void {
        const typedValues = values as ZakatInputs;
        const totalAssets =
            typedValues.cashInHand +
            typedValues.bankBalance +
            typedValues.goldValue +
            typedValues.silverValue +
            typedValues.investments +
            typedValues.propertyValue +
            typedValues.businessAssets +
            typedValues.debtOwed +
            typedValues.otherAssets;

        const netWorth = totalAssets - typedValues.debts;

        if (netWorth >= nisabThreshold) {
            // Zakat is 2.5% of net worth
            const zakat = netWorth * 0.025;
            setZakatAmount(zakat);
        } else {
            setZakatAmount(0);
        }
        setNetWorth(netWorth);
        setStep("results");
    }

    return (
        <div className="container py-10">
            <FormProvider {...methods}>
                <AnimatePresence mode="wait">
                    <div className={step === "results" ? "max-w-full px-4" : "max-w-4xl mx-auto"}>
                        {step === "currency" && (
                            <CurrencySelector onSelect={handleCurrencySelect} />
                        )}
                        {step === 'nisab' && (<NisabCalculator
                            setNisabThreshold={setNisabThreshold}
                            currency={methods.watch("currency")}
                            onNext={() => setStep("assets")}
                        />)}
                        {step === "assets" && (
                            <AssetsInputs
                                currency={methods.watch("currency")}
                                onNext={() => setStep("liabilities")}
                            />
                        )}
                        {step === "liabilities" && (
                            <LiabilitiesInputs
                                currency={methods.watch("currency")}
                                onSubmit={calculateZakat}
                            />
                        )}
                        {step === "results" && zakatAmount !== null && (
                            <ZakatResults
                                amount={zakatAmount}
                                netWorth={netWorth || 0}
                                currency={methods.watch("currency")}
                                onEdit={() => setStep("assets")}
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