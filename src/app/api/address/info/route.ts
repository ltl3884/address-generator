import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AddressService } from '@/lib/services/addressService';

// 请求验证schema
const AddressRequestSchema = z.object({
  country: z.string().min(1, 'Country parameter is required'),
  place: z.string().optional(),
});

// 响应数据类型
interface AddressResponse {
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

// API响应类型
interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json();

    // 验证请求数据
    const validationResult = AddressRequestSchema.safeParse(body);
    if (!validationResult.success) {
      const response: ApiResponse<null> = {
        code: 400,
        message: 'Country parameter is required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { country, place } = validationResult.data;

    let addressData;

    if (place && place.trim()) {
      // 如果有place参数，执行地点搜索
      addressData = await AddressService.getAddressByCountryAndPlace(country, place.trim());

      if (!addressData) {
        const response: ApiResponse<null> = {
          code: 404,
          message: 'No address found for the specified location',
        };
        return NextResponse.json(response, { status: 200 });
      }
    } else {
      // 没有place参数，使用随机选择
      addressData = await AddressService.getRandomAddressByCountry(country);

      if (!addressData) {
        const response: ApiResponse<null> = {
          code: 404,
          message: `No address found for country: ${country}`,
        };
        return NextResponse.json(response, { status: 200 });
      }
    }

    // 构造响应数据
    const addressResponse: AddressResponse = addressData;

    const successResponse: ApiResponse<AddressResponse> = {
      code: 200,
      message: 'Success',
      data: addressResponse,
    };

    return NextResponse.json(successResponse);

  } catch (error) {
    console.error('Error in address API:', error);

    const errorResponse: ApiResponse<null> = {
      code: 500,
      message: 'Internal server error',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}