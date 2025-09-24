import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "地址生成器 - Address Generator",
  description: "免费的美国地址生成器，支持生成真实的美国地址信息，包括姓名、街道、城市、州、邮编等信息。",
  keywords: "地址生成器, 美国地址, 地址生成, address generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
