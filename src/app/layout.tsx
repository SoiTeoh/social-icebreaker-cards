import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Icebreaker Cards",
  description: "Pick a deck. Draw a card. Start a better conversation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
