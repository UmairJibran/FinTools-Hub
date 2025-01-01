export type SupportedCurrency = "PKR" | "USD" | "INR" | "EUR" | "GBP";

export interface CalculatorInputs {
    initialInvestment: number;
    monthlyContribution: number;
    annualInterestRate: number;
    swpStartYear: number;
    monthlyWithdrawal: number;
    projectionYears: number;
    swpAnnualIncrease: number;
    sipAnnualIncrease: number;
    currency: SupportedCurrency;
}

export interface CalculationResult {
    year: number;
    month: number;
    total: string;
    contribution: string;
}

export type CalculationResults = CalculationResult[]; 