"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CalculationResults } from "@/lib/types";

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

interface ResultsTableProps {
    results: CalculationResults;
    currency: string;
    swpStartYear: number;
}

export function ResultsTable({ results, currency, swpStartYear }: ResultsTableProps) {
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
                {results.map((result) => (
                    <TableRow key={`${result.year}-${result.month}`}>
                        <TableCell>{result.year}</TableCell>
                        <TableCell>{MONTHS[result.month - 1]}</TableCell>
                        <TableCell>{result.total}</TableCell>
                        <TableCell className={result.year >= swpStartYear ? "text-red-500" : "text-green-500"}>
                            {result.year >= swpStartYear ? `-${result.contribution}` : result.contribution}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
} 