import axios from 'axios';

export const loadReceipt = async (formData) => {
    const API_URL = process.env.REACT_APP_API_ENDPOINT;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImNlbHVsYXIiOiIzMDU3Njc1MDc4IiwidGlwb0RvY3VtZW50byI6IkNDIiwiZG9jdW1lbnRvIjoiQ0MiLCJjb3JyZW9FbGVjdHJvbmljbyI6Im1haWtAbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJub21icmVfY29tcGxldG8iOiJNaWNoYWVsIENhcmRlbmFzIn0sImlhdCI6MTcxMDcxMzMzNCwiZXhwIjoxNzQyMjcwOTM0fQ.l-x4S3tAxxVrF0o1uAt3RB7ndxkRMXHCpYK2DEbNHA4'

    let result = await axios.post(API_URL + "/usuarios/uploadFotoRecibo", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log('Receipt loaded successfully:', result);
    if (result.status === 200) {
        return result.data
    } else {
        throw Error('Error loading receipt, code: ' + result.status + ' - ' + result.statusText + ' - ' + result.data.message);
    }
};