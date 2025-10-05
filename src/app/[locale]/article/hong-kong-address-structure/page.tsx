import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isEnglish = params.locale === 'en';
  
  return {
    title: isEnglish 
      ? 'Hong Kong Address Structure Explained - US Address Generator'
      : '香港地址结构详解 - US Address Generator',
    description: isEnglish 
      ? 'Detailed analysis of Hong Kong address composition structure, including districts, streets, building numbers and the meaning and format of each component.'
      : '详细分析香港地址组成结构，包括区域、街道、楼宇编号以及各个组成部分的含义和格式。',
  };
}

export default function HongKongAddressStructurePage({ params }: Props) {
  const isEnglish = params.locale === 'en';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back to Home Button */}
          <div className="mb-6">
            <Link 
              href={`/${params.locale}`}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {isEnglish ? 'Back to Home' : '返回首页'}
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isEnglish ? 'Hong Kong Address Structure Explained' : '香港地址结构详解'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {isEnglish 
                ? 'Detailed analysis of Hong Kong address composition structure'
                : '详细分析香港地址组成结构，包括区域、街道、楼宇编号等'
              }
            </p>
          </div>

          {/* Article Content */}
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="max-w-none">
              
              {/* Introduction */}
              <section className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
                  {isEnglish ? (
                    <>
                      Understanding Hong Kong&apos;s address structure is crucial for effective communication and business operations in this international hub. The system&apos;s complexity reflects the city&apos;s unique history and urban development, but following the standard format ensures accurate mail delivery and professional correspondence.
                    </>
                  ) : (
                    <>
                      了解香港的地址结构对于在这个国际枢纽进行有效沟通和商业运营至关重要。该系统的复杂性反映了这座城市独特的历史和城市发展，但遵循标准格式可确保准确的邮件投递和专业通信。
                    </>
                  )}
                </p>
              </section>

              {/* Basic Structure */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                  {isEnglish ? '🏗️ Basic Address Structure' : '🏗️ 基本地址结构'}
                </h2>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
                    {isEnglish ? 'Standard Format' : '标准格式'}
                  </h3>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                    {isEnglish ? (
                      <>
                        <div className="text-gray-800 dark:text-gray-200">
                          [Flat/Unit] [Floor], [Building Name/Number]<br/>
                          [Street Number] [Street Name]<br/>
                          [District], [Region]<br/>
                          Hong Kong
                        </div>
                        <div className="mt-3 text-blue-600 dark:text-blue-400 text-xs">
                          Example: Flat A, 15/F, Central Plaza<br/>
                          18 Harbour Road<br/>
                          Wan Chai, Hong Kong Island<br/>
                          Hong Kong
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-gray-800 dark:text-gray-200">
                          [单位/房间号] [楼层], [建筑物名称/编号]<br/>
                          [街道号码] [街道名称]<br/>
                          [区域], [地区]<br/>
                          香港
                        </div>
                        <div className="mt-3 text-blue-600 dark:text-blue-400 text-xs">
                          示例: A室, 15楼, 中央广场<br/>
                          港湾道18号<br/>
                          湾仔, 香港岛<br/>
                          香港
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </section>

              {/* Address Components */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                  {isEnglish ? 'Address Components Breakdown' : '地址组成部分详解'}
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-3">
                      {isEnglish ? '🏠 Building Information' : '🏠 建筑物信息'}
                    </h3>
                    <ul className="text-green-800 dark:text-green-200 space-y-2">
                      <li>• <strong>{isEnglish ? 'Building Name' : '建筑物名称'}</strong>: {isEnglish ? 'Often in English and Chinese' : '通常有中英文名称'}</li>
                      <li>• <strong>{isEnglish ? 'Building Number' : '建筑物编号'}</strong>: {isEnglish ? 'Street address number' : '街道地址编号'}</li>
                      <li>• <strong>{isEnglish ? 'Floor' : '楼层'}</strong>: {isEnglish ? 'Written as "15/F" or "15th Floor"' : '写作"15楼"或"15/F"'}</li>
                      <li>• <strong>{isEnglish ? 'Unit/Flat' : '单位/房间'}</strong>: {isEnglish ? 'Individual apartment or office' : '具体的公寓或办公室'}</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-200 mb-3">
                      {isEnglish ? '📍 Geographic Information' : '📍 地理信息'}
                    </h3>
                    <ul className="text-purple-800 dark:text-purple-200 space-y-2">
                      <li>• <strong>{isEnglish ? 'Street Name' : '街道名称'}</strong>: {isEnglish ? 'Road, Street, Avenue, etc.' : '道路、街道、大道等'}</li>
                      <li>• <strong>{isEnglish ? 'District' : '区域'}</strong>: {isEnglish ? 'Local administrative area' : '地方行政区域'}</li>
                      <li>• <strong>{isEnglish ? 'Region' : '地区'}</strong>: {isEnglish ? 'Hong Kong Island, Kowloon, New Territories' : '香港岛、九龙、新界'}</li>
                      <li>• <strong>{isEnglish ? 'Country' : '国家'}</strong>: {isEnglish ? 'Always "Hong Kong"' : '始终为"香港"'}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Regional Divisions */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                  {isEnglish ? 'Hong Kong Regional Divisions' : '香港地区划分'}
                </h2>

                <div className="space-y-6">
                  <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-3">
                      🏝️ {isEnglish ? 'Hong Kong Island' : '香港岛'}
                    </h3>
                    <p className="text-red-800 dark:text-red-200 mb-3">
                      {isEnglish 
                        ? 'The original settlement and financial center of Hong Kong.'
                        : '香港的原始定居地和金融中心。'
                      }
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <span className="bg-red-100 dark:bg-red-800 px-2 py-1 rounded">{isEnglish ? 'Central' : '中环'}</span>
                      <span className="bg-red-100 dark:bg-red-800 px-2 py-1 rounded">{isEnglish ? 'Wan Chai' : '湾仔'}</span>
                      <span className="bg-red-100 dark:bg-red-800 px-2 py-1 rounded">{isEnglish ? 'Causeway Bay' : '铜锣湾'}</span>
                      <span className="bg-red-100 dark:bg-red-800 px-2 py-1 rounded">{isEnglish ? 'Admiralty' : '金钟'}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
                      🏙️ {isEnglish ? 'Kowloon' : '九龙'}
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 mb-3">
                      {isEnglish 
                        ? 'Dense urban area known for shopping and cultural attractions.'
                        : '以购物和文化景点闻名的密集城区。'
                      }
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">{isEnglish ? 'Tsim Sha Tsui' : '尖沙咀'}</span>
                      <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">{isEnglish ? 'Mong Kok' : '旺角'}</span>
                      <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">{isEnglish ? 'Yau Ma Tei' : '油麻地'}</span>
                      <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">{isEnglish ? 'Jordan' : '佐敦'}</span>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-3">
                      🌿 {isEnglish ? 'New Territories' : '新界'}
                    </h3>
                    <p className="text-green-800 dark:text-green-200 mb-3">
                      {isEnglish 
                        ? 'Larger area with new towns, country parks, and residential developments.'
                        : '包含新市镇、郊野公园和住宅开发的较大区域。'
                      }
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <span className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">{isEnglish ? 'Sha Tin' : '沙田'}</span>
                      <span className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">{isEnglish ? 'Tuen Mun' : '屯门'}</span>
                      <span className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">{isEnglish ? 'Tai Po' : '大埔'}</span>
                      <span className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">{isEnglish ? 'Yuen Long' : '元朗'}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Special Considerations */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                  {isEnglish ? 'Special Considerations' : '特殊注意事项'}
                </h2>

                <div className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                      {isEnglish ? '🈳 Chinese and English Names' : '🈳 中英文名称'}
                    </h3>
                    <p className="text-yellow-800 dark:text-yellow-200">
                      {isEnglish 
                        ? 'Many buildings and streets have both Chinese and English names. The English name is typically used for international mail.'
                        : '许多建筑物和街道都有中英文名称。国际邮件通常使用英文名称。'
                      }
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-200 mb-2">
                      {isEnglish ? '📮 Postal Codes' : '📮 邮政编码'}
                    </h3>
                    <p className="text-orange-800 dark:text-orange-200">
                      {isEnglish 
                        ? 'Hong Kong does not use postal codes. The detailed address information is sufficient for mail delivery.'
                        : '香港不使用邮政编码。详细的地址信息足以进行邮件投递。'
                      }
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-200 mb-2">
                      {isEnglish ? '🏢 Commercial vs Residential' : '🏢 商业与住宅'}
                    </h3>
                    <p className="text-purple-800 dark:text-purple-200">
                      {isEnglish 
                        ? 'Commercial addresses may include suite numbers, while residential addresses typically use flat designations (A, B, C, etc.).'
                        : '商业地址可能包含套房号码，而住宅地址通常使用单位标识（A、B、C等）。'
                      }
                    </p>
                  </div>
                </div>
              </section>

              {/* Examples */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                  {isEnglish ? 'Address Examples' : '地址示例'}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">
                      {isEnglish ? '🏠 Residential Address' : '🏠 住宅地址'}
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border font-mono text-sm">
                      {isEnglish ? (
                        <>
                          Flat B, 12/F, Happy Valley Mansion<br/>
                          25 Wong Nai Chung Road<br/>
                          Happy Valley, Hong Kong Island<br/>
                          Hong Kong
                        </>
                      ) : (
                        <>
                          B室, 12楼, 跑马地大厦<br/>
                          黄泥涌道25号<br/>
                          跑马地, 香港岛<br/>
                          香港
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">
                      {isEnglish ? '🏢 Commercial Address' : '🏢 商业地址'}
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border font-mono text-sm">
                      {isEnglish ? (
                        <>
                          Suite 2501, 25/F, International Finance Centre<br/>
                          8 Finance Street<br/>
                          Central, Hong Kong Island<br/>
                          Hong Kong
                        </>
                      ) : (
                        <>
                          2501室, 25楼, 国际金融中心<br/>
                          金融街8号<br/>
                          中环, 香港岛<br/>
                          香港
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Conclusion */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                  {isEnglish ? 'Conclusion' : '总结'}
                </h2>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                    {isEnglish ? (
                      'Understanding Hong Kong&apos;s address structure is crucial for effective communication and business operations in this international hub. The system&apos;s complexity reflects the city&apos;s unique history and urban development, but following the standard format ensures accurate mail delivery and professional correspondence.'
                    ) : (
                      '了解香港的地址结构对于在这个国际枢纽进行有效沟通和商业运营至关重要。该系统的复杂性反映了这座城市独特的历史和城市发展，但遵循标准格式可确保准确的邮件投递和专业通信。'
                    )}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    💡 <strong>{isEnglish ? 'Pro Tip' : '专业提示'}</strong>: {isEnglish ? 'When in doubt, include both Chinese and English building names, and always specify the region (Hong Kong Island, Kowloon, or New Territories) for clarity.' : '如有疑问，请同时包含中英文建筑物名称，并始终明确指定地区（香港岛、九龙或新界）以确保清晰。'}
                  </p>
                </div>
              </section>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}