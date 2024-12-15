import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="flex justify-center items-center min-h-screen bg-gray-100">
        {children}
        {/* Fixed Footer */}
        <div className="fixed bottom-0 w-full max-w-md bg-blue-600 text-white text-center p-4">
          <p>© 2024 My App. All rights reserved.</p>
        </div>
      </body>
    </html>
  );
}
