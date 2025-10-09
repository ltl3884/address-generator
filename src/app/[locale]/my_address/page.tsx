'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface SavedAddress {
  id: string;
  fullName: string;
  gender: string;
  birthday: string;
  city: string;
  state: string;
  address: string;
  zipCode: string;
  telephone: string;
  fullAddress: string;
  country: string;
  createdAt: number;
}

export default function SavedAddresses() {
  // Translation hooks
  const tTheme = useTranslations('theme');
  const tAddress = useTranslations('address');
  const tSavedAddresses = useTranslations('saved_addresses');
  const tNavigation = useTranslations('navigation');
  const tFooter = useTranslations('footer');
  const tCsvHeaders = useTranslations('saved_addresses.csv_headers');

  const [isDark, setIsDark] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [copySuccess, setCopySuccess] = useState('');
  const [actionMessage, setActionMessage] = useState<{ show: boolean; text: string; type: 'error' | 'info' }>({ show: false, text: '', type: 'info' });

  // 主题设置效果
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for saved theme preference or default to system preference
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // 读取保存的地址
  useEffect(() => {
    const loadSavedAddresses = () => {
      try {
        const addresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
        setSavedAddresses(addresses);
      } catch (error) {
        console.error('读取保存的地址失败:', error);
        setSavedAddresses([]);
      }
    };

    loadSavedAddresses();
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (typeof window !== 'undefined') {
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  // 显示操作消息的函数
  const showActionMessage = (text: string, type: 'error' | 'info' = 'info') => {
    setActionMessage({ show: true, text, type });
    // 3秒后自动隐藏
    setTimeout(() => {
      setActionMessage(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleDeleteAddress = (id: string) => {
    try {
      const updatedAddresses = savedAddresses.filter(addr => addr.id !== id);
      setSavedAddresses(updatedAddresses);
      localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
      showActionMessage(tSavedAddresses('delete_success'), 'info');
    } catch (error) {
      console.error('删除地址失败:', error);
      showActionMessage(tSavedAddresses('delete_failed'), 'error');
    }
  };

  const handleClearAll = () => {
    try {
      setSavedAddresses([]);
      localStorage.setItem('savedAddresses', '[]');
      showActionMessage(tSavedAddresses('clear_success'), 'info');
    } catch (error) {
      console.error('清空地址失败:', error);
      showActionMessage(tSavedAddresses('clear_failed'), 'error');
    }
  };

  const handleCopyAddress = async (fullAddress: string, id: string) => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopySuccess(id);
      setTimeout(() => {
        setCopySuccess('');
      }, 2000);
    } catch (error) {
      console.error('复制失败:', error);
      // 降级方案：使用传统的复制方法
      const textArea = document.createElement('textarea');
      textArea.value = fullAddress;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess(id);
        setTimeout(() => {
          setCopySuccess('');
        }, 2000);
      } catch (fallbackError) {
        console.error('降级复制方法也失败:', fallbackError);
        showActionMessage(tSavedAddresses('manual_copy_message'), 'error');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleExportCSV = () => {
    try {
      if (savedAddresses.length === 0) {
        showActionMessage(tSavedAddresses('no_data_export'), 'error');
        return;
      }

      // CSV 头部
      const headers = [
        tCsvHeaders('name'),
        tCsvHeaders('gender'),
        tCsvHeaders('birthday'),
        tCsvHeaders('city'),
        tCsvHeaders('state'),
        tCsvHeaders('address'),
        tCsvHeaders('zipcode'),
        tCsvHeaders('telephone'),
        tCsvHeaders('full_address'),
        tCsvHeaders('country'),
        tCsvHeaders('created_time')
      ];

      // 转换数据为 CSV 格式
      const csvData = savedAddresses.map(address => [
        address.fullName,
        address.gender,
        address.birthday,
        address.city,
        address.state,
        address.address,
        address.zipCode,
        address.telephone,
        address.fullAddress,
        address.country,
        formatDate(address.createdAt)
      ]);

      // 组合头部和数据
      const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

      // 创建 Blob 对象
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // 创建下载链接
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `saved_addresses_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 清理 URL 对象
      URL.revokeObjectURL(url);
      
      showActionMessage(tSavedAddresses('export_success'), 'info');
    } catch (error) {
      console.error('导出失败:', error);
      showActionMessage(tSavedAddresses('export_failed'), 'error');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };

  return (
    <div className="bg-background-light dark:bg-glass-gradient font-sans text-text-light dark:text-text-dark min-h-screen dark:glass-background">
      <div className="container mx-auto p-4 max-w-7xl relative z-20">
        {/* Header */}
        <header className="flex justify-between items-center py-6 mb-4">
          <div className="flex items-center space-x-3">
            <svg 
              className="w-8 h-8 text-primary" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V7h10v2z"/>
            </svg>
            <h1 className="text-3xl font-bold text-primary">{tSavedAddresses('page_title')}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              className={`
                relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out
                ${isDark
                  ? 'glass-card text-white hover:bg-surface-glass shadow-glass border-border-glass'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }
                flex items-center space-x-2 min-w-[120px] justify-center
              `}
              onClick={handleThemeToggle}
              aria-label={isDark ? tTheme('switch_to_light') : tTheme('switch_to_dark')}
            >
              <span className="material-icons text-lg">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
              <span>{isDark ? '浅色模式' : '深色模式'}</span>
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-surface-light dark:glass-morphism p-4 rounded-lg shadow-card dark:shadow-glass mb-6 border border-border-light dark:border-border-glass backdrop-blur-glass">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/">{tNavigation('home')}</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/us">{tNavigation('us_address')}</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/tw">{tNavigation('tw_address')}</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/ca">{tNavigation('ca_address')}</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/hk">{tNavigation('hk_address')}</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/sg">{tNavigation('sg_address')}</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/uk">{tNavigation('uk_address')}</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="bg-surface-light dark:glass-morphism p-6 rounded-lg shadow-card dark:shadow-glass border border-border-light dark:border-border-glass backdrop-blur-glass">
          {/* 操作消息提示条 */}
          {actionMessage.show && (
            <div className={`
              mb-4 p-3 rounded-md text-sm transition-all duration-300 ease-in-out
              ${actionMessage.type === 'error'
                ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
              }
              backdrop-blur-sm
            `}>
              <div className="flex items-center space-x-2">
                <span className="material-icons text-sm">
                  {actionMessage.type === 'error' ? 'error_outline' : 'check_circle'}
                </span>
                <span>{actionMessage.text}</span>
              </div>
            </div>
          )}

          {/* 操作区域 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-primary">
              {tSavedAddresses('address_count', { count: savedAddresses.length })}
            </h2>
            {savedAddresses.length > 0 && (
              <div className="flex space-x-3">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-green-600 transition-colors flex items-center space-x-2"
                  onClick={handleExportCSV}
                >
                  <span className="material-icons text-sm">download</span>
                  <span>{tSavedAddresses('export_csv')}</span>
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-red-600 transition-colors"
                  onClick={handleClearAll}
                >
                  {tSavedAddresses('clear_all')}
                </button>
              </div>
            )}
          </div>

          {/* 地址列表 */}
          {savedAddresses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                <span className="material-icons text-6xl">bookmark_border</span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                {tSavedAddresses('no_saved_addresses')}
              </p>
              <Link
                href="/"
                className="bg-primary text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-primary-600 transition-colors inline-block"
              >
                {tSavedAddresses('back_to_home')}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {savedAddresses.map((address) => (
                <div
                  key={address.id}
                  className="border border-border-light dark:border-border-dark rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-text-light dark:text-text-dark mb-1">
                        {address.fullName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(address.createdAt)} • {address.country}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm flex items-center space-x-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>{tSavedAddresses('delete')}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">{tAddress('gender')}:</span>
                      <span className="text-text-light dark:text-text-dark">{address.gender}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">{tAddress('birthday')}:</span>
                      <span className="text-text-light dark:text-text-dark">{address.birthday}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">{tAddress('city')}:</span>
                      <span className="text-text-light dark:text-text-dark">{address.city}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">{tAddress('state')}:</span>
                      <span className="text-text-light dark:text-text-dark">{address.state}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">{tAddress('zip_code')}:</span>
                      <span className="text-text-light dark:text-text-dark">{address.zipCode}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-26 text-subtle-light dark:text-subtle-dark">{tAddress('telephone')}:</span>
                      <span className="text-text-light dark:text-text-dark">{address.telephone}</span>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-start">
                        <span className="w-16 text-subtle-light dark:text-subtle-dark">{tAddress('address')}:</span>
                        <span className="text-text-light dark:text-text-dark">{address.address}</span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-start">
                        <span className="w-25 text-subtle-light dark:text-subtle-dark">{tAddress('full_address')}:</span>
                        <span className="text-text-light dark:text-text-dark font-medium">{address.fullAddress}</span>
                        <button
                          onClick={() => handleCopyAddress(address.fullAddress, address.id)}
                          className={`
                            ml-2 p-1 rounded-md transition-all duration-200 ease-in-out
                            ${copySuccess === address.id
                              ? 'text-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700'
                            }
                            flex items-center justify-center w-6 h-6 flex-shrink-0
                          `}
                          title={copySuccess === address.id ? tSavedAddresses('copied') : tSavedAddresses('copy_full_address')}
                          aria-label={copySuccess === address.id ? tSavedAddresses('copied_full_address') : tSavedAddresses('copy_full_address')}
                        >
                          <span className="material-icons text-sm">
                            {copySuccess === address.id ? 'check' : 'content_copy'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 bg-surface-light dark:glass-morphism p-6 rounded-lg shadow-card dark:shadow-glass border border-border-light dark:border-border-glass backdrop-blur-glass text-sm">
          <div className="pt-4 text-center text-xs text-subtle-light dark:text-subtle-dark">
            <p>{tFooter('copyright')}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}