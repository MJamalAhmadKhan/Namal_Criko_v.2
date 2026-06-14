import { api } from './apiClient';

export const adminApi = {
    getOverview: (): Promise<any> =>
        api.get('/admin/overview').then(r => r.data),

    getReports: (): Promise<any> =>
        api.get('/admin/reports').then(r => r.data),

    getActionLog: (): Promise<any[]> =>
        api.get('/admin/action-log').then(r => r.data),

    getAllPlayers: (): Promise<any[]> =>
        api.get('/admin/players').then(r => r.data),

    getPendingPlayers: (): Promise<any[]> =>
        api.get('/admin/players/pending').then(r => r.data),

    approvePlayer: (playerId: number): Promise<any> =>
        api.put('/admin/players/status', { playerId, action: 'Approve' }),

    rejectPlayer: (playerId: number): Promise<any> =>
        api.put('/admin/players/status', { playerId, action: 'Reject' }),

    suspendPlayer: (playerId: number): Promise<any> =>
        api.put('/admin/players/status', { playerId, action: 'Suspend' }),

    restorePlayer: (playerId: number): Promise<any> =>
        api.put('/admin/players/status', { playerId, action: 'Restore' }),

    deleteUser: (userId: number): Promise<any> =>
        api.delete(`/admin/players/${userId}`),

    getAllTickets: (): Promise<any[]> =>
        api.get('/admin/tickets').then(r => r.data),

    respondTicket: (ticketId: number, description: string, newStatus: string, attachmentUrl: string | null = null): Promise<any> =>
        api.put('/admin/tickets/respond', { ticketId, description, newStatus, attachmentUrl }),

    createFaq: (question: string, answer: string): Promise<any> =>
        api.post('/admin/faqs', { question, answer }),

    updateFaq: (faqId: number, question: string, answer: string): Promise<any> =>
        api.put('/admin/faqs', { faqId, question, answer }),

    deleteFaq: (id: string): Promise<any> =>
        api.delete(`/admin/faqs/${id}`),

    createEvent: (eventData: any): Promise<any> =>
        api.post('/admin/events', eventData),

    updateEvent: (eventData: any): Promise<any> =>
        api.put('/admin/events', eventData),

    archiveEvent: (id: string): Promise<any> =>
        api.patch(`/admin/events/${id}/archive`, {}),

    createSimulation: (simData: any): Promise<any> =>
        api.post('/admin/simulations', simData),

    updateSimulation: (simData: any): Promise<any> =>
        api.put('/admin/simulations', simData),

    deleteSimulation: (id: string): Promise<any> =>
        api.delete(`/admin/simulations/${id}`),

    getSimulationAssets: (id: string): Promise<any[]> =>
        api.get(`/admin/simulations/${id}/assets`).then(r => r.data),

    addSimulationAsset: (simulationId: number, assetType: string, assetUrl: string): Promise<any> =>
        api.post('/admin/simulations/assets', { simulationId, assetType, assetUrl }),

    addSimulationMistake: (simulationId: number, mistakeDesc: string, correctionDesc: string): Promise<any> =>
        api.post('/admin/simulations/mistakes', { simulationId, mistakeDesc, correctionDesc }),

    getAllQuotes: (): Promise<any[]> =>
        api.get('/admin/quotes').then(r => r.data),

    createQuote: (quoteData: any): Promise<any> =>
        api.post('/admin/quotes', quoteData),

    updateQuote: (quoteData: any): Promise<any> =>
        api.put('/admin/quotes', quoteData),

    deleteQuote: (id: string): Promise<any> =>
        api.delete(`/admin/quotes/${id}`),

    getProPlayers: (): Promise<any[]> =>
        api.get('/admin/pro-players').then(r => r.data),

    createProPlayer: (playerData: any): Promise<any> =>
        api.post('/admin/pro-players', playerData),

    updateProPlayer: (playerData: any): Promise<any> =>
        api.put('/admin/pro-players', playerData),

    deleteProPlayer: (id: string): Promise<any> =>
        api.delete(`/admin/pro-players/${id}`),

    upsertPlayerStats: (statsData: any): Promise<any> =>
        api.post('/admin/pro-players/stats', statsData),

    getSimulationLogs: (): Promise<any[]> =>
        api.get('/admin/simulation-logs').then(r => r.data),

    getOrganizations: (): Promise<any[]> =>
        api.get('/admin/organizations').then(r => r.data),

    createOrganization: (orgData: any): Promise<any> =>
        api.post('/admin/organizations', orgData),

    updateOrganization: (orgData: any): Promise<any> =>
        api.put('/admin/organizations', orgData),

    deleteOrganization: (id: string): Promise<any> =>
        api.delete(`/admin/organizations/${id}`),

    getCategories: (): Promise<any[]> =>
        api.get('/admin/categories').then(r => r.data),
};
