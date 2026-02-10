import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacy');
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
            {tFooter('privacy_policy')}
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
                {t('introduction.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('introduction.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('information_collection.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-4">
                {t('information_collection.content')}
              </p>
              <h3 className="text-xl font-medium mb-3 text-text-primary-light dark:text-text-primary-dark">
                {t('information_collection.automatically_collected.title')}
              </h3>
              <ul className="list-disc list-inside text-text-secondary-light dark:text-text-secondary-dark space-y-2 mb-4">
                <li>{t('information_collection.automatically_collected.ip_address')}</li>
                <li>{t('information_collection.automatically_collected.browser_info')}</li>
                <li>{t('information_collection.automatically_collected.usage_data')}</li>
                <li>{t('information_collection.automatically_collected.cookies')}</li>
              </ul>
              <h3 className="text-xl font-medium mb-3 text-text-primary-light dark:text-text-primary-dark">
                {t('information_collection.user_provided.title')}
              </h3>
              <ul className="list-disc list-inside text-text-secondary-light dark:text-text-secondary-dark space-y-2">
                <li>{t('information_collection.user_provided.saved_addresses')}</li>
                <li>{t('information_collection.user_provided.preferences')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('information_use.title')}
              </h2>
              <ul className="list-disc list-inside text-text-secondary-light dark:text-text-secondary-dark space-y-2">
                <li>{t('information_use.items.provide_service')}</li>
                <li>{t('information_use.items.improve_service')}</li>
                <li>{t('information_use.items.analytics')}</li>
                <li>{t('information_use.items.security')}</li>
                <li>{t('information_use.items.legal_compliance')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('information_sharing.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-4">
                {t('information_sharing.content')}
              </p>
              <ul className="list-disc list-inside text-text-secondary-light dark:text-text-secondary-dark space-y-2">
                <li>{t('information_sharing.exceptions.legal_requirements')}</li>
                <li>{t('information_sharing.exceptions.service_providers')}</li>
                <li>{t('information_sharing.exceptions.business_transfer')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('data_storage.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('data_storage.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('user_rights.title')}
              </h2>
              <ul className="list-disc list-inside text-text-secondary-light dark:text-text-secondary-dark space-y-2">
                <li>{t('user_rights.items.access')}</li>
                <li>{t('user_rights.items.correction')}</li>
                <li>{t('user_rights.items.deletion')}</li>
                <li>{t('user_rights.items.portability')}</li>
                <li>{t('user_rights.items.opt_out')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('security.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('security.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                {t('children_privacy.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('children_privacy.content')}
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