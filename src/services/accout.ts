import api from '@/utils/api';
import request from 'umi-request';
import {LoginData} from '@/services/login';

export async function  fetchAccountList (data: LoginData): Promise<any> {
    return api('public/index.php/fetchAccountList', data);
}
export async function  qeurySomeAccount(data: LoginData): Promise<any> {
    return api('public/index.php/qeurySomeAccount', data);
}
export async function  createNewAccount(data: LoginData): Promise<any> {
    return api('public/index.php/createAccount', data);
}
export async function  deleteAccount(data: LoginData): Promise<any> {
    return api('public/index.php/deleteAccount', data);
}
export async function  queryAccountDetail(data: LoginData): Promise<any> {
    return api('public/index.php/queryAccountDetail', data);
}
export async function  sendEmail(data: LoginData): Promise<any> {
    return api('public/index.php/sendEmail', data);
}
export async function  queryUser(data: LoginData): Promise<any> {
    return api('public/index.php/currentUser', data);
}
export async function  queryUserAsync(data: LoginData) {
    console.log(data);
    return request.get(' http://123.56.175.2:88/public/index.php/currentUser', {
        params: {
            ...data
        }
    })
    .then(response => {return response})
}
