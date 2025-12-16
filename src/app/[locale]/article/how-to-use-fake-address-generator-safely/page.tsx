import { Metadata } from 'next';

interface PageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isEnglish = params.locale === 'en';
  
  return {
    title: isEnglish 
      ? 'How to Use Fake Address Generator Safely - Ultimate Guide'
      : '如何安全地使用虚拟地址生成器 - 终极指南',
    description: isEnglish
      ? 'Learn how to use fake address generators safely for testing, privacy protection, and online registration. Avoid legal risks and understand the difference between valid and fake addresses.'
      : '了解如何安全地使用虚拟地址生成器进行测试、隐私保护和在线注册。避免法律风险，了解有效地址和虚拟地址的区别。',
  };
}

export default function HowToUseFakeAddressPage({ params }: PageProps) {
  const isEnglish = params.locale === 'en';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isEnglish ? 'How to Use Fake Address Generator Safely' : '如何安全地使用虚拟地址生成器'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {isEnglish 
                ? 'A comprehensive guide to using random address tools for development, testing, and privacy protection.'
                : '关于使用随机地址工具进行开发、测试和隐私保护的综合指南。'
              }
            </p>
          </div>

          {/* Article Content */}
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isEnglish ? 'What is a Fake Address Generator?' : '什么是虚拟地址生成器？'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'A fake address generator is a tool that creates realistic-looking but fictitious address data. These addresses typically include a street number, street name, city, state, zip code, and sometimes even a phone number. They are widely used for software testing, database population, and protecting personal privacy during online sign-ups.'
                  : '虚拟地址生成器是一种能够创建看起来真实但实际是虚构的地址数据的工具。这些地址通常包括门牌号、街道名、城市、州、邮政编码，有时甚至包括电话号码。它们被广泛用于软件测试、数据库填充以及在线注册时的个人隐私保护。'
                }
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Legal & Ethical Use Cases' : '合法与合乎道德的使用场景'}
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  <strong>{isEnglish ? 'Software Testing:' : '软件测试：'}</strong>
                  {isEnglish 
                    ? ' Developers use generated addresses to test e-commerce checkout flows, form validations, and shipping APIs without using real customer data.'
                    : ' 开发人员使用生成的地址来测试电子商务结账流程、表单验证和运输API，而无需使用真实的客户数据。'
                  }
                </li>
                <li>
                  <strong>{isEnglish ? 'Privacy Protection:' : '隐私保护：'}</strong>
                  {isEnglish 
                    ? ' When signing up for newsletters, accessing gated content, or testing services where you don\'t want to share your real home address.'
                    : ' 订阅时事通讯、访问门槛内容或测试服务时，如果你不想分享真实的家庭住址。'
                  }
                </li>
                <li>
                  <strong>{isEnglish ? 'Demonstrations:' : '演示：'}</strong>
                  {isEnglish 
                    ? ' Creating tutorial videos or screenshots where PII (Personally Identifiable Information) needs to be hidden.'
                    : ' 制作教程视频或截图时，需要隐藏PII（个人身份信息）。'
                  }
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'Risks to Avoid' : '需要避免的风险'}
              </h2>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-red-800 dark:text-red-200">
                  <strong>{isEnglish ? 'Warning:' : '警告：'}</strong>
                </p>
                <p className="text-red-700 dark:text-red-300 mt-2">
                  {isEnglish 
                    ? 'Never use fake addresses for legal documents, banking, credit card applications, or government registrations. This constitutes fraud and is illegal.'
                    : '切勿将虚拟地址用于法律文件、银行、信用卡申请或政府注册。这构成欺诈，是违法的。'
                  }
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                {isEnglish ? 'How to Verify if an Address is Valid?' : '如何验证地址是否有效？'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {isEnglish 
                  ? 'While our generator creates addresses that follow the correct format (syntax), they may not be deliverable. To verify if an address is real and deliverable, you should use official validation services like the USPS API (for US addresses) or Google Maps API.'
                  : '虽然我们的生成器创建的地址遵循正确的格式（语法），但它们可能无法投递。要验证地址是否真实可投递，你应该使用官方验证服务，如USPS API（针对美国地址）或Google Maps API。'
                }
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
