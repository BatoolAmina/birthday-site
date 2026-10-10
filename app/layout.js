import "./globals.css";
import { Fraunces, Manrope, Amiri } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const arabic = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-arabic", display: "swap" });

export const metadata = {
  title: "Happy Birthday 🎂",
  description: "A little surprise, made with love.",
};
export const viewport = { themeColor: "#0b0716" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${arabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
