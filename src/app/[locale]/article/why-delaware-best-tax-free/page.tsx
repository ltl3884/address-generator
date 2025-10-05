import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isEnglish = params.locale === 'en';
  
  return {
    title: isEnglish 
      ? 'Why Delaware is the Best Tax-Free State? - US Address Generator'
      : '为什么特拉华是最好的免税州? - US Address Generator',
    description: isEnglish
      ? 'In-depth analysis of Delaware\'s tax advantages, business environment, and registration convenience to understand why it\'s considered the best tax-free state.'
      : '深入分析特拉华州的税收优势、商业环境和注册便利性，了解为什么它被认为是最佳免税州。',
  };
}

export default function WhyDelawareBestTaxFreePage({ params }: Props) {
  const t = useTranslations();
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
              {isEnglish ? 'Why Delaware is the Best Tax-Free State?' : '为什么特拉华是最好的免税州?'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {isEnglish 
                ? 'In-depth analysis of Delaware\'s tax advantages, business environment, and registration convenience'
                : '深入分析特拉华州的税收优势、商业环境和注册便利性'
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
                      Among the five tax-free states in the United States, <strong>Delaware stands out as the simplest zero-tax environment</strong>. 
                      Unlike other tax-free states that may have local tax variations or specific service taxes, Delaware offers 
                      a truly consistent and straightforward tax-free experience for both consumers and businesses.
                    </>
                  ) : (
                    <>
                      在美国的五个免税州中，<strong>特拉华州以其最简单的零税环境脱颖而出</strong>。
                      与其他可能存在地方税差异或特定服务税的免税州不同，特拉华州为消费者和企业提供了
                      真正一致且简单的免税体验。
                    </>
                  )}
                </p>
              </section>

              {/* Core Advantages */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                  {isEnglish ? '🎯 Core Advantages of Delaware' : '🎯 特拉华州的核心优势'}
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-3">
                      {isEnglish ? '💰 Complete Tax Exemption' : '💰 完全免税'}
                    </h3>
                    <ul className="text-green-800 dark:text-green-200 space-y-2">
                      <li>• {isEnglish ? 'No state sales tax at all' : '完全没有州销售税'}</li>
                      <li>• {isEnglish ? 'No local sales tax variations' : '没有地方销售税变化'}</li>
                      <li>• {isEnglish ? 'Clear exemption for digital goods' : '数字商品明确免税'}</li>
                      <li>• {isEnglish ? 'No hidden fees or additional taxes' : '没有隐藏费用或附加税'}</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
                      {isEnglish ? '🏢 Business-Friendly Environment' : '🏢 商业友好环境'}
                    </h3>
                    <ul className="text-blue-800 dark:text-blue-200 space-y-2">
                      <li>• {isEnglish ? 'World-renowned corporate law system' : '世界知名的公司法体系'}</li>
                      <li>• {isEnglish ? 'Court of Chancery for business disputes' : '专门的商业纠纷法院'}</li>
                      <li>• {isEnglish ? 'Flexible corporate structures' : '灵活的公司结构'}</li>
                      <li>• {isEnglish ? 'Strong privacy protection' : '强大的隐私保护'}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Detailed Comparison */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                  {isEnglish ? 'Detailed Comparison with Other Tax-Free States' : '与其他免税州的详细对比'}
                </h2>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {isEnglish 
                    ? 'While the US has five tax-free states, Delaware has clear advantages in digital goods purchasing and overall tax environment:'
                    : '虽然美国有五个免税州，但在数字商品购买和整体税收环境方面，特拉华州具有明显优势：'
                  }
                </p>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                  🏆 {isEnglish ? 'Delaware' : '特拉华州 (Delaware)'}
                </h3>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500 mb-6">
                  <ul className="list-disc list-inside text-green-800 dark:text-green-200 space-y-2">
                    <li><strong>{isEnglish ? 'Complete tax exemption' : '完全免税'}</strong>：{isEnglish ? 'No sales tax at state and local levels' : '州和地方层面都完全没有销售税'}</li>
                    <li><strong>{isEnglish ? 'Digital goods tax-free' : '数字商品免税'}</strong>：{isEnglish ? 'Clear exemption for all digital goods and services' : '对所有数字商品和服务明确免税'}</li>
                    <li><strong>{isEnglish ? 'Policy consistency' : '政策一致性'}</strong>：{isEnglish ? 'Unified tax policy statewide, no local differences' : '全州统一税收政策，无地方差异'}</li>
                    <li><strong>{isEnglish ? 'Stability' : '稳定性'}</strong>：{isEnglish ? 'Long-term stable tax-free policy, no policy uncertainty' : '免税政策长期稳定，无政策不确定性'}</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                  ⚠️ {isEnglish ? 'Alaska' : '阿拉斯加州 (Alaska)'}
                </h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
                  <ul className="list-disc list-inside text-yellow-800 dark:text-yellow-200 space-y-2">
                    <li><strong>{isEnglish ? 'Local tax variables' : '地方税变量'}</strong>：{isEnglish ? 'While no state sales tax, local governments can impose up to 7.5% local sales tax' : '虽然没有州销售税，但地方政府可征收最高达7.5%的地方销售税'}</li>
                    <li><strong>{isEnglish ? 'Digital goods complexity' : '数字商品复杂性'}</strong>：{isEnglish ? 'ARSSTC may require taxation on remote sales (including digital goods) in certain jurisdictions' : 'Alaska Remote Seller Sales Tax Commission (ARSSTC) 可能要求在某些司法管辖区对远程销售（包括数字商品）征税'}</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                  🔶 {isEnglish ? 'New Hampshire' : '新罕布什尔州 (New Hampshire)'}
                </h3>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500 mb-6">
                  <ul className="list-disc list-inside text-orange-800 dark:text-orange-200 space-y-2">
                    <li><strong>{isEnglish ? 'Service tax exceptions' : '服务税例外'}</strong>：{isEnglish ? 'Imposes additional taxes on specific services (e.g., 9% on meals and lodging)' : '对特定服务（如餐饮、住宿、电信）征收额外税（例如9%的餐饮和住宿税）'}</li>
                    <li><strong>{isEnglish ? 'Potential impact' : '潜在影响'}</strong>：{isEnglish ? 'Service taxes may extend to certain digital services (e.g., telecom-related subscriptions)' : '服务税可能延伸到某些数字服务（如电信相关的订阅）'}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {isEnglish ? 'Summary: Why Delaware is the Best Choice?' : '总结：为什么特拉华是最佳选择？'}
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>{isEnglish ? 'Consistency' : '一致性'}</strong>：{isEnglish ? 'Delaware is the only state with complete absence of sales tax at both state and local levels' : '特拉华是唯一一个在州和地方层面都完全没有销售税的州'}</li>
                    <li><strong>{isEnglish ? 'No additional tax interference' : '无附加税干扰'}</strong>：{isEnglish ? 'Unlike New Hampshire with specific service taxes, or Alaska with local tax variables' : '不像新罕布什尔有特定服务税，或阿拉斯加有地方税变量'}</li>
                    <li><strong>{isEnglish ? 'True zero tax' : '真正的零税'}</strong>：{isEnglish ? 'Consumer tax burden is truly zero, with no hidden "additional fees"' : '对消费者的税负是真正的零，没有隐藏的"附加税费"'}</li>
                  </ul>
                </div>
              </section>

              {/* Conclusion */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                  {isEnglish ? 'Conclusion: Delaware\'s Unique Advantages' : '结论：特拉华州的独特优势'}
                </h2>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
                    🎯 {isEnglish ? 'The Simplest Zero-Tax Environment' : '最简单的零税环境'}
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 mb-4 leading-relaxed">
                    {isEnglish ? (
                      'Delaware provides the simplest and most consistent zero-tax environment in the United States. Compared to other tax-free states, Delaware has no complex local tax variables, no specific service tax exceptions, and no policy uncertainty. This simplicity is extremely attractive to both consumers and businesses.'
                    ) : (
                      '特拉华州提供了美国最简单、最一致的零税环境。与其他免税州相比，特拉华州没有复杂的地方税变量、没有特定服务税例外、也没有政策不确定性。这种简单性对消费者和企业都极具吸引力。'
                    )}
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {isEnglish ? (
                    'In the digital economy era, Delaware\'s zero-tax policy provides the best environment for online shopping, digital service subscriptions, and e-commerce. Whether you are an individual consumer or business operator, Delaware can provide the simplest and most reliable tax-free solution.'
                  ) : (
                    '在数字经济时代，特拉华州的零税政策为在线购物、数字服务订阅和电子商务提供了最佳环境。无论您是个人消费者还是企业经营者，特拉华州都能提供最简单、最可靠的免税解决方案。'
                  )}
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    💡 <strong>{isEnglish ? 'The reason to choose Delaware is simple' : '选择特拉华州的理由很简单'}</strong>：{isEnglish ? 'It is the only state that truly provides a "zero complexity" tax-free environment, allowing you to focus on shopping or business operations without worrying about complex tax issues.' : '它是唯一一个真正提供"零复杂性"免税环境的州，让您可以专注于购物或经营，而不必担心复杂的税收问题。'}
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