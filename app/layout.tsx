import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Agent Passport — Every agent deserves a passport", description: "Identity, a global account, cards and a phone number for your AI agent. One balance, within limits you set." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
