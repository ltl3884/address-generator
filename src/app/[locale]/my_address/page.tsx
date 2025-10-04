'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
      showActionMessage('地址删除成功', 'info');
    } catch (error) {
      console.error('删除地址失败:', error);
      showActionMessage('删除地址失败，请重试', 'error');
    }
  };

  const handleClearAll = () => {
    try {
      setSavedAddresses([]);
      localStorage.setItem('savedAddresses', '[]');
      showActionMessage('所有地址已清空', 'info');
    } catch (error) {
      console.error('清空地址失败:', error);
      showActionMessage('清空地址失败，请重试', 'error');
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
        showActionMessage('复制失败，请手动复制地址', 'error');
      }
      document.body.removeChild(textArea);
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
          <h1 className="text-3xl font-bold text-primary">我的保存地址</h1>
          <div className="flex items-center space-x-4">
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
              aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
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
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/">首页</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/us">美国地址</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/tw">台湾地址</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/ca">加拿大地址</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/hk">香港地址</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/sg">新加坡地址</Link></li>
            <li><Link className="text-primary hover:text-primary-600 transition-colors font-medium" href="/uk">英国地址</Link></li>
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
              已保存的地址 ({savedAddresses.length}个)
            </h2>
            {savedAddresses.length > 0 && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-red-600 transition-colors"
                onClick={handleClearAll}
              >
                清空所有
              </button>
            )}
          </div>

          {/* 地址列表 */}
          {savedAddresses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                <span className="material-icons text-6xl">bookmark_border</span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                还没有保存任何地址
              </p>
              <Link
                href="/"
                className="bg-primary text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-primary-600 transition-colors inline-block"
              >
                返回首页生成地址
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
                        className="p-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="删除地址"
                        aria-label="删除地址"
                      >
                        <span className="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">性别:</span>
                      <span className="text-text-light dark:text-text-dark">{address.gender}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">生日:</span>
                      <span className="text-text-light dark:text-text-dark">{address.birthday}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">城市:</span>
                      <span className="text-text-light dark:text-text-dark">{address.city}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">州/省:</span>
                      <span className="text-text-light dark:text-text-dark">{address.state}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">邮编:</span>
                      <span className="text-text-light dark:text-text-dark">{address.zipCode}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-subtle-light dark:text-subtle-dark">电话:</span>
                      <span className="text-text-light dark:text-text-dark">{address.telephone}</span>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-start">
                        <span className="w-16 text-subtle-light dark:text-subtle-dark">地址:</span>
                        <span className="text-text-light dark:text-text-dark">{address.address}</span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-start">
                        <span className="w-16 text-subtle-light dark:text-subtle-dark">完整地址:</span>
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
                          title={copySuccess === address.id ? "已复制!" : "复制完整地址"}
                          aria-label={copySuccess === address.id ? "已复制完整地址" : "复制完整地址"}
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
            <p>Copyright © 2021 address-gen.ccc. All rights reserved.</p>
            <p className="mt-1">美国地址生成的数据来自于各个大学学习, 学习资料以及部分网友的分享, 不用于任何商业用途, 仅供学习参考.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}