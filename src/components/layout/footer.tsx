export function Footer(): JSX.Element {
    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-sm text-muted-foreground">
                    Built by{" "}
                    <a
                        href="https://umairjibran.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Umair Jibran
                    </a>
                </p>
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} FinTools Hub. All rights reserved.
                </p>
            </div>
        </footer>
    );
} 