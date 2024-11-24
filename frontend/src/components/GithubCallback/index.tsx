import React, { useEffect } from 'react';
import axios from 'axios';

const GithubCallback = () => {
  useEffect(() => {
    const getAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await axios.post('http://localhost:3000/auth/github/token', { code });
          // Handle the response (store token, navigate user, etc.)
          console.log('Access token:', response.data.access_token);
        } catch (error) {
          console.error('Error exchanging code:', error);
        }
      }
    };

    getAccessToken();
  }, []);

  return <div>Loading...</div>;
};

export default GithubCallback;