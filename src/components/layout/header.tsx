"use client"

import { Github } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";

export function Header(): JSX.Element {
    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex gap-6 items-center">
                    <Link href="/" className="text-xl font-bold">
                        FinHub
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link href="/calculators" className="text-sm font-medium">
                            Calculators
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="https://github.com/UmairJibran/FinTools-Hub" target="_blank">
                            <Github className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
} 