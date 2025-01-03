"use client"

import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex gap-6 items-center">
                    <Link href="/" className="text-xl font-bold">
                        FinTools Hub
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/calculators" className="text-sm font-medium">
                            Calculators
                        </Link>
                        <Link href="/tools" className="text-sm font-medium">
                            Tools
                        </Link>
                        <Link href="/blog" className="text-sm font-medium">
                            Blog
                        </Link>
                        <Link href="/resources" className="text-sm font-medium">
                            Resources
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