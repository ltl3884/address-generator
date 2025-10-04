'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { filterCities } from '@/lib/cityData';
import AutocompletePortal from './AutocompletePortal';
import LanguageSwitcher from './LanguageSwitcher';

interface AddressData {
  fullName: string;
  gender: string;
  birthday: string;
  address: string;
  telephone: string;
  city: string;
  zipCode: string;
  state: string;
  stateFull: string;
  country: string;
}

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

interface ApiResponse {
  code: number;
  message: string;
  data: AddressData;
}

export default function AddressGenerator() {
  // Translation hooks
  const tTheme = useTranslations('theme');
  const tHeader = useTranslations('header');
  const tSearch = useTranslations('search');
  const tAddress = useTranslations('address');
  const tActions = useTranslations('actions');
  const tSavedAddresses = useTranslations('saved_addresses');
  const tNavigation = useTranslations('navigation');
  const tFooter = useTranslations('footer');

  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  // const [searchError, setSearchError] = useState(''); // 暂时未使用，注释掉
  const [searchMessage, setSearchMessage] = useState<{ show: boolean; text: string; type: 'error' | 'info' }>({ show: false, text: '', type: 'info' });
  const [saveMessage, setSaveMessage] = useState<{ show: boolean; text: string; type: 'error' | 'info' }>({ show: false, text: '', type: 'info' });
  const [currentCountry, setCurrentCountry] = useState('us'); // 添加当前国家状态
  const [currentPlace, setCurrentPlace] = useState(''); // 添加当前地点状态
  const [isClient, setIsClient] = useState(false); // 添加客户端状态标识

  // 自动补全相关状态
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [addressData, setAddressData] = useState<AddressData>({
    fullName: '',
    gender: '',
    birthday: '',
    address: '',
    telephone: '',
    city: '',
    zipCode: '',
    state: '',
    stateFull: '',
    country: ''
  });

  // 获取当前路径对应的国家代码和地点
  const parseCurrentPath = () => {
    if (typeof window === 'undefined') return { country: 'us', place: '' };
    const path = window.location.pathname;
    // 移除开头的/，分割路径
    const pathParts = path.replace(/^\//, '').split('/').filter(Boolean);
    
    if (pathParts.length === 0) {
      // 根路径，默认返回us
      return { country: 'us', place: '' };
    } else if (pathParts.length === 1) {
      // 只有国家代码，如 /us
      return { country: pathParts[0], place: '' };
    } else if (pathParts.length === 2) {
      // 有国家代码和地点，如 /us/AL
      // 对地点参数进行URL解码，处理空格等特殊字符
      return { country: pathParts[0], place: decodeURIComponent(pathParts[1]) };
    } else {
      // 其他情况，取前两个部分
      // 对地点参数进行URL解码，处理空格等特殊字符
      return { country: pathParts[0], place: decodeURIComponent(pathParts[1]) };
    }
  };

  // 客户端初始化
  useEffect(() => {
    setIsClient(true);
    const { country, place } = parseCurrentPath();
    setCurrentCountry(country);
    setCurrentPlace(place);
    
    // 设置搜索框的默认值为路径的最后一个部分
    if (place) {
      setSearchQuery(place);
    }
  }, []);

  // 使用localStorage缓存已请求的数据
  const getCachedData = (country: string, place?: string): AddressData | null => {
    if (typeof window === 'undefined') return null;
    try {
      const cacheKey = place ? `addressData_${country}_${place}` : `addressData_${country}`;
      const cached = localStorage.getItem(cacheKey);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  };

  const setCachedData = (country: string, data: AddressData, place?: string) => {
    if (typeof window === 'undefined') return;
    try {
      const cacheKey = place ? `addressData_${country}_${place}` : `addressData_${country}`;
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to cache data:', error);
    }
  };

  // 监听路由变化获取数据
  useEffect(() => {
    if (!isClient) return;

    // 如果已经缓存了这个国家和地点的数据，直接使用
    const cached = getCachedData(currentCountry, currentPlace);
    if (cached) {
      setAddressData(cached);
      console.log('Using cached data for country:', currentCountry, currentPlace ? `with place: ${currentPlace}` : '');
      return;
    }

    // Fetch address data from API via Next.js proxy
    const fetchAddressData = async () => {
      try {
        // 构建请求体，如果有place参数则包含
        const requestBody: { country: string; place?: string } = { country: currentCountry };
        if (currentPlace.trim()) {
          requestBody.place = currentPlace.trim();
        }
        
        console.log('Fetching new data for country:', currentCountry, currentPlace ? `with place: ${currentPlace}` : '');
        const response = await fetch('/api/address/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const apiResponse: ApiResponse = await response.json();
          console.log('API Response:', apiResponse);

          if (apiResponse.code === 200 && apiResponse.data) {
            setAddressData(apiResponse.data);
            // 缓存数据
            setCachedData(currentCountry, apiResponse.data, currentPlace);
            console.log('Address data loaded and cached successfully:', apiResponse.data);
          } else {
            console.log('API returned non-200 code or no data:', apiResponse.message);
          }
        } else {
          console.error('Failed to fetch address data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching address data:', error);
        console.log('Using default address data due to API failure');
      }
    };

    fetchAddressData();
  }, [isClient, currentCountry, currentPlace]); // 依赖于 isClient、currentCountry 和 currentPlace

  // 主题设置效果
  useEffect(() => {
    // 确保只在客户端执行
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

  const handleGenerate = async () => {
    const country = currentCountry;
    
    // 构建请求体，如果搜索框有值则包含 place 参数
    const requestBody: { country: string; place?: string } = { country };
    if (searchQuery.trim()) {
      requestBody.place = searchQuery.trim();
    }

    try {
      console.log('Generating new data for country:', country, searchQuery.trim() ? `with place: ${searchQuery.trim()}` : '');
      const response = await fetch('/api/address/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const apiResponse: ApiResponse = await response.json();
        console.log('API Response:', apiResponse);

        if (apiResponse.code === 200 && apiResponse.data) {
          setAddressData(apiResponse.data);
          // 更新缓存
          setCachedData(country, apiResponse.data);
          console.log('New address data generated and cached successfully:', apiResponse.data);
        } else {
          console.log('API returned non-200 code or no data:', apiResponse.message);
        }
      } else {
        console.error('Failed to generate new address data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error generating new address data:', error);
    }
  };

  const handleSave = () => {
    // 生成完整地址
    const fullAddress = !isClient
      ? `${addressData.address}, ${addressData.city}, ${addressData.state} ${addressData.zipCode}`
      : currentCountry === 'sg'
        ? addressData.address
        : (currentCountry === 'tw' || currentCountry === 'hk')
          ? `${addressData.address}, ${addressData.city}, ${addressData.zipCode}`
          : `${addressData.address}, ${addressData.city}, ${addressData.state} ${addressData.zipCode}`;

    // 创建保存的地址对象
    const savedAddress: SavedAddress = {
      id: Date.now().toString(), // 使用时间戳作为唯一ID
      fullName: addressData.fullName,
      gender: addressData.gender,
      birthday: addressData.birthday,
      city: addressData.city,
      state: addressData.state,
      address: addressData.address,
      zipCode: addressData.zipCode,
      telephone: addressData.telephone,
      fullAddress: fullAddress,
      country: addressData.country,
      createdAt: Date.now()
    };

    // 保存到LocalStorage
    try {
      const existingAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
      existingAddresses.push(savedAddress);
      localStorage.setItem('savedAddresses', JSON.stringify(existingAddresses));

      // 显示成功提示
    showSaveMessage(tActions('address_saved'), 'info');
  } catch (error) {
      console.error('保存地址失败:', error);
      showSaveMessage(tActions('save_failed'), 'error');
    }
  };

  // 显示搜索消息的函数
  const showSearchMessage = (text: string, type: 'error' | 'info' = 'error') => {
    setSearchMessage({ show: true, text, type });
    // 3秒后自动隐藏
    setTimeout(() => {
      setSearchMessage(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // 显示保存消息的函数
  const showSaveMessage = (text: string, type: 'error' | 'info' = 'info') => {
    setSaveMessage({ show: true, text, type });
    // 3秒后自动隐藏
    setTimeout(() => {
      setSaveMessage(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // 处理搜索输入变化，实现自动补全
  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);

    if (value.trim()) {
      const filteredSuggestions = filterCities(value.trim(), 10);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  // 选择建议项
  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    setHighlightedIndex(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 处理键盘导航
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          selectSuggestion(suggestions[highlightedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // 点击外部区域关闭建议列表（Portal 组件会处理）
  useEffect(() => {
    // 清理函数：当组件卸载时清理 portal
    return () => {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    };
  }, []);

  const handleSearch = async () => {
    // 输入验证
    if (!searchQuery.trim()) {
      showSearchMessage(tSearch('enter_search_content'), 'error');
      return;
    }

    setIsSearching(true);
    // setSearchError('');
    setSearchMessage({ show: false, text: '', type: 'info' });

    try {
      console.log('Searching for:', searchQuery);
      const response = await fetch('/api/address/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: currentCountry,
          place: searchQuery.trim()
        }),
      });

      if (response.ok) {
        const apiResponse: ApiResponse = await response.json();
        console.log('Search API Response:', apiResponse);

        if (apiResponse.code === 200 && apiResponse.data) {
          setAddressData(apiResponse.data);
          console.log('Search results loaded successfully:', apiResponse.data);
        } else if (apiResponse.code === 404) {
          // 无搜索结果
          showSearchMessage(tSearch('no_results'), 'error');
        } else {
          // setSearchError(apiResponse.message || '搜索失败');
          showSearchMessage(apiResponse.message || tSearch('search_failed'), 'error');
        }
      } else {
        // setSearchError('搜索服务不可用');
        showSearchMessage(tSearch('service_unavailable'), 'error');
      }
    } catch (error) {
      console.error('Error searching address data:', error);
      // setSearchError('搜索失败，请重试');
      showSearchMessage(tSearch('search_failed_retry'), 'error');
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    setSuggestions([]);
    setHighlightedIndex(-1);
    setSearchMessage({ show: false, text: '', type: 'info' });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCopyAddress = async () => {
    const fullAddress = `${addressData.address}, ${addressData.city}, ${addressData.state} ${addressData.zipCode}`;
    
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopySuccess(true);
      // 2秒后隐藏成功提示
      setTimeout(() => {
        setCopySuccess(false);
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
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      } catch (fallbackError) {
        console.error('降级复制方法也失败:', fallbackError);
        alert(tActions('copy_failed_manual'));
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="bg-background-light dark:bg-glass-gradient font-sans text-text-light dark:text-text-dark min-h-screen dark:glass-background">
      <div className="container mx-auto p-4 max-w-7xl relative z-20">
        {/* Header */}
        <header className="flex justify-between items-center py-6 mb-4">
          <h1 className="text-3xl font-bold text-primary">{tHeader('title')}</h1>
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
              <span>{isDark ? tTheme('light_mode') : tTheme('dark_mode')}</span>
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
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-surface-light dark:glass-morphism p-6 rounded-lg shadow-card dark:shadow-glass border border-border-light dark:border-border-glass backdrop-blur-glass">
            {/* Search Section */}
            <div className="border-b border-border-light dark:border-border-dark pb-6 mb-6">
              <h2 className="text-lg font-semibold text-primary mb-4">{tSearch('title')}</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    ref={inputRef}
                    className="flex-grow p-3 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                    placeholder={tSearch('placeholder')}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    className={`bg-primary text-white px-6 py-3 rounded-md font-medium transition-colors text-sm ${
                      isSearching ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-600'
                    }`}
                    onClick={handleSearch}
                    disabled={isSearching}
                  >
                    {isSearching ? tSearch('searching') : tSearch('search')}
                  </button>
                  <button
                    className="bg-gray-500 dark:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition-colors text-sm hover:bg-gray-600 dark:hover:bg-gray-700"
                    onClick={handleClear}
                    disabled={isSearching}
                    aria-label={tSearch('clear_aria_label')}
                  >
                    {tSearch('clear')}
                  </button>
                </div>

                {/* 自动补全下拉列表 - 使用 Portal 渲染 */}
                <AutocompletePortal
                  show={showSuggestions && suggestions.length > 0}
                  anchorRef={inputRef}
                  onClose={() => {
                    setShowSuggestions(false);
                    setHighlightedIndex(-1);
                  }}
                >
                  <div
                    ref={suggestionsRef}
                    className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-2xl max-h-60 overflow-y-auto"
                    style={{
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion}
                        className={`px-4 py-3 cursor-pointer transition-colors text-sm ${
                          index === highlightedIndex
                            ? 'bg-primary text-white'
                            : 'hover:bg-primary/10 dark:hover:bg-primary/20 text-text-light dark:text-text-dark'
                        }`}
                        onClick={() => selectSuggestion(suggestion)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </AutocompletePortal>

                {/* 搜索提示条 */}
                {searchMessage.show && (
                  <div className={`
                    p-3 rounded-md text-sm transition-all duration-300 ease-in-out
                    ${searchMessage.type === 'error'
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                      : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    }
                    backdrop-blur-sm
                  `}>
                    <div className="flex items-center space-x-2">
                      <span className="material-icons text-sm">
                        {searchMessage.type === 'error' ? 'error_outline' : 'info'}
                      </span>
                      <span>{searchMessage.text}</span>
                    </div>
                  </div>
                )}

                {/* 保存提示条 */}
                {saveMessage.show && (
                  <div className={`
                    p-3 rounded-md text-sm transition-all duration-300 ease-in-out
                    ${saveMessage.type === 'error'
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                      : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                    }
                    backdrop-blur-sm
                  `}>
                    <div className="flex items-center space-x-2">
                      <span className="material-icons text-sm">
                        {saveMessage.type === 'error' ? 'error_outline' : 'check_circle'}
                      </span>
                      <span>{saveMessage.text}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info Section */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{tAddress('basic_info')}</h3>
              <div className="flex space-x-2">
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-600 transition-colors"
                  onClick={handleGenerate}
                >
                  {tActions('generate')}
                </button>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-600 transition-colors"
                  onClick={handleSave}
                >
                  {tActions('save')}
                </button>
                <Link
                  href="/my_address"
                  className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-600 transition-colors"
                >
                  {tSavedAddresses('my_saved_addresses')}
                </Link>
              </div>
            </div>

            {/* Address Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 text-sm">
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">{tAddress('full_name')}</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.fullName}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">{tAddress('gender')}</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.gender}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">{tAddress('birthday')}</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.birthday}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">{tAddress('city')}</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.city}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">{tAddress('state')}</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{!isClient ? addressData.state : currentCountry === 'us' ? `${addressData.stateFull}(${addressData.state})` : addressData.state}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">{tAddress('address')}</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.address}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">{tAddress('zip_code')}</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.zipCode}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">{tAddress('telephone')}</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.telephone}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3 md:col-span-2">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">{tAddress('full_address')}</span>
                <div className="flex-1 flex items-center">
                  <span className="text-text-light dark:text-text-dark">
                    {!isClient 
                      ? `${addressData.address}, ${addressData.city}, ${addressData.state} ${addressData.zipCode}`
                      : currentCountry === 'sg' 
                        ? addressData.address 
                        : (currentCountry === 'tw' || currentCountry === 'hk')
                          ? `${addressData.address}, ${addressData.city}, ${addressData.zipCode}`
                          : `${addressData.address}, ${addressData.city}, ${addressData.state} ${addressData.zipCode}`
                    }
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className={`
                      ml-2 p-1 rounded-md transition-all duration-200 ease-in-out
                      ${copySuccess 
                        ? 'text-green-500 bg-green-50 dark:bg-green-900/20' 
                        : 'text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                      flex items-center justify-center w-6 h-6 flex-shrink-0
                    `}
                    title={copySuccess ? tActions('copied') : tActions('copy_full_address')}
                    aria-label={copySuccess ? tActions('copied_full_address') : tActions('copy_full_address')}
                  >
                    <span className="material-icons text-sm">
                      {copySuccess ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-surface-light dark:glass-morphism p-4 rounded-lg shadow-card dark:shadow-glass border border-border-light dark:border-border-glass backdrop-blur-glass">
              <h3 className="text-lg font-semibold text-primary border-b border-border-light dark:border-border-dark pb-3 mb-4">{tNavigation('tax_free_states')}</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link 
                    className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors cursor-pointer" 
                    href="/us/Alaska"
                  >
                    {tNavigation('alaska_address')}
                  </Link>
                </li>
                <li>
                  <Link 
                    className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors cursor-pointer" 
                    href="/us/Delaware"
                  >
                    {tNavigation('delaware_address')}
                  </Link>
                </li>
                <li>
                  <Link 
                    className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors cursor-pointer" 
                    href="/us/Montana"
                  >
                    {tNavigation('montana_address')}
                  </Link>
                </li>
                <li>
                  <Link 
                    className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors cursor-pointer" 
                    href="/us/New Hampshire"
                  >
                    {tNavigation('new_hampshire_address')}
                  </Link>
                </li>
                <li>
                  <Link 
                    className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors cursor-pointer" 
                    href="/us/Oregon"
                  >
                    {tNavigation('oregon_address')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-surface-light dark:glass-morphism p-4 rounded-lg shadow-card dark:shadow-glass border border-border-light dark:border-border-glass backdrop-blur-glass">
              <h3 className="text-lg font-semibold text-primary border-b border-border-light dark:border-border-dark pb-3 mb-4">{tNavigation('popular_cities')}</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link 
                    className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors cursor-pointer" 
                    href="/us/New York"
                  >
                    {tNavigation('new_york_address')}
                  </Link>
                </li>
                <li>
                  <Link 
                    className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors cursor-pointer" 
                    href="/us/Los Angeles"
                  >
                    {tNavigation('los_angeles_address')}
                  </Link>
                </li>
                <li>
                  <Link 
                    className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors cursor-pointer" 
                    href="/us/Chicago"
                  >
                    {tNavigation('chicago_address')}
                  </Link>
                </li>
                <li>
                  <Link 
                    className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors cursor-pointer" 
                    href="/us/Houston"
                  >
                    {tNavigation('houston_address')}
                  </Link>
                </li>
                <li>
                  <Link 
                    className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors cursor-pointer" 
                    href="/us/Phoenix"
                  >
                    {tNavigation('phoenix_address')}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </main>

        {/* Footer */}
        <footer className="mt-8 bg-surface-light dark:glass-morphism p-6 rounded-lg shadow-card dark:shadow-glass border border-border-light dark:border-border-glass backdrop-blur-glass text-sm">
          <div className="pt-4 text-center text-xs text-subtle-light dark:text-subtle-dark">
            <p>{tFooter('copyright')}</p>
            <p className="mt-1">{tFooter('disclaimer')}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}