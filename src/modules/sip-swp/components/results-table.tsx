"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { CalculationResult, CalculationResults } from "../lib/types";
import { formatCurrency } from "@/lib/currency-config";

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

interface ResultsTableProps {
    results: CalculationResults;
    currency: string;
    swpStartYear: number;
}

export function ResultsTable({ results, swpStartYear, currency }: ResultsTableProps): JSX.Element {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Portfolio Value</TableHead>
                    <TableHead>Monthly Flow</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {results.map((result: CalculationResult) => (
                    <TableRow key={`${result.year}-${result.month}`}>
                        <TableCell>{result.year}</TableCell>
                        <TableCell>{MONTHS[result.month - 1]}</TableCell>
                        <TableCell>{currency} {formatCurrency(result.total, currency)}</TableCell>
                        <TableCell className={result.year >= swpStartYear ? "text-red-500" : "text-green-500"}>
                            {result.year >= swpStartYear ? `-${currency} ${formatCurrency(result.contribution, currency)}` : `${currency} ${formatCurrency(result.contribution, currency)}`}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
} 