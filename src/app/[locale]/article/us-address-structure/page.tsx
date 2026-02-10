import { Metadata } from 'next';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';
  
  return {
    title: isEnglish 
      ? 'Understanding US Address Structure - US Address Generator'
      : '解析美国地址结构 - US Address Generator',
    description: isEnglish
      ? 'Deep dive into the composition structure of US addresses, including the meaning of streets, cities, states, zip codes and other components.'
      : '深入了解美国地址的标准化格式、组成规则和验证技术，掌握USPS标准和地址生成器核心逻辑。',
  };
}

export default async function UsAddressStructurePage({ params }: PageProps) {
  const { locale } = await params;
  const isEnglish = locale === 'en';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isEnglish ? 'Understanding US Address Structure' : '解析美国地址结构'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {isEnglish 
                ? 'Deep dive into the composition structure of US addresses, including the meaning of streets, cities, states, zip codes and other components'
                : '深入了解美国地址的标准化格式、组成规则和验证技术，掌握USPS标准和地址生成器核心逻辑'
              }
            </p>
          </div>

          {/* Article Content */}
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isEnglish ? 'Why Understanding US Address Structure is Important?' : '为什么了解美国地址结构很重要？'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'In cross-border business, international logistics, or software development, understanding the standardized format of US addresses is crucial. Whether filling out e-commerce orders, registering for overseas services, or designing address validation systems, a compliant address can avoid 90% of logistics errors. This article will break down the composition rules of US addresses from scratch and reveal the core technical logic of address generators.'
                  : '在跨境业务、国际物流或软件开发中，了解美国地址的标准化格式至关重要。无论是填写电商订单、注册海外服务，还是设计地址验证系统，一个符合规范的地址能避免90%的物流错误。本文将从零开始拆解美国地址的组成规则，并揭示地址生成器的核心技术逻辑。'
                }
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Four Core Components of US Addresses' : '美国地址的四大核心模块'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'US addresses adopt a "funnel-style" hierarchical structure, strictly following USPS (United States Postal Service) standards, consisting of the following 4 irreversible elements:'
                  : '美国地址采用「漏斗式」层级结构，严格遵循 USPS（美国邮政署） 标准，由以下4个不可逆序的要素构成：'
                }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? '1. Street Information (Street Line)' : '1. 街道信息（Street Line）'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                <strong>{isEnglish ? 'Format:' : '格式：'}</strong>
                {isEnglish 
                  ? '[House Number] + [Direction] + [Street Name] + [Type Abbreviation]'
                  : '[门牌号] + [方向符] + [街道名] + [类型缩写]'
                }
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                <strong>{isEnglish ? 'Examples:' : '示例：'}</strong>123 N Main St / 456 W Oak Ave Suite 200B
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>{isEnglish ? 'Key Rules:' : '关键规则：'}</strong>
                </p>
                <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                  <li>
                    {isEnglish 
                      ? 'Direction indicators (N/S/E/W) should precede the street name'
                      : '方向符（N/S/E/W）需前置街道名'
                    }
                  </li>
                  <li>
                    {isEnglish 
                      ? 'Street types must be abbreviated (St=Street, Ave=Avenue, Blvd=Boulevard)'
                      : '街道类型必须缩写（St=Street, Ave=Avenue, Blvd=Boulevard）'
                    }
                  </li>
                  <li>
                    {isEnglish 
                      ? 'Apartment/unit numbers go on the second line or separated by comma (e.g., Apt 5B)'
                      : '公寓/单元号写在第二行或用逗号分隔（如Apt 5B）'
                    }
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? '2. City Name' : '2. 城市名称（City）'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'Must use USPS officially recognized administrative names (e.g., New York cannot be abbreviated as NYC)'
                  : '需使用USPS官方认可的行政名称（如New York不可简写为NYC）'
                }
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                <strong>{isEnglish ? 'Special Cases:' : '特殊案例：'}</strong>
                {isEnglish 
                  ? 'Some ZIP codes cover multiple cities (e.g., 90210 corresponds to Beverly Hills and parts of Los Angeles)'
                  : '某些邮编覆盖多个城市（如90210对应比弗利山庄和部分洛杉矶）'
                }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? '3. State Code' : '3. 州代码（State）'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'Must use 2-letter abbreviations (CA=California, TX=Texas)'
                  : '必须采用2字母缩写（CA=加利福尼亚州，TX=德克萨斯州）'
                }
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                <strong>{isEnglish ? 'Common Mistakes:' : '常见错误：'}</strong>
                {isEnglish 
                  ? 'Confusing state names with city names (e.g., Kansas City in Missouri vs Kansas City in Kansas)'
                  : '混淆州名与城市名（如密苏里州的Kansas City与堪萨斯州的Kansas City）'
                }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? '4. ZIP Code' : '4. 邮政编码（ZIP Code）'}
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  <strong>{isEnglish ? 'Basic Format:' : '基础格式：'}</strong>
                  {isEnglish ? '5 digits (e.g., 10001)' : '5位数字（如10001）'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Extended Format:' : '扩展格式：'}</strong>
                  {isEnglish ? 'ZIP+4 (e.g., 10001-1234, improves delivery accuracy by 30%)' : 'ZIP+4（如10001-1234，提升投递精准度30%）'}
                </li>
              </ul>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>{isEnglish ? 'Technical Details:' : '技术细节：'}</strong>
                  {isEnglish 
                    ? 'First 3 digits represent regional center, digits 4-5 subdivide delivery routes'
                    : '前3位代表区域中心，第4-5位细分投递路线'
                  }
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Special Address Types Analysis' : '特殊地址类型解析'}
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'Rural Addresses (Rural Route)' : '农村地址（Rural Route）'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'Uses RR identifier: RR 2 Box 15 (Rural Route 2, Box 15)'
                  : '使用RR标识：RR 2 Box 15（第二农村路线15号信箱）'
                }
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                <strong>{isEnglish ? 'Modern Trend:' : '现代趋势：'}</strong>
                {isEnglish 
                  ? 'Gradually being replaced by 911 emergency address system'
                  : '逐步被911紧急地址系统取代'
                }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'Military Addresses (APO/FPO)' : '军事地址（APO/FPO）'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                <strong>{isEnglish ? 'Format:' : '格式：'}</strong>Unit 2050 Box 4190, APO AE 09469
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'State codes fixed as AA (Americas), AE (Europe), AP (Pacific)'
                  : '州代码固定为AA（美洲）,AE（欧洲）,AP（太平洋）'
                }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'Corporate Campus Addresses' : '企业园区地址'}
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {isEnglish 
                    ? 'Include building codes: 1 Microsoft Way Bldg 5'
                    : '包含楼栋代码：1 Microsoft Way Bldg 5'
                  }
                </li>
                <li>
                  {isEnglish 
                    ? 'Use private postal codes (e.g., #2000 for Amazon headquarters)'
                    : '使用私有邮局代码（如#2000代表亚马逊总部）'
                  }
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Three Technical Standards for Address Validation' : '地址验证的三大技术标准'}
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'CASS Certification System' : 'CASS认证系统'}
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {isEnglish 
                    ? 'USPS address database contains 160 million valid addresses'
                    : 'USPS的地址数据库包含1.6亿有效地址'
                  }
                </li>
                <li>
                  {isEnglish 
                    ? 'Automatically corrects spelling errors (e.g., St.→St)'
                    : '自动校正拼写错误（如St.→St）'
                  }
                </li>
                <li>
                  {isEnglish 
                    ? 'Generator tools must update data monthly'
                    : '生成器工具必须每月更新数据'
                  }
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'LACSLink Mechanism' : 'LACSLink机制'}
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {isEnglish 
                    ? 'Converts rural addresses to standardized street addresses'
                    : '将农村地址转换为标准化街道地址'
                  }
                </li>
                <li>
                  {isEnglish 
                    ? 'Solves location issues for HC 67 Box 12 type addresses'
                    : '解决HC 67 Box 12类地址的定位问题'
                  }
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'Suite/Unit Smart Recognition' : 'Suite/Unit智能识别'}
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {isEnglish 
                    ? 'Valid formats: Ste 200 / Unit B-12'
                    : '合法格式：Ste 200 / Unit B-12'
                  }
                </li>
                <li>
                  {isEnglish 
                    ? 'Avoid non-standard symbols (like #, %)'
                    : '避免使用非标符号（如#,%）'
                  }
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Why Do We Need Address Generators?' : '为什么需要地址生成器？'}
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <li>
                  <strong>{isEnglish ? 'Data Compliance:' : '数据合规性：'}</strong>
                  {isEnglish 
                    ? 'Avoid using fictional city names from USPS blacklist (e.g., Springfield needs to match correct state)'
                    : '避免使用USPS黑名单中的虚构城市名（如Springfield需匹配正确州）'
                  }
                </li>
                <li>
                  <strong>{isEnglish ? 'Format Randomization:' : '格式随机化：'}</strong>
                  {isEnglish 
                    ? 'Effective combination of street types (Rd, Dr, Cir) with direction indicators'
                    : '有效组合街道类型（Rd, Dr, Cir）与方向符'
                  }
                </li>
                <li>
                  <strong>{isEnglish ? 'Scenario Adaptation:' : '场景适配：'}</strong>
                  {isEnglish 
                    ? 'When generating test addresses, need to include special cases like PO Box, high floor numbers'
                    : '生成测试地址时需包含PO Box、高楼层号等特殊用例'
                  }
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Conclusion' : '结语'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'Understanding US addresses is not just about memorizing formats, but mastering their geocoding logic. A standard address should be verifiable through USPS address standardization tools. When you need to generate test addresses in bulk, always choose data sources that comply with CASS certification - this is the first line of defense against logistics errors.'
                  : '理解美国地址不仅是记忆格式，更需掌握其地理编码逻辑。一个标准的地址应能通过USPS的地址标准化工具验证。当您需要批量生成测试地址时，请始终选择符合CASS认证的数据源，这是避免物流失误的第一道防线。'
                }
              </p>

              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 mt-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      <strong>{isEnglish ? 'Tip:' : '提示：'}</strong>
                      {isEnglish 
                        ? 'Use our US Address Generator to quickly generate USPS-compliant test addresses, supporting various special formats and validation requirements.'
                        : '使用我们的美国地址生成器可以快速生成符合USPS标准的测试地址，支持各种特殊格式和验证需求。'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {isEnglish ? 'Back to Home' : '返回首页'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}