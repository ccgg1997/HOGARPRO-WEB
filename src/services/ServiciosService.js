import axios from 'axios';

// Función para realizar una petición GET
export const fetchLaboresDisponibles = async () => {
    const API_URL = process.env.REACT_APP_API_ENDPOINT;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImNlbHVsYXIiOiIzMDU3Njc1MDc4IiwidGlwb0RvY3VtZW50byI6IkNDIiwiZG9jdW1lbnRvIjoiQ0MiLCJjb3JyZW9FbGVjdHJvbmljbyI6Im1haWtAbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJub21icmVfY29tcGxldG8iOiJNaWNoYWVsIENhcmRlbmFzIn0sImlhdCI6MTcxMDcxMzMzNCwiZXhwIjoxNzQyMjcwOTM0fQ.l-x4S3tAxxVrF0o1uAt3RB7ndxkRMXHCpYK2DEbNHA4'

    try {
        const response = await axios.get(API_URL + '/labores/disponibles', { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const createServiceOrder = async (data) => {
    const API_URL = process.env.REACT_APP_API_ENDPOINT;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImNlbHVsYXIiOiIzMDU3Njc1MDc4IiwidGlwb0RvY3VtZW50byI6IkNDIiwiZG9jdW1lbnRvIjoiQ0MiLCJjb3JyZW9FbGVjdHJvbmljbyI6Im1haWtAbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJub21icmVfY29tcGxldG8iOiJNaWNoYWVsIENhcmRlbmFzIn0sImlhdCI6MTcxMDcxMzMzNCwiZXhwIjoxNzQyMjcwOTM0fQ.l-x4S3tAxxVrF0o1uAt3RB7ndxkRMXHCpYK2DEbNHA4'

    let result = await axios.post(API_URL + "/servicios/createBasic", data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log('Receipt loaded successfully:', result);
    if (result.status === 200) {
        return result.data
    } else {
        throw Error('Error creating service order, code: ' + result.status + ' - ' + result.statusText + ' - ' + result.data.message);
    }
};


