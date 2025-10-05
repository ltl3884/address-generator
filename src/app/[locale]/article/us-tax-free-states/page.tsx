import { Metadata } from 'next';

interface PageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isEnglish = params.locale === 'en';
  
  return {
    title: isEnglish ? 'Why Delaware is the Best Tax-Free State?' : '为什么特拉华州是最佳免税州？',
    description: isEnglish 
      ? 'Discover why Delaware stands out as the premier tax-free state for businesses and individuals. Learn about its unique advantages, business-friendly policies, and strategic benefits.'
      : '了解为什么特拉华州是企业和个人的首选免税州。了解其独特优势、商业友好政策和战略利益。',
  };
}

export default function UsTaxFreeStatesPage({ params }: PageProps) {
  const isEnglish = params.locale === 'en';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isEnglish ? 'Introduction to US Tax-Free States' : '美国免税州简介'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {isEnglish 
                ? 'Learn about the detailed information of various tax-free states in the US, including tax policies and residential advantages'
                : '了解美国免税州的详细信息，包括各州的税收政策和优势'
              }
            </p>
          </div>

          {/* Article Content */}
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isEnglish ? 'What are Tax-Free States?' : '什么是免税州？'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'In the United States, any product purchased at retail or online is subject to sales tax, with rates varying by state and reaching up to 10%. However, there are 5 states with no state-level sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. These states compensate for fiscal revenue through other forms of taxation (such as property tax, income tax, or business income tax).'
                  : '在美国，在零售或在线购买的任何产品均需缴纳销售税，税率因州而异，最高可达 10%。但有 5 个州没有州级销售税：阿拉斯加、特拉华、蒙大拿、新罕布什尔和俄勒冈。这些州通过其他税收形式（如财产税、收入税或营业收入税）弥补财政收入。'
                }
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Sales Tax Policies by State' : '各州的销售税政策'}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                        {isEnglish ? 'State' : '州'}
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                        {isEnglish ? 'State Sales Tax' : '州销售税'}
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                        {isEnglish ? 'Local Sales Tax' : '地方销售税'}
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                        {isEnglish ? 'Digital Goods Tax Features' : '数字商品税特点'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'Alaska' : '阿拉斯加 (Alaska)'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'None' : '无'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'Some areas have up to 7.5%' : '部分地区有，最高7.5%'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish 
                          ? 'Digital goods may be covered by local sales tax in ARSSTC jurisdictions, depending on delivery location.'
                          : '数字商品可能在 ARSSTC 司法管辖区内被地方销售税覆盖，具体取决于交付地点。'
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'Delaware' : '特拉华 (Delaware)'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'None' : '无'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'None' : '无'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish 
                          ? 'Digital goods are completely tax-free, with no state or local sales tax.'
                          : '数字商品完全免税，无任何州或地方销售税。'
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'Montana' : '蒙大拿 (Montana)'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'None' : '无'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'None' : '无'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish 
                          ? 'Digital goods have no state or local sales tax, consumers are tax-free.'
                          : '数字商品无州或地方销售税，消费者免税。'
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'New Hampshire' : '新罕布什尔 (New Hampshire)'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'None' : '无'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'None' : '无'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish 
                          ? 'Digital goods are completely tax-free, but some services (like telecommunications) may involve other taxes.'
                          : '数字商品完全免税，但某些服务（如电信）可能涉及其他税种。'
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'Oregon' : '俄勒冈 (Oregon)'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'None' : '无'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish ? 'None' : '无'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {isEnglish 
                          ? 'Digital goods are completely tax-free, with no sales tax.'
                          : '数字商品完全免税，无任何销售税。'
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Detailed State Introductions' : '详细州介绍'}
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'Alaska' : '阿拉斯加 (Alaska)'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'Although Alaska has no state sales tax, it allows local governments to impose local sales tax, with rates typically ranging from 0% to 7.5%. According to the Alaska Municipal Sales Tax Program, all digital goods and services delivered to ARSSTC jurisdictions should be subject to sales tax. This ARSSTC is a local government alliance that coordinates remote sales tax, and as of now, it is estimated that over 100 communities may have local sales tax. Consumers need to check the specific tax rate for their location, for example, Juneau has a local sales tax rate of 5%.'
                  : '阿拉斯加虽然没有州销售税，但是它允许地方政府征收地方销售税，税率通常在 0% 到 7.5% 之间。根据 Alaska Municipal Sales Tax Program 的规定，所有交付到 ARSSTC 司法管辖区的数字商品和服务应征收销售税。这个 ARSSTC 是一个协调远程销售税的地方政府联盟，截至目前，估计有超过 100 个社区可能有地方销售税。消费者需要检查其所在地的具体税率，例如朱诺 (Juneau) 的地方销售税率为 5%。'
                }
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                <strong>{isEnglish ? 'Note:' : '注意：'}</strong>
                {isEnglish 
                  ? 'If you filled in an Alaska address when registering your Apple ID, you might need to pay tax on in-app purchases later. It depends on which city you filled in at the time.'
                  : '如果你在注册 Apple ID 时填了阿拉斯加的地址，那就有可能后续在内购时需要缴税。具体要看你当时填的是哪个城市。'
                }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'Delaware' : '特拉华 (Delaware)'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'Delaware has no state sales tax and no local sales tax, with tax-free policies that have remained unchanged for a long time. It is one of the five completely sales tax-free states in the United States. For users, Delaware provides the simplest zero-tax environment without worrying about any additional taxes.'
                  : '特拉华没有州销售税，也没有地方销售税，且免税政策长期保持不变，是美国五个完全免销售税的州之一。对于用户来说，特拉华提供最简单的零税环境，无需担心任何附加税费。'
                }
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'Digital goods (such as Steam in-app purchases, Pornhub subscriptions, ChatGPT upgrades, etc.) are completely tax-free in Delaware, and consumers do not need to pay any sales tax when purchasing. This makes it a popular choice for digital goods purchases.'
                  : '数字商品（如 Steam 内购、Pornhub 订阅、升级 ChatGPT等）在特拉华完全免税，消费者在购买时无需支付任何销售税。这使其成为数字商品购买的热门选择。'
                }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'Montana' : '蒙大拿 (Montana)'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'Montana has no state sales tax and no local sales tax applicable to digital goods. Some cities and resort areas may impose local sales tax on specific goods (such as clothing), but digital goods are explicitly exempt.'
                  : '蒙大拿没有州销售税，也没有地方销售税适用于数字商品。一些城市和度假区可能对特定商品（如服装）征收地方销售税，但数字商品明确免税。'
                }
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'According to the Montana Sales Tax Guide, digital services including Software as a Service (SaaS) are not affected by state or local sales tax. Consumers purchasing items like Google Play in-app purchases or ChatGPT Plus do not need to pay sales tax.'
                  : '根据 Montana Sales Tax Guide，数字服务包括软件即服务 (SaaS) 等，不受州或地方销售税影响。消费者购买如 Google Play 内购或 ChatGPT Plus 时，无需支付销售税。'
                }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'New Hampshire' : '新罕布什尔 (New Hampshire)'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'New Hampshire has no general sales tax and no local sales tax, but imposes specific taxes on certain goods and services (such as dining and accommodation). Digital goods (such as e-books, streaming subscriptions) are completely tax-free. Software downloads and subscription services do not involve sales tax, but some telecommunications-related digital services may have other taxes (such as 9% dining tax), but this does not affect general digital goods.'
                  : '新罕布什尔没有一般销售税，也没有地方销售税，但对某些商品和服务（如餐饮、住宿）征收特定税。数字商品（如电子书、流媒体订阅）完全免税。软件下载和订阅服务不涉及销售税，但某些电信相关数字服务可能有其他税种（如 9% 的餐饮税），但不影响一般数字商品。'
                }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                {isEnglish ? 'Oregon' : '俄勒冈 (Oregon)'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'Oregon has no state sales tax and no local general sales tax, with legislation repeatedly refusing to introduce sales tax. Digital goods are completely tax-free, including downloaded software, subscription services, and in-app purchases. Some cities may have local taxes on prepared foods, but this does not apply to digital goods.'
                  : '俄勒冈没有州销售税，也没有地方一般销售税，立法多次拒绝引入销售税。数字商品完全免税，包括下载软件、订阅服务和应用内购。一些城市对预制食品可能有地方税，但不适用于数字商品。'
                }
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Advantages of Digital Goods Purchases' : '数字商品购买优势'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'For users who frequently purchase digital goods, choosing tax-free state addresses can bring significant cost savings:'
                  : '对于经常购买数字商品的用户来说，选择免税州地址可以带来显著的成本节省：'
                }
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <li>
                  <strong>{isEnglish ? 'Software Subscriptions:' : '软件订阅：'}</strong>
                  {isEnglish ? 'Such as Adobe Creative Suite, Microsoft Office, etc.' : '如 Adobe Creative Suite、Microsoft Office 等'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Gaming In-App Purchases:' : '游戏内购：'}</strong>
                  {isEnglish ? 'Steam, Epic Games, mobile games, etc.' : 'Steam、Epic Games、手机游戏等'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Streaming Services:' : '流媒体服务：'}</strong>
                  {isEnglish ? 'Netflix, Spotify, YouTube Premium, etc.' : 'Netflix、Spotify、YouTube Premium 等'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Online Services:' : '在线服务：'}</strong>
                  {isEnglish ? 'ChatGPT Plus, cloud storage services, etc.' : 'ChatGPT Plus、云存储服务等'}
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Important Notes' : '注意事项'}
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-6">
                <p className="text-yellow-800 dark:text-yellow-200">
                  <strong>{isEnglish ? 'Important Reminder:' : '重要提醒：'}</strong>
                  {isEnglish 
                    ? 'When using tax-free state addresses for purchases, please ensure compliance with relevant laws and regulations. Some services may require real residential addresses, please use reasonably according to specific circumstances.'
                    : '使用免税州地址进行购买时，请确保遵守相关法律法规。某些服务可能要求真实的居住地址，请根据具体情况合理使用。'
                  }
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Conclusion' : '结论'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'US sales tax-free states provide significant shopping advantages for consumers, especially in digital goods purchases. Delaware, Montana, New Hampshire, and Oregon provide completely tax-free environments, while Alaska requires attention to local tax situations. Understanding these states\' tax policies can help consumers save shopping costs legally.'
                  : '美国的销售税免税州为消费者提供了显著的购物优势，特别是在数字商品购买方面。特拉华、蒙大拿、新罕布什尔和俄勒冈提供完全免税的环境，而阿拉斯加则需要注意地方税的情况。了解这些州的税收政策可以帮助消费者在合法的前提下节省购物成本。'
                }
              </p>
            </div>
          </article>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <a
              href={`/${params.locale}`}
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span className="material-icons mr-2">arrow_back</span>
              {isEnglish ? 'Back to Home' : '返回首页'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}