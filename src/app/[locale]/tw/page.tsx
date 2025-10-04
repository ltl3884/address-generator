import type { Metadata } from "next";
import { generatePageMetadata } from '@/lib/metadata';
import AddressGenerator from '@/components/AddressGenerator';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, 'tw');
}

export default function TWAddressPage() {
  return <AddressGenerator />;
}