import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'terms' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function TermsOfUsePage() {
  const t = useTranslations('terms');
  const tFooter = useTranslations('footer');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-accent-light dark:from-primary-dark dark:via-secondary-dark dark:to-accent-dark">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
        >
          ← {t('back_to_home')}
        </Link>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            {tFooter('terms_of_use')}
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            {t('last_updated')}: 2025年1月1日
          </p>
        </div>

        {/* Content */}
        <div className="bg-surface-light dark:glass-morphism p-8 rounded-lg shadow-card dark:shadow-glass border border-border-light dark:border-border-glass backdrop-blur-glass">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('acceptance.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('acceptance.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('service_description.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-4">
                {t('service_description.content')}
              </p>
              <ul className="list-disc list-inside text-text-secondary-light dark:text-text-secondary-dark space-y-2">
                <li>{t('service_description.features.address_generation')}</li>
                <li>{t('service_description.features.multiple_countries')}</li>
                <li>{t('service_description.features.save_addresses')}</li>
                <li>{t('service_description.features.free_service')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('acceptable_use.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-4">
                {t('acceptable_use.content')}
              </p>
              <ul className="list-disc list-inside text-text-secondary-light dark:text-text-secondary-dark space-y-2">
                <li>{t('acceptable_use.allowed.testing')}</li>
                <li>{t('acceptable_use.allowed.development')}</li>
                <li>{t('acceptable_use.allowed.education')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('prohibited_use.title')}
              </h2>
              <ul className="list-disc list-inside text-text-secondary-light dark:text-text-secondary-dark space-y-2">
                <li>{t('prohibited_use.items.fraud')}</li>
                <li>{t('prohibited_use.items.illegal_activities')}</li>
                <li>{t('prohibited_use.items.identity_theft')}</li>
                <li>{t('prohibited_use.items.commercial_misuse')}</li>
                <li>{t('prohibited_use.items.system_abuse')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('disclaimer.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('disclaimer.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('limitation_liability.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('limitation_liability.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('changes.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('changes.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('contact.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('contact.content')}
              </p>
            </section>

          </div>
        </div>


      </div>
    </div>
  );
}