import request from '@/utils/request';
import api from '@/utils/api';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export interface LoginData {
  data: any;
  method: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function loginAction(params: LoginData):  Promise<any> {
  return api('public/index.php/loginAction', params);
}