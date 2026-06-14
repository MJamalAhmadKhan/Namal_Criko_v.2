const BASE_URL = ((import.meta as any).env?.VITE_API_URL || 'http://localhost:5000') + '/api';

function getToken(): string | null {
    return localStorage.getItem('criko_token');
}

export function setToken(token: string): void {
    localStorage.setItem('criko_token', token);
}

export function clearToken(): void {
    localStorage.removeItem('criko_token');
    localStorage.removeItem('criko_user');
}

async function request(path: string, options: RequestInit = {}): Promise<any> {
    const token = getToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json', ...options.headers };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Request failed');
    }
    return data;
}

export const api = {
    get: (path: string) => request(path),
    post: (path: string, body: any) => request(path, { method: 'POST', body: JSON.stringify(body) }),
    put: (path: string, body: any) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
    patch: (path: string, body: any) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (path: string) => request(path, { method: 'DELETE' }),
};
