import { api } from './apiClient';

export const playerApi = {
    getProfile: (): Promise<any> =>
        api.get('/player/profile').then(r => r.data),

    updateProfile: (fields: any): Promise<any> =>
        api.put('/player/profile', fields),

    requestDeletion: (): Promise<any> =>
        api.delete('/player/profile'),

    getDashboard: (): Promise<any> =>
        api.get('/player/dashboard').then(r => r.data),

    getAnalytics: (): Promise<any> =>
        api.get('/player/analytics').then(r => r.data),

    getDailyQuote: (): Promise<any> =>
        api.get('/player/quote').then(r => r.data),

    getSimulations: (): Promise<any[]> =>
        api.get('/player/simulations').then(r => r.data),

    getSimulationDetail: (id: string): Promise<any> =>
        api.get(`/player/simulations/${id}`).then(r => r.data),

    logSimulation: (simulationId: number, timeSpent: number, completed: boolean): Promise<any> =>
        api.post('/player/simulations/log', { simulationId, timeSpent, completed }),

    getMySimulationLogs: (): Promise<any[]> =>
        api.get('/player/simulations/logs/mine').then(r => r.data),

    getMyTickets: (): Promise<any[]> =>
        api.get('/player/tickets').then(r => r.data),

    submitTicket: (subject: string, description: string, categoryId: number, attachmentUrl: string | null = null): Promise<any> =>
        api.post('/player/tickets', { subject, description, categoryId, attachmentUrl }),

    getTicketCategories: (): Promise<any[]> =>
        api.get('/player/ticket-categories').then(r => r.data),

    getFaqs: (): Promise<any[]> =>
        api.get('/player/faqs').then(r => r.data),

    getEvents: (): Promise<any[]> =>
        api.get('/player/events').then(r => r.data),

    getTopPlayers: (): Promise<any[]> =>
        api.get('/player/top-players').then(r => r.data),
};
