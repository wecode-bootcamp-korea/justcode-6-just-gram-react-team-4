import { useEffect, useState } from 'react';

const useValidation = (email: string, pw: string) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    email.includes('@') && pw.length >= 5 ? setDisabled(false) : setDisabled(true);
  }, [email, pw]);

  return disabled;
};

export default useValidation;
