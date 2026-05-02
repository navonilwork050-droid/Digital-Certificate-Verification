const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => localStorage.setItem('token', token);

export const clearToken = () => localStorage.removeItem('token');

export const apiFetch = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'API error');
    }

    return res.json();
};
