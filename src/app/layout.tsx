import type { Metadata } from "next";

// Minimal layout for App Router API routes
// Note: Frontend CSS is imported in src/pages/_app.tsx for Pages Router
// This layout is only for app/api/ routes and doesn't need CSS/fonts

export const metadata: Metadata = {
  title: "Vighnaharta Steel Industries API",
  description: "Backend API for Vighnaharta Steel Industries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
