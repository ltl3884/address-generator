'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Create the new path with the new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {locale === 'zh' ? '语言:' : 'Language:'}
      </span>
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {routing.locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLanguageChange(loc)}
            className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
              locale === loc
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {loc === 'zh' ? '中文' : 'English'}
          </button>
        ))}
      </div>
    </div>
  );
}