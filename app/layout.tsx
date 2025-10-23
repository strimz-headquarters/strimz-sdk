import "@/styles/globals.css";
import { getMetadata } from "@/utils/getMetadata";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from 'sonner';

export const metadata = getMetadata({
  title: "Strimz Subscriptions and Payments Gateway",
  description: "Strimz Subscriptions is a DeFi utility that automates crypto payments for Web2 subscriptions and services via Strimz SDK, enabling seamless, secure, and efficient management of recurring payments with fiat.",
})

/**
 * The root layout component for the app.
 *
 * This component renders the basic HTML structure for the app, including the
 * `<html>` and `<body>` elements, as well as the React Query provider and a
 * toaster component.
 *
 * @param {React.ReactNode} children - The content to be rendered within the
 *   root layout.
 * @returns {JSX.Element} The rendered root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="w-full min-h-screen antialiased bg-[#FFFFFF]"
      >
        <ReactQueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
