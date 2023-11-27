// useUbidots.js
import { useState, useCallback } from 'react';

const API_URL = 'https://industrial.api.ubidots.com/api/v2.0/';

export const useUbidots = (token) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const headers = {
        'X-AUTH-TOKEN': token,
        'Content-Type': 'application/json'
    };

    const fetchData = useCallback(async (endpoint) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setIsLoading(false);
            return data;
        } catch (error) {
            setError(error);
            setIsLoading(false);
            return null;
        }
    }, [token]);

    return { fetchData, isLoading, error };
};
