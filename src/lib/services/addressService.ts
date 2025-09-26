import { PrismaClient } from '@prisma/client';

// 开发环境启用查询日志
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

export interface AddressData {
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

export class AddressService {
  /**
   * 将字符串转换为标题格式
   * @param str 要转换的字符串
   * @returns 标题格式的字符串（每个单词首字母大写）
   */
  static to_camel(str: string): string {
    if (!str) return '';
    
    return str
      .toLowerCase()
      .split(/[\s\-_]+/) // 按空格、连字符、下划线分割
      .map(word => {
        if (word.length === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1); // 每个单词首字母大写
      })
      .join(' '); // 用空格连接单词
  }
  /**
   * 根据国家随机获取地址信息
   * @param country 国家代码
   * @returns 随机地址信息或null
   */
  static async getRandomAddressByCountry(country: string): Promise<AddressData | null> {
    try {
      // 清理国家参数
      const cleanCountry = country.replace(/\//g, '').trim();

      // 使用原生SQL查询实现随机选择（MySQL语法）
      const addressInfo = await prisma.$queryRaw`
        SELECT * FROM address_info
        WHERE country = ${cleanCountry}
        ORDER BY RAND()
        LIMIT 1
      ` as Array<{
        full_name: string;
        gender: string;
        birthday: string;
        address: string;
        telephone: string | null;
        city: string | null;
        zip_code: string | null;
        state: string | null;
        state_full: string | null;
        country: string;
      }>;

      if (addressInfo.length === 0) {
        return null;
      }

      const address = addressInfo[0];

      return {
        fullName: address.full_name,
        gender: address.gender,
        birthday: address.birthday,
        address: address.address,
        telephone: address.telephone || '',
        city: AddressService.to_camel(address.city || ''),
        zipCode: address.zip_code || '',
        state: address.state || '',
        stateFull: address.state_full || '',
        country: address.country,
      };
    } catch (error) {
      console.error('Error fetching random address:', error);
      throw error;
    }
  }

  /**
   * 根据国家和地点搜索地址信息
   * @param country 国家代码
   * @param place 地点名称（城市、州名或州全称）
   * @returns 地址信息或null
   */
  static async getAddressByCountryAndPlace(country: string, place: string): Promise<AddressData | null> {
    try {
      // 清理参数
      const cleanCountry = country.replace(/\//g, '').trim();
      const cleanPlace = place.trim();

      // 使用原生SQL查询实现地点搜索（MySQL语法）
      const addressInfo = await prisma.$queryRaw`
        SELECT * FROM address_info
        WHERE country = ${cleanCountry}
        AND (
          city = ${cleanPlace}
          OR state = ${cleanPlace}
          OR state_full = ${cleanPlace}
        )
        ORDER BY RAND()
        LIMIT 1
      ` as Array<{
        full_name: string;
        gender: string;
        birthday: string;
        address: string;
        telephone: string | null;
        city: string | null;
        zip_code: string | null;
        state: string | null;
        state_full: string | null;
        country: string;
      }>;

      if (addressInfo.length === 0) {
        return null;
      }

      const address = addressInfo[0];

      return {
        fullName: address.full_name,
        gender: address.gender,
        birthday: address.birthday,
        address: address.address,
        telephone: address.telephone || '',
        city: AddressService.to_camel(address.city || ''),
        zipCode: address.zip_code || '',
        state: address.state || '',
        stateFull: address.state_full || '',
        country: address.country,
      };
    } catch (error) {
      console.error('Error searching address by place:', error);
      throw error;
    }
  }

}