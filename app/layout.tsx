import type { Metadata } from "next";
import "./globals.css";
import { sfUIDisplay } from "./fonts";
import { ThemeProvider } from "@/context/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "CEC Center – LAS XD 449 | Trung Tâm Tư Vấn Kiểm Định Kỹ Thuật Công Trình",
  description:
    "Trung Tâm Tư Vấn Kiểm Định Kỹ Thuật Công Trình (CEC Center) – Phòng thí nghiệm LAS-XD 449, chứng nhận ISO/IEC 17025:2017. Dịch vụ tư vấn, kiểm định, thí nghiệm và giám sát chất lượng công trình tại TP.HCM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${sfUIDisplay.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
