import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';

export type ProfileResponse = {
  id: number;
  email: string;
};

const useProfileFetch = () => {
  const access_token = useAppSelector(({ userInfo: { access_token } }) => access_token);
  const [profileLoading, setProfileLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (access_token) {
      (async () => {
        try {
          setProfileLoading(true);
          const {
            data: { email: res_email },
          } = await axios.get<ProfileResponse>('http://auth.jaejun.me:10010/me', {
            headers: {
              Authorization: access_token,
            },
          });

          setEmail(res_email);
          setProfileLoading(false);
        } catch (error) {
          setError(true);
        }
      })();
    }
  }, []);

  return { profileLoading, email, error };
};

export default useProfileFetch;
