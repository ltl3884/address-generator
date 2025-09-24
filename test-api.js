// 简单的API测试脚本
const testApi = async () => {
  console.log('开始测试API...');

  try {
    // 测试成功的请求
    console.log('\n1. 测试成功请求 (us):');
    const successResponse = await fetch('http://localhost:3000/api/address/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country: 'us' }),
    });

    const successData = await successResponse.json();
    console.log('状态:', successResponse.status);
    console.log('响应:', JSON.stringify(successData, null, 2));

  } catch (error) {
    console.error('测试失败:', error.message);
    console.log('请确保开发服务器正在运行 (npm run dev)');
  }
};

testApi();