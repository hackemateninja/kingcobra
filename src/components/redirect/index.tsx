import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Redirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);

  return (
    <Head>
      <title>Redirecting...</title>
    </Head>
  );
};

export default Redirect;
