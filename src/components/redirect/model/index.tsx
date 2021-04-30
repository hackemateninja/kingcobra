import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';

const RedirectModel: React.FC<IPlainObject> = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/' + props.make);
  }, []);
  return (
    <Head>
      <title>Redirecting...</title>
    </Head>
  );
};

export default RedirectModel;
