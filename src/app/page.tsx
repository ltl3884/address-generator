'use client';

import { useState, useEffect } from 'react';

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

interface ApiResponse {
  code: number;
  message: string;
  data: AddressData;
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  useEffect(() => {
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

    // Fetch address data from API via Next.js proxy
    const fetchAddressData = async () => {
      try {
        const response = await fetch('/api/address/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country: 'us' }),
        });

        if (response.ok) {
          const apiResponse: ApiResponse = await response.json();
          console.log('API Response:', apiResponse);

          if (apiResponse.code === 200 && apiResponse.data) {
            setAddressData(apiResponse.data);
            console.log('Address data loaded successfully:', apiResponse.data);
          } else {
            console.log('API returned non-200 code or no data:', apiResponse.message);
          }
        } else {
          console.error('Failed to fetch address data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching address data:', error);
        // 如果API调用失败，保持使用默认数据
        console.log('Using default address data due to API failure');
      }
    };

    fetchAddressData();
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/address/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: 'us' }),
      });

      if (response.ok) {
        const apiResponse: ApiResponse = await response.json();
        console.log('API Response:', apiResponse);

        if (apiResponse.code === 200 && apiResponse.data) {
          setAddressData(apiResponse.data);
          console.log('New address data generated successfully:', apiResponse.data);
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
    // Mock save functionality
    alert('地址信息已保存！');
  };

  const handleSearch = () => {
    // Mock search functionality
    alert(`搜索: ${searchQuery}`);
  };

  return (
    <div className="bg-background-light dark:bg-glass-gradient font-sans text-text-light dark:text-text-dark min-h-screen dark:glass-background">
      <div className="container mx-auto p-4 max-w-7xl relative z-20">
        {/* Header */}
        <header className="flex justify-between items-center py-6 mb-4">
          <h1 className="text-3xl font-bold text-primary">地址生成器</h1>
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
            <li><a className="text-primary hover:text-primary-600 transition-colors font-medium" href="#">首页</a></li>
            <li><a className="text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors" href="/us">美国地址</a></li>
            <li><a className="text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors" href="#">台湾地址</a></li>
            <li><a className="text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors" href="#">加拿大地址</a></li>
            <li><a className="text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors" href="#">香港地址</a></li>
            <li><a className="text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors" href="#">新加坡地址</a></li>
            <li><a className="text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors" href="#">英国地址</a></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-surface-light dark:glass-morphism p-6 rounded-lg shadow-card dark:shadow-glass border border-border-light dark:border-border-glass backdrop-blur-glass">
            {/* Search Section */}
            <div className="border-b border-border-light dark:border-border-dark pb-6 mb-6">
              <h2 className="text-lg font-semibold text-primary mb-4">搜索</h2>
              <div className="flex items-center space-x-3">
                <input 
                  className="flex-grow p-3 border border-border-light dark:border-border-dark rounded-md bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm" 
                  placeholder="输入城市名或州名搜索" 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition-colors text-sm"
                  onClick={handleSearch}
                >
                  搜索
                </button>
              </div>
            </div>

            {/* Basic Info Section */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">基本资料</h3>
              <div className="flex space-x-2">
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-600 transition-colors"
                  onClick={handleGenerate}
                >
                  生成
                </button>
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-600 transition-colors"
                  onClick={handleSave}
                >
                  保存
                </button>
              </div>
            </div>

            {/* Address Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 text-sm">
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">姓名</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.fullName}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">性别</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.gender}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">生日</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.birthday}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">地址</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.address}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">城市</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.city}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">州</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.state}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">州全称</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.stateFull}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">邮编</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.zipCode}</span>
              </div>
              <div className="flex border-b border-dashed border-border-light dark:border-border-dark py-3">
                <span className="w-20 text-subtle-light dark:text-subtle-dark">电话号码</span>
                <span className="flex-1 text-text-light dark:text-text-dark">{addressData.telephone}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-surface-light dark:glass-morphism p-4 rounded-lg shadow-card dark:shadow-glass border border-border-light dark:border-border-glass backdrop-blur-glass">
              <h3 className="text-lg font-semibold text-primary border-b border-border-light dark:border-border-dark pb-3 mb-4">热门州/城市地址</h3>
              <ul className="space-y-1 text-sm">
                <li><a className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors" href="#">加利福尼亚州地址</a></li>
                <li><a className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors" href="#">德克萨斯州地址</a></li>
                <li><a className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors" href="#">佛罗里达州地址</a></li>
                <li><a className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors" href="#">纽约州地址</a></li>
                <li><a className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors" href="#">宾夕法尼亚州地址</a></li>
                <li><a className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors" href="#">伊利诺伊州地址</a></li>
                <li><a className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors" href="#">俄亥俄州地址</a></li>
                <li><a className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors" href="#">佐治亚州地址</a></li>
                <li><a className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors" href="#">北卡罗来纳州地址</a></li>
                <li><a className="block p-2 rounded-md text-subtle-light dark:text-subtle-dark hover:bg-primary hover:text-white transition-colors" href="#">密歇根州地址</a></li>
              </ul>
            </div>
          </aside>
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
