import request from 'umi-request';

export async function getProjectList(ownerId: string) {
    return request('/pc/api/psi/request/list', {
        method: 'GET',
        params: { ownerId: ownerId },
    });
}

export async function createProject(psiReqeust: API.PsiReqeust) {
    return request('/pc/api/psi/request/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(psiReqeust),
    });
}

export async function handleProject(id: number, action: string) {
    return request(`/pc/api/psi/request/${id}/action`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({ action: action }),
    });
}