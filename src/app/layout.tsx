import type { Metadata } from "next";
import { LANGUAGE_STORAGE_KEY } from "@/data/localization";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Icebreaker Cards",
  description: "Pick a deck. Draw a card. Start a better conversation.",
};

const languageBootScript = `(function(){try{var s=localStorage.getItem("${LANGUAGE_STORAGE_KEY}");var l=(s==="en"||s==="zh-CN")?s:(navigator.language&&navigator.language.toLowerCase().indexOf("zh")===0?"zh-CN":"en");document.documentElement.lang=l;if(l==="zh-CN"){document.documentElement.setAttribute("data-lang-pending","1");setTimeout(function(){document.documentElement.removeAttribute("data-lang-pending");},400);}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
