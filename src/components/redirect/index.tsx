import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';

const Redirect: React.FC<IPlainObject> = ({ parameters }) => {
  const router = useRouter();
  const params = parameters !== undefined ? parameters : '';

  useEffect(() => {
    router.replace('/' + params);
  }, []);

  return (
    <Head>
      <title>Redirecting...</title>
    </Head>
  );
};

export default Redirect;
