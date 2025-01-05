"use client"

import { motion } from "framer-motion";

import { SupportedCurrency } from "../../lib/types";

const CURRENCY_INFO = {
    PKR: { symbol: "₨", name: "Pakistani Rupee" },
    USD: { symbol: "$", name: "US Dollar" },
    INR: { symbol: "₹", name: "Indian Rupee" },
    EUR: { symbol: "€", name: "Euro" },
    GBP: { symbol: "£", name: "British Pound" }
};

interface CurrencySelectorProps {
    onSelect: (currency: SupportedCurrency) => void;
}

export function CurrencySelector({ onSelect }: CurrencySelectorProps): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
            {Object.entries(CURRENCY_INFO).map(([code, info]) => (
                <motion.button
                    key={code}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(code as SupportedCurrency)}
                    className="flex flex-col items-center justify-center p-8 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
                >
                    <span className="text-4xl font-bold">{info.symbol}</span>
                    <span className="mt-2 text-sm text-muted-foreground">{info.name}</span>
                </motion.button>
            ))}
        </motion.div>
    );
} 