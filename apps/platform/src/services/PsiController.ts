import request from 'umi-request';

export async function getProjectList(userId: string) {
    return request('/pc/api/psi/project/list', {
        method: 'GET',
        params: { userId: userId },
    });
}

export async function createProject(psiProject: API.PsiProject) {
    return request('/pc/api/psi/project/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(psiProject),
    });
}

export async function handleProject(id: string, action: string, receiverOutputPath: string) {
    return request(`/pc/api/psi/project/${id}/action`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({ action: action, receiverOutputPath: receiverOutputPath }),
    });
}

export async function getIp() {
    return request('/pc/api/psi/ip', {
        method: 'GET',
    });
}