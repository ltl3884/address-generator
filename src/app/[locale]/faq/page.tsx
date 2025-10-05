import { generatePageMetadata } from '@/lib/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'faq');
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "生成的地址信息是真实的吗？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "生成的地址信息基于真实的地理位置和邮编数据，但个人信息（如姓名、电话）是随机生成的虚拟信息，仅供测试和学习使用。"
        }
      },
      {
        "@type": "Question", 
        "name": "如何生成指定州的地址？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "在搜索框中输入州名或城市名，即可生成该地区的随机地址。例如输入Delaware生成特拉华州地址，输入Los Angeles生成洛杉矶地址。"
        }
      },
      {
        "@type": "Question",
        "name": "支持哪些国家和地区的地址生成？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "目前支持美国、加拿大、英国、新加坡、台湾、香港等6个国家和地区的地址生成，覆盖主要的英语和中文地区。"
        }
      },
      {
        "@type": "Question",
        "name": "什么是美国免税州？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "美国免税州是指不征收州销售税的州，包括特拉华州、蒙大拿州、新罕布什尔州、俄勒冈州和阿拉斯加州。这些州的地址常用于电商注册和税务优化。"
        }
      },
      {
        "@type": "Question",
        "name": "生成的地址可以用于什么用途？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "生成的虚拟地址主要用于软件测试、网站注册、学习研究等合法用途。请勿用于任何违法活动或欺诈行为。"
        }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData)
        }}
      />
      
      <h1 className="text-3xl font-bold mb-8 text-center">常见问题解答</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            🤔 生成的地址信息是真实的吗？
          </h2>
          <p className="text-gray-700 leading-relaxed">
            生成的地址信息基于真实的地理位置和邮编数据，确保地址格式的准确性。但个人信息（如姓名、电话号码）是随机生成的虚拟信息，仅供测试和学习使用，不对应真实的个人或企业。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            🗺️ 如何生成指定州或城市的地址？
          </h2>
          <p className="text-gray-700 leading-relaxed">
            在搜索框中输入州名或城市名，即可生成该地区的随机地址。例如：
          </p>
          <ul className="mt-2 ml-4 text-gray-700">
            <li>• 输入 "Delaware" 生成特拉华州地址</li>
            <li>• 输入 "Los Angeles" 生成洛杉矶地址</li>
            <li>• 输入 "New York" 生成纽约地址</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            🌍 支持哪些国家和地区？
          </h2>
          <p className="text-gray-700 leading-relaxed">
            目前支持以下6个国家和地区的地址生成：
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">🇺🇸 美国</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">🇨🇦 加拿大</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">🇬🇧 英国</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">🇸🇬 新加坡</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">🇹🇼 台湾</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">🇭🇰 香港</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            💰 什么是美国免税州？
          </h2>
          <p className="text-gray-700 leading-relaxed">
            美国免税州是指不征收州销售税的州，包括：
          </p>
          <ul className="mt-2 ml-4 text-gray-700">
            <li>• <strong>特拉华州 (Delaware)</strong> - 最受欢迎的免税州</li>
            <li>• <strong>蒙大拿州 (Montana)</strong> - 西部免税州</li>
            <li>• <strong>新罕布什尔州 (New Hampshire)</strong> - 东北部免税州</li>
            <li>• <strong>俄勒冈州 (Oregon)</strong> - 西海岸免税州</li>
            <li>• <strong>阿拉斯加州 (Alaska)</strong> - 最北免税州</li>
          </ul>
          <p className="mt-3 text-gray-700">
            这些州的地址常用于电商注册、税务优化等合法商业用途。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            ⚖️ 生成的地址可以用于什么用途？
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-green-600">✅ 合法用途：</h3>
              <ul className="ml-4 text-gray-700">
                <li>• 软件开发和测试</li>
                <li>• 网站功能测试</li>
                <li>• 学习和研究目的</li>
                <li>• 表单填写练习</li>
                <li>• 数据库测试数据</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-red-600">❌ 禁止用途：</h3>
              <ul className="ml-4 text-gray-700">
                <li>• 任何形式的欺诈活动</li>
                <li>• 虚假身份注册</li>
                <li>• 违法商业活动</li>
                <li>• 侵犯他人权益</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            💾 如何保存生成的地址？
          </h2>
          <p className="text-gray-700 leading-relaxed">
            点击地址信息下方的&ldquo;保存&rdquo;按钮，即可将生成的地址保存到本地浏览器。保存的地址可以在&ldquo;我的保存地址&rdquo;页面查看和管理，支持批量删除和导出功能。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            🔒 数据安全和隐私保护
          </h2>
          <p className="text-gray-700 leading-relaxed">
            我们重视用户隐私和数据安全。所有生成的地址信息都是虚拟数据，不会收集或存储用户的真实个人信息。保存的地址仅存储在用户本地浏览器中，我们的服务器不会保存任何用户数据。
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">还有其他问题？</h3>
          <p className="text-blue-600">
            如果您有其他问题或建议，欢迎通过邮件联系我们。我们会持续改进产品，为您提供更好的服务。
          </p>
        </div>
      </div>
    </div>
  );
}