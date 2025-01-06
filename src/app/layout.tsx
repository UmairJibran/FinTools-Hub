import { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FinHub - Financial Calculators & Tools",
    description: "A collection of financial calculators and tools to help you make better financial decisions.",
};

// Add the script to head using Next.js config
export const viewport = {
    themeColor: 'light dark',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en">
            <head>
                <script
                    defer
                    src="https://cloud.umami.is/script.js"
                    data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
                />
            </head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
} 