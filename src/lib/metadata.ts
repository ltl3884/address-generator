import type { Metadata } from "next";
import { getMessages } from 'next-intl/server';

export async function generatePageMetadata(
  locale: string,
  pageKey: string
): Promise<Metadata> {
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as Record<string, Record<string, string>>;
  const pageMetadata = metadata[pageKey] || metadata;
  
  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords,
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.title,
      description: pageMetadata.description,
    },
  };
}