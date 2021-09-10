import axios from 'axios';
import Cookies from 'universal-cookie';

const loginCheck = async (): Promise<boolean> => {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  const url = 'http://localhost:5000';

  const instance = axios.create({
    withCredentials: true,
    baseURL: url,
  });

  const headersConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  instance
    .post('isVerify', null, headersConfig)
    .then((res) => {
      const { newAccessToken } = res.data;

      if (newAccessToken) {
        cookies.set('accessToken', newAccessToken, {
          path: '/',
          sameSite: 'strict',
        });
      }

      return true;
    })
    .catch(() => false);
  return false;
};
