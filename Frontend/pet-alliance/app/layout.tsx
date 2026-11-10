import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const vietnam = Be_Vietnam_Pro({
  variable: "--font-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "PetAlliance - Find Your Perfect Companion",
  description:
    "Adopt a pet and give them a loving home with PetAlliance. Browse available pets.",
};

const themeScript = `
  try{
  var t = localStorage.getItem('theme');
  if(!t)
    t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
  } catch(e) {
    console.error('Error setting theme:', e);
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${vietnam.variable}`}   suppressHydrationWarning>
      
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      
      <body>{children}</body>
    </html>
  );
}