import ky from 'ky';

export const apiInstance = ky.create({prefixUrl: __API_URL__});
