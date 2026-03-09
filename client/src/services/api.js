import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL
});

export const getLeads = () => api.get('/leads');
export const createLead = (leadData) => api.post('/leads', leadData);
export const updateLead = (id, leadData) => api.put(`/leads/${id}`, leadData);
export const deleteLead = (id) => api.delete(`/leads/${id}`);

export default api;
