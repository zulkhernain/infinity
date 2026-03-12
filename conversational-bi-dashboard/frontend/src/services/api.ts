import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Query endpoints
  processQuery: async (query: string, context?: any) => {
    return apiClient.post('/query', { query, context });
  },

  // File upload
  uploadCSV: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Chart generation
  generateChart: async (data: any, chartType: string, title?: string) => {
    return apiClient.post('/chart', { data, chart_type: chartType, title });
  },

  // Data summary
  getDataSummary: async (csvPath?: string) => {
    return apiClient.get('/data/summary', { params: { csv_path: csvPath } });
  },

  // Health check
  healthCheck: async () => {
    return apiClient.get('/health');
  },
};

export default apiClient;
