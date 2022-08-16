import { useEffect, useState } from 'react';

const useValidation = (email: string, pw: string) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email.includes('@') && pw.length >= 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, pw]);

  return disabled;
};

export default useValidation;
