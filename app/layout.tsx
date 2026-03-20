import type { Metadata } from "next";
import "./globals.css";
import { sfUIDisplay } from "./fonts";
import { ThemeProvider } from "@/context/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

const BASE_URL = "https://ceccenter.com.vn";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: [
      { url: "/images/cec-logo.png", type: "image/png", sizes: "32x32" },
      { url: "/images/cec-logo.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/images/cec-logo.png",
    apple: [{ url: "/images/cec-logo.png", sizes: "180x180", type: "image/png" }],
  },
  title: {
    default: "CEC Center – LAS-XD 449 | Trung Tâm Tư Vấn Kiểm Định Kỹ Thuật Công Trình",
    template: "%s | CEC Center",
  },
  description:
    "Trung Tâm Tư Vấn Kiểm Định Kỹ Thuật Công Trình (CEC Center) – Phòng thí nghiệm LAS-XD 449, chứng nhận ISO/IEC 17025:2017. Dịch vụ tư vấn, kiểm định, thí nghiệm và giám sát chất lượng công trình tại TP.HCM.",
  keywords: [
    "kiểm định kỹ thuật công trình",
    "tư vấn xây dựng",
    "phòng thí nghiệm LAS-XD 449",
    "ISO/IEC 17025",
    "CEC Center",
    "giám sát chất lượng công trình",
    "thí nghiệm vật liệu xây dựng",
    "TP.HCM",
    "xây dựng",
  ],
  authors: [{ name: "CEC Center" }],
  creator: "CEC Center",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: BASE_URL,
    siteName: "CEC Center",
    title: "CEC Center – LAS-XD 449 | Trung Tâm Tư Vấn Kiểm Định Kỹ Thuật Công Trình",
    description:
      "Trung Tâm Tư Vấn Kiểm Định Kỹ Thuật Công Trình (CEC Center) – Phòng thí nghiệm LAS-XD 449, chứng nhận ISO/IEC 17025:2017. Dịch vụ tư vấn, kiểm định, thí nghiệm và giám sát chất lượng công trình tại TP.HCM.",
    images: [
      {
        url: "/images/cec.svg",
        width: 1200,
        height: 630,
        alt: "CEC Center – Trung Tâm Tư Vấn Kiểm Định Kỹ Thuật Công Trình",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CEC Center – LAS-XD 449 | Trung Tâm Tư Vấn Kiểm Định Kỹ Thuật Công Trình",
    description:
      "Trung Tâm Tư Vấn Kiểm Định Kỹ Thuật Công Trình (CEC Center) – Phòng thí nghiệm LAS-XD 449, chứng nhận ISO/IEC 17025:2017.",
    images: ["/images/cec.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
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
