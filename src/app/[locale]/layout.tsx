import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
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
    title: messages.common.title,
    description: messages.common.description,
    keywords: messages.common.keywords || 'address generator, virtual address, fake address, random address, testing address',
    authors: [{ name: 'Address Generator' }],
    creator: 'Address Generator',
    publisher: 'Address Generator',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: messages.common.title,
      description: messages.common.description,
      url: `https://address-generator.com/${locale}`,
      siteName: messages.header?.title || 'Address Generator',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.common.title,
      description: messages.common.description,
      creator: '@addressgen',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification-code',
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
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}