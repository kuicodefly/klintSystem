import request  from 'umi-request';

interface RequestData {
    data?: any;
    method: string;
}

 const api = function(url: string, data:RequestData, host?: string) {
    let baseHost = host || 'http://123.56.175.2:88/';

    return new Promise((resolve, reject) => {
        if (data.method === 'post') {
            request.post(`${baseHost}${url}`, {
               data: data.data
            }).then(function(response) {
                resolve(response);
            })
            .catch(function(error) {
                reject(error);
            });
        } else {
            request.get(`${baseHost}${url}`, {
                params: data.data
            }).then(function(response) {
                resolve(response);
            })
            .catch(function(error) {
                reject(error);
            });
        }
    })
}
export default api;