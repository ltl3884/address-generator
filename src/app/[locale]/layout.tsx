import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import StructuredData from '@/components/StructuredData';
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  
  return {
    title: {
      default: messages.common.title,
      template: `%s | ${messages.header?.title || 'Address Generator'}`
    },
    description: messages.common.description,
    keywords: messages.common.keywords || 'address generator, virtual address, fake address, random address, testing address',
    authors: [{ name: 'Address Generator' }],
    creator: 'Address Generator',
    publisher: 'Address Generator',
    category: 'Technology',
    classification: 'Tools',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `https://address-generator.xyz/${locale}`,
      languages: {
        'zh': 'https://address-generator.xyz/zh',
        'en': 'https://address-generator.xyz/en',
        'x-default': 'https://address-generator.xyz/zh'
      }
    },
    openGraph: {
      title: messages.common.title,
      description: messages.common.description,
      url: `https://address-generator.xyz/${locale}`,
      siteName: messages.header?.title || 'Address Generator',
      locale: locale,
      type: 'website',
      images: [
        {
          url: 'https://address-generator.xyz/og-image.png',
          width: 1200,
          height: 630,
          alt: messages.common.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.common.title,
      description: messages.common.description,
      creator: '@addressgen',
      images: ['https://address-generator.xyz/twitter-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // 步骤1: 访问 https://search.google.com/search-console/settings/ownership
      // 步骤2: 点击"添加验证方法" → 选择"HTML标签"
      // 步骤3: 复制 content="..." 中的验证码粘贴到下面
      // 例如：google: 'abcdefghijklmnopqrstuvwxyz1234567890'
      google: 'your-google-verification-code-here',
      yandex: 'your-yandex-verification-code-here',
      yahoo: 'your-yahoo-verification-code-here',
    },
    other: {
      'msapplication-TileColor': '#2563eb',
      'theme-color': '#2563eb',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6282640794621676" crossOrigin="anonymous"></script>
      </head>
      <body className="antialiased">
        <StructuredData 
          type="website"
          title={messages.common.title}
          description={messages.common.description}
          url={`https://address-generator.xyz/${locale}`}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}