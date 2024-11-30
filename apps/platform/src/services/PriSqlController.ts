import request from 'umi-request';

export async function getProjectList(userId: string) {
  return request('/pc/api/prisql/project/list', {
    method: 'GET',
    params: { userId: userId },
  });
}

export async function handleProject(memberStatusId: string, action: string) {
  return request(`/pc/api/prisql/project/${memberStatusId}/action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ action: action }),
  });
}

export async function createProject(priSqlProject: API.PriSqlProject) {
  return request('/pc/api/prisql/project/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(priSqlProject),
  });
}

export async function getMemberStatusList(projectId: string) {
  return request('/pc/api/prisql/memberStatus/list', {
    method: 'GET',
    params: { projectId: projectId },
  });
}

export async function inviteMember(projectId: string, member: string) {
  return request('/pc/api/prisql/memberStatus/invite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ projectId: projectId, member: member }),
  });
}

export async function getDatatableList(projectId: string, owner: string) {
  return request('/pc/api/prisql/datatable/list', {
    method: 'GET',
    params: { projectId: projectId, owner: owner },
  });
}

export async function createDatatable(priSqlDatatable: API.PriSqlDatatable) {
  return request('/pc/api/prisql/datatable/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(priSqlDatatable),
  });
}

export async function deleteDatatable(id: string) {
  return request(`/pc/api/prisql/datatable/delete/${id}`, {
    method: 'DELETE',
  });
}

export async function getCclList(datatableId: number) {
  return request('/pc/api/prisql/columnAccess/list', {
    method: 'GET',
    params: { datatableId: datatableId },
  });
}

export async function handleCclList(datatableId: number, newCclList: API.PriSqlColumnAccess[]) {
  return request(`/pc/api/prisql/columnAccess/handle/${datatableId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(newCclList),
  });
}

export async function runSQL(scql: string) {
  return request('/pc/api/prisql/runSQL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ scql: scql }),
  });
}

export async function getMyAccessList(projectId: number, member: string) {
  return request('/pc/api/prisql/columnAccess/list/myCa', {
    method: 'GET',
    params: { projectId: projectId, member: member },
  });
}