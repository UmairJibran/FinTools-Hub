import * as z from "zod";

export const calculatorSchema = z.object({
    initialInvestment: z.number().min(0, "Initial investment must be non-negative"),
    monthlyContribution: z.number().min(0, "Monthly SIP must be non-negative"),
    annualInterestRate: z.number().min(0).max(100, "Interest rate must be between 0 and 100"),
    swpStartYear: z.number().min(0, "SWP start year must be at least 1"),
    monthlyWithdrawal: z.number().min(0, "Monthly withdrawal must be non-negative"),
    projectionYears: z.number().min(0, "Projection years must be at least 1"),
    sipAnnualIncrease: z.number().min(0).max(100, "Annual increase must be between 0 and 100"),
    swpAnnualIncrease: z.number().min(0).max(100, "Annual increase must be between 0 and 100"),
    currency: z.enum(["PKR", "USD", "INR", "EUR", "GBP"])
}); 