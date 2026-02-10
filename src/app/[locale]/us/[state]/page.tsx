import { Metadata } from 'next';
import AddressGenerator from '@/components/AddressGenerator';

interface USStatePageProps {
  params: Promise<{
    state: string;
    locale: string;
  }>;
}

// 生成静态参数，用于预渲染所有美国州
export async function generateStaticParams() {
  // 美国所有州的缩写和全名
  const stateData = [
    { code: 'AK', name: 'Alaska' },
    { code: 'AL', name: 'Alabama' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'IA', name: 'Iowa' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MD', name: 'Maryland' },
    { code: 'ME', name: 'Maine' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MT', name: 'Montana' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NY', name: 'New York' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VA', name: 'Virginia' },
    { code: 'VT', name: 'Vermont' },
    { code: 'WA', name: 'Washington' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WY', name: 'Wyoming' },
    { code: 'PHX', name: 'Phoenix' },
    { code: 'HOU', name: 'Houston' },
    { code: 'CHI', name: 'Chicago' },
    { code: 'LA', name: 'Los Angeles' },
    { code: 'NYC', name: 'New York' }
  ];
  
  // 返回州代码和州名的所有组合，包括 URL 编码版本
  const allStates: { state: string }[] = [];
  stateData.forEach(state => {
    // 添加原始代码和名称
    allStates.push({ state: state.code });
    allStates.push({ state: state.name });
    
    // 添加 URL 编码版本（用于包含空格的名称）
    if (state.name.includes(' ')) {
      allStates.push({ state: encodeURIComponent(state.name) });
    }
    if (state.code.includes(' ')) {
      allStates.push({ state: encodeURIComponent(state.code) });
    }
  });
  
  return allStates;
}

export async function generateMetadata({ params }: USStatePageProps): Promise<Metadata> {
  const { state } = await params;
  const decodedState = decodeURIComponent(state);
  
  return {
    title: `${decodedState} Address Generator - Free Real US Address`,
    description: `Generate random ${decodedState} addresses with Zip Code, City, and Phone Number. Free tool for testing and verification purposes.`,
    keywords: `${decodedState} address generator, ${decodedState} fake address, random address in ${decodedState}, us address generator`,
    openGraph: {
      title: `${decodedState} Address Generator - Free Real US Address`,
      description: `Generate random ${decodedState} addresses with Zip Code, City, and Phone Number.`,
    }
  };
}

export default async function USStatePage({ params }: USStatePageProps) {
  // AddressGenerator组件会自动从URL路径中解析州名参数
  // params 参数用于静态生成，组件内部通过路由解析
  const { state } = await params;
  const decodedState = decodeURIComponent(state);
  
  return <AddressGenerator h1Title={`${decodedState} Address Generator`} />;
}