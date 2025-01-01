export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="container py-20">
      <div className="max-w-2xl mx-auto text-center">
        {children}
      </div>
    </div>
  );
} 