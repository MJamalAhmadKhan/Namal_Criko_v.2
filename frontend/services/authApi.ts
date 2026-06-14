import { api, setToken, clearToken } from './apiClient';

export interface UserResponse {
    userId: number;
    role: 'Player' | 'Admin';
    status: 'Pending' | 'Active' | 'Rejected' | 'Suspended';
}

export async function loginPlayer(email: string, password: string): Promise<UserResponse> {
    const ip = await fetch('https://api.ipify.org?format=json')
        .then(r => r.json())
        .then(d => d.ip)
        .catch(() => '0.0.0.0');
        
    const data = await api.post('/auth/login', { email, password, ip });
    setToken(data.token);
    localStorage.setItem('criko_user', JSON.stringify(data.user));
    return data.user;
}

export async function loginAdmin(email: string, password: string): Promise<UserResponse> {
    const data = await api.post('/auth/admin/login', { email, password });
    setToken(data.token);
    localStorage.setItem('criko_user', JSON.stringify(data.user));
    return data.user;
}

export async function registerPlayer(formData: any): Promise<any> {
    const payload = {
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' ') || '-',
        email: formData.email,
        phone: formData.contact,
        password: formData.password,
        userType: formData.userType,
        orgId: formData.orgId || null,
        regNumber: formData.rollNo || null,
        designation: formData.designation || null
    };
    return api.post('/auth/register', payload);
}

export async function forgotPassword(email: string): Promise<any> {
    return api.post('/auth/forgot-password', { email });
}

export async function resetPassword(token: string, newPassword: string): Promise<any> {
    return api.post('/auth/reset-password', { token, newPassword });
}

export function logout(): void {
    clearToken();
}

export function getCurrentUser(): UserResponse | null {
    try {
        const u = localStorage.getItem('criko_user');
        return u ? JSON.parse(u) : null;
    } catch {
        return null;
    }
}

export async function getOrganizations(): Promise<any[]> {
    const data = await api.get('/auth/organizations');
    return data.data;
}
