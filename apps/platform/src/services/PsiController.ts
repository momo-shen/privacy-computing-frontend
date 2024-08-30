import request from 'umi-request';

export async function getListProject() {
    return request('/pc/api/psi/request/list', {
        method: 'GET'
    });
}